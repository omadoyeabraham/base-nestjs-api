import { Test } from '@nestjs/testing';

import {
  UsersService,
  UsersRepository,
  CreateUserDTO,
} from '../../../src/modules/users';
import { UserModel, UserModelFactory, DatabaseModule } from '@modules/database';

describe('# Users Service', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const moduleReference = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [UsersService, UsersRepository],
    }).compile();

    usersService = moduleReference.get<UsersService>(UsersService);
    usersRepository = moduleReference.get<UsersRepository>(UsersRepository);
  });

  it('can find a user by their username', async () => {
    const user = (await UserModelFactory.make(1, {
      username: 'testUser',
    })) as Promise<UserModel>;
    jest
      .spyOn(usersRepository, 'findByUsername')
      .mockImplementation(() => user);

    expect(await usersService.findByUsername('testUser')).toBe(user);
  });

  it('can create a new user', async () => {
    const dto: CreateUserDTO = new CreateUserDTO();
    const user = (await UserModelFactory.make(1, {
      username: 'testUser',
    })) as Promise<UserModel>;

    jest.spyOn(usersRepository, 'create').mockImplementation(() => user);
    expect(await usersService.create(dto)).toBe(user);
  });
});
