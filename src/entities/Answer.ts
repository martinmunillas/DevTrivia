import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
  } from 'typeorm';
  
  import { Field, ObjectType } from 'type-graphql';
import { Question } from './Question';
  
  @ObjectType()
  @Entity()
  export class Answer extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Field(() => Question)
    @ManyToOne(() => Question, question => question.answers)
    question!: Question;
    
    @Field()
    @Column()
    image?: string;
    
    @Field()
    @Column()
    message!: string;

    @Column({ unique: true })
    isCorrect!: boolean 

  }
  