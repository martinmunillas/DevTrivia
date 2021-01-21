import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Field, ObjectType } from 'type-graphql';
import { Answer } from './Answer';
import { Topic } from './Topic';

@ObjectType()
@Entity()
export class Question extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Topic)
  @ManyToOne(() => Topic, (topic) => topic.questions)
  topic!: Topic;

  @Field()
  @Column({ unique: true })
  statement!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  image?: string;

  @Field(() => [Answer])
  @OneToMany(() => Answer, (answer) => answer.question)
  answers?: Answer[];
}
