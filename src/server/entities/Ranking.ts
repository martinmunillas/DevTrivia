import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany,
  } from 'typeorm';
  
  import { Field, ObjectType } from 'type-graphql';
import { Position } from './Position';
  
  @ObjectType()
  @Entity()
  export class Ranking extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Field(() => [Position])
    @OneToMany(() => Position, (position) => position.ranking)
    positions?: Position[];
  }
  