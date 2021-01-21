import { Field, ObjectType } from 'type-graphql';
import { FieldError } from '../../types';
import { Topic } from '../../entities/Topic';
import { Question } from '../../entities/Question';
import { Ranking } from '../../entities/Ranking';

@ObjectType()
export class TopicResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Topic, { nullable: true })
  topic?: Topic;
}

@ObjectType()
export class TriviaResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Question], { nullable: true })
  questions?: Question[];
}

@ObjectType()
export class RankingResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Ranking, { nullable: true })
  ranking?: Ranking;

  @Field(() => Topic, { nullable: true })
  topic?: Topic;
}
