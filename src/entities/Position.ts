import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  ManyToOne,
} from 'typeorm';

import { Field, Int, ObjectType } from 'type-graphql';
import { User } from './User';
import { Ranking } from './Ranking';

@ObjectType()
@Entity()
export class Position extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.ranks)
  user!: User;

  @Field(() => Int)
  @Column({ type: 'int' })
  points!: number;

  @Field(() => Ranking)
  @OneToOne(() => Ranking, (ranking) => ranking.positions)
  ranking!: Ranking;
}
