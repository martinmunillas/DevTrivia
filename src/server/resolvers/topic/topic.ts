import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Answer } from '../../entities/Answer';
import { Position } from '../../entities/Position';
import { Question } from '../../entities/Question';
import { Ranking } from '../../entities/Ranking';

import { Topic } from '../../entities/Topic';
import { MyContext } from '../../types';
import {
  RankingResponse,
  Result,
  SendResponse,
  TopicResponse,
  TriviaResponse,
} from './types';

@Resolver(Topic)
export class TopicResolver {
  @Mutation(() => TopicResponse)
  async createTopic(@Arg('name') name: string): Promise<TopicResponse> {
    const ranking = await Ranking.create({}).save();
    const topic = await Topic.create({ name, ranking }).save();

    return { topic };
  }

  @Query(() => [Topic])
  async getTopics() {
    return Topic.find({ relations: ['questions'] });
  }

  @Query(() => RankingResponse)
  async getRanking(@Arg('id', () => Int) id: number): Promise<RankingResponse> {
    const topic = await Topic.findOne({
      where: { id },
      relations: ['ranking'],
    });
    if (!topic) {
      return { errors: [{ field: 'topicId', message: 'Topic not found' }] };
    }
    const ranking = await Ranking.findOne({
      where: { id: topic?.ranking?.id },
    });
    const positions = await Position.find({
      where: { ranking: ranking },
      relations: ['user'],
    });

    ranking!.positions = positions;

    ranking!.positions = ranking!.positions?.sort((a, b) => {
      const point = b.points - a.points;
      if (!point) {
        return a.seconds - b.seconds;
      }
      return point;
    });
    return { ranking, topic };
  }

  @Mutation(() => TopicResponse)
  async insertQuestion(
    @Arg('statement') statement: string,
    @Arg('choices', () => [String]) choices: string[],
    @Arg('topicId', () => Int) topicId: number
  ): Promise<TopicResponse> {
    let topic = await Topic.findOne(topicId);
    if (!topic) {
      return { errors: [{ field: 'topicId', message: 'Topic not found' }] };
    } else if (choices.length !== 5) {
      return {
        errors: [{ field: 'answers', message: 'There must be 5 answers' }],
      };
    }
    const question = await Question.create({
      statement,
      topic,
      answers: [],
    }).save();
    for (let i = 0; i < choices.length; i++) {
      const answer = await Answer.create({
        isCorrect: i === 0,
        question,
        message: choices[i],
      }).save();
      question.answers = [...question.answers!, answer];
    }
    await Question.save(question);
    topic = await Topic.findOne({
      where: { id: topicId },
      relations: ['questions'],
    });
    return { topic };
  }

  @Query(() => Question, { nullable: true })
  async getQuestion(@Arg('id', () => Int) id: number) {
    const question = await Question.findOne({
      where: { id },
      relations: ['answers'],
    });
    if (!question) {
      return { errors: [{ field: 'id', message: 'Question not found' }] };
    }
    question!.answers = question!.answers!.sort(
      () => Math.random() - Math.random()
    );
    return question;
  }

  @Mutation(() => Boolean)
  async deleteQuestion(@Arg('id', () => Int) id: number) {
    await Question.delete(id);
    return true;
  }

  @Query(() => TriviaResponse)
  async generateTrivia(
    @Arg('topicId', () => Int) topicId: number
  ): Promise<TriviaResponse> {
    const topic = await Topic.findOne(topicId);
    if (!topic) {
      return { errors: [{ field: 'topicId', message: 'Topic not found' }] };
    }
    const questions = await Question.createQueryBuilder()
      .where({ topic })
      .orderBy('RANDOM()')
      .take(5)
      .getMany();
    return { questions };
  }

  @Mutation(() => SendResponse)
  async sendResults(
    @Arg('topicId', () => Int) topicId: number,
    @Arg('seconds', () => Int) seconds: number,
    @Arg('questions', () => [Int]) questions: number[],
    @Arg('answers', () => [Int]) answers: number[],
    @Ctx() { req }: MyContext
  ): Promise<SendResponse> {
    const topic = await Topic.findOne({
      where: { id: topicId },
      relations: ['ranking'],
    });
    if (!topic) {
      return { errors: [{ field: 'topicId', message: 'Topic not found' }] };
    }
    let position = await Position.findOne({
      where: { user: req.session.userId, ranking: topic!.ranking },
    });

    let points = 0;
    let results: Result[] = [];

    for (let i = 0; i < questions.length; i++) {
      const question = await Question.findOne({
        where: { id: questions[i] },
        relations: ['answers'],
      });
      if (answers[i] === question?.answers![0].id) {
        points++;
        results[i] = { correct: true, message: question!.statement };
      } else {
        results[i] = { correct: false, message: question!.statement };
      }
    }
    if (!position) {
      await Position.create({
        points,
        user: req.session.userId,
        ranking: topic!.ranking,
        seconds,
      }).save();
    } else if (
      position.points < points ||
      (position.points === points && position.seconds > seconds)
    ) {
      position.points = points;
      position.seconds = seconds;
      Position.save(position);
    }
    return { points, results, seconds };
  }
}
