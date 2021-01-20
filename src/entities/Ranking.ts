import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    OneToOne,
  } from 'typeorm';
  
  import { Field, ObjectType } from 'type-graphql';
import { Topic } from './Topic';
import { Position } from './Position';
  
  @ObjectType()
  @Entity()
  export class Ranking extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Field()
    @Column({ unique: true })
    name!: string;
  
    @Field(() => [Position])
    @OneToMany(() => Position, (position) => position.ranking)
    positions!: Position[];
  
    @Field(() => Topic)
    @OneToOne(() => Topic, (topic) => topic.ranking)
    topic!: Topic;
  }
  