import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import Redis from 'ioredis';
import session from 'express-session';
import redisConnect from 'connect-redis';
import cors from 'cors';
import { createConnection } from 'typeorm';

import { HelloResolver } from './resolvers/hello';
import { UserResolver } from './resolvers/user/user';
import { MyContext } from './types';
import { cookieSession, __prod__ } from './constants';
import { User } from './entities/User';
import { Topic } from './entities/Topic';
import { Answer } from './entities/Answer';
import { Ranking } from './entities/Ranking';
import { Position } from './entities/Position';
import { Question } from './entities/Question';
import { TopicResolver } from './resolvers/topic/topic';

const main = async () => {
  const app = express();

  // POSTGRES CONNECTION
  await createConnection({
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_NAME,
    type: 'postgres',
    logging: !__prod__,
    synchronize: !__prod__,
    entities: [User, Topic, Question, Answer, Ranking, Position],
  });

  // REDIS CONNECTION
  const RedisStore = redisConnect(session);
  const redis = new Redis({
    host: process.env.REDIS_HOST,
  });

  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );

  app.use(
    session({
      name: cookieSession,
      store: new RedisStore({
        client: redis,
        disableTTL: true,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: process.env.SECRET!,
      resave: false,
    })
  );

  app.use((req, res, next) => next());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, TopicResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: false,
    },
  });

  app.listen(4000, () => {
    console.log(`Server listening on port ${4000}`);
  });
};

main();
