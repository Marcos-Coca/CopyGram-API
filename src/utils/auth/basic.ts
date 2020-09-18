import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { unauthorized } from '@hapi/boom';
import { Password } from '../password';
import { UsersService } from '../../services/users';

passport.use(
  new BasicStrategy(async function (userName: string, password: string, callback: Function) {
    const userService = new UsersService();

    try {
      const [user] = (await userService.getUser({ userName }, { password: 1, _id: 1 })) || [];

      if (!user) return callback(unauthorized(), false);

      if (!(await Password.comparePaswword(password, user.password))) {
        return callback(unauthorized(), false);
      }

      delete user.password;

      return callback(null, user);
    } catch (err) {
      return callback(err);
    }
  })
);
