import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';

import { Field, ObjectType } from 'type-graphql';
import { Position } from './Position';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field(() => Position, { nullable: true })
  @OneToMany(() => Position, (position) => position.user)
  ranks?: Position[];
}
