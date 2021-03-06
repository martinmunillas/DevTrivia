import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import argon2 from 'argon2';

import { cookieSession } from '../../constants';
import { User } from '../../entities/User';
import { MyContext, FieldError } from '../../types';
import { emailIsValid, passwordIsValid } from '../../utils/fieldValidators';
import { generateUsername } from '../../utils/generateUsername';
import { UserResponse, FullUserInput, UserInput } from './types';

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    return user.id === req.session.userId ? user.email : '';
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: FullUserInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors: FieldError[] = [];
    if (!options.email) {
      errors.push({ field: 'email', message: 'Please insert an email' });
    } else if (!emailIsValid(options.email)) {
      errors.push({ field: 'email', message: 'Please insert a valid email' });
    } else if (await User.findOne({ where: { email: options.email } })) {
      errors.push({
        field: 'email',
        message: 'That email already exists',
      });
    }

    if (!options.password) {
      errors.push({ field: 'password', message: 'Please insert a password' });
    } else if (!passwordIsValid(options.email)) {
      return {
        errors: [
          {
            field: 'password',
            // Change this message if you change the password validation function
            message: 'Passwords must be at least 6 characters long',
          },
        ],
      };
    }

    if (errors.length) return { errors };

    const hashedPassword = await argon2.hash(options.password);
    let { username } = options;
    if (!username) {
      username = await generateUsername(options.email);
    }
    const user = await User.create({
      username,
      password: hashedPassword,
      email: options.email,
    }).save();

    req.session.userId = user.id;

    return { user };
  }

  // Log In resolver
  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UserInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors: FieldError[] = [];
    const user = await User.findOne({ where: { email: options.email } });
    if (!options.email) {
      errors.push({ field: 'email', message: 'Please insert an email' });
    } else if (!emailIsValid(options.email)) {
      errors.push({ field: 'email', message: 'Please insert a valid email' });
    } else if (!user) {
      errors.push({
        field: 'email',
        message: "That email doesn't exists",
      });
    }
    if (errors.length) return { errors };

    const valid = await argon2.verify(user!.password, options.password);
    if (!valid) {
      return {
        errors: [{ field: 'password', message: 'Incorrect password' }],
      };
    }
    if (errors.length) return { errors };

    // Actually logs the user in
    req.session.userId = user!.id;
    return { user };
  }

  // Gets the user info
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
    if (!req.session.userId) {
      return undefined;
    }
    return await User.findOne(req.session.userId);
  }

  // Logs the user out
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err: any) => {
        res.clearCookie(cookieSession);
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      })
    );
  }
}
