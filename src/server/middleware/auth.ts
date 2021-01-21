import { MyContext } from '../types';
import { MiddlewareFn } from 'type-graphql';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    console.log(context.req.session)
    throw new Error('Not authenticated');
  }

  return next();
};
