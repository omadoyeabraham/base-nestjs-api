import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { exec } from 'child_process';
import util from 'util';
import faker from 'faker';

import { AuthService, AuthController } from '@modules/auth';
import { CreateUserDTO, UsersService, UsersModule } from '@modules/users';
import { UserModel, UserModelFactory, DatabaseModule } from '@modules/database';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  // beforeAll(async () => {
  //   console.log('ABOUT TO MIGRATEEEEEEEee');
  //   const executor = util.promisify(exec);
  //   try {
  //     const { stdout, stderr } = await executor(
  //       'npm run knex migrate:rollback && npm run migrate',
  //     );
  //     console.log('stdout:', stdout);
  //     console.log('stderr:', stderr);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // });
  // afterAll(() => {});

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        PassportModule,
        UsersModule,
        ConfigModule,
        DatabaseModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => {
            const jwtTTL = configService.get('auth.jwtTTL');

            return {
              secret: configService.get('auth.jwtSecret'),
              signOptions: { expiresIn: `${jwtTTL}s` },
            };
          },
          inject: [ConfigService],
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    usersService = moduleRef.get<UsersService>(UsersService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  describe('#register', () => {
    it('can register a user', async () => {
      const createUserDto: CreateUserDTO = {
        first_name: 'abraham',
        last_name: 'omadoye',
        email: 'omadoyeabraham@gmail.com',
        username: 'omadoyeabraham',
        password: 'password',
        confirm_password: 'password',
      };
      const result = (await UserModelFactory.make()) as Promise<UserModel>;

      jest.spyOn(usersService, 'create').mockImplementation(() => result);
      jest.spyOn(authService, 'register').mockImplementation(() => result);

      expect(await authController.register(createUserDto)).toBe(result);
    });
  });

  describe('#login', () => {
    it('can login a user', async () => {
      const user = await UserModelFactory.make(1, {
        username: 'testuser',
        password: 'password',
      });

      const request = {
        body: {
          username: 'testuser',
          password: 'password',
        },
      };

      const loginResponse = {
        access_token: faker.lorem.word,
        user,
      } as any;

      // jest.spyOn(usersService, 'create').mockImplementation(() => result);
      jest.spyOn(authService, 'login').mockImplementation(() => loginResponse);

      expect(await authController.login(request)).toBe(loginResponse);
    });
  });
});
