import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Field, ObjectType } from 'type-graphql';
import { Question } from './Question';
import { Ranking } from './Ranking';

@ObjectType()
@Entity()
export class Topic extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field(() => [Question])
  @OneToMany(() => Question, (question) => question.topic)
  questions?: Question[];

  @Field(() => Ranking)
  @OneToOne(() => Ranking)
  @JoinColumn()
  ranking?: Ranking;
}
