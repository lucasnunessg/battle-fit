import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserController } from '../users.controller';
import { UserService } from '../users.service';
import { User } from '../users.entity';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const result = [{ id: 1, name: 'Test User', email: 'test@example.com' }];
      jest
        .spyOn(userService, 'get')
        .mockResolvedValue(result as unknown as User[]);

      expect(await userController.getAll()).toBe(result);
    });
  });

  describe('getById', () => {
    it('should return only one user', async () => {
      const result = { id: 2, name: 'test', email: 'fulano@email.com' };
      jest
        .spyOn(userService, 'getId')
        .mockResolvedValue(result as unknown as User);

      expect(await userController.getbyId(2)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete user', async () => {
      const mock = { id: 2, name: 'deleted test', email: 'fulano@gmail.com' };
      const result = { success: true };
      jest.spyOn(userService, 'delete').mockResolvedValue(result);

      expect(await userController.deleteUser(mock.id)).toBe(result);
    });
  });

  describe('create user', () => {
    it('should create user', async () => {
      const expectedInput = {
        name: 'qqr coisa',
        phone: '5599999999',
        address: 'aspdijadsij',
        photoUrl: 'asdihdasioudhasa',
      };

      const expectedOutput = {
        id: 5,
        name: 'qqr coisa',
        address: 'aspdijadsij',
        phone: '5599999999',
        timezone: 'America/Sao_Paulo',
        photoUrl: 'asdihdasioudhasa',
      };

      jest
        .spyOn(userService, 'create')
        .mockResolvedValueOnce(expectedOutput as User);

      expect(await userController.create(expectedInput)).toBe(expectedOutput);
    });
  });

  describe('edit user', () => {
    it('should edit a user', async () => {
      const expectedInput = {
        id: 5,
        name: 'qqr coisa',
        address: 'aspdijadsij',
        phone: '5599999999',
        timezone: 'America/Sao_Paulo',
        photoUrl: 'asdihdasioudhasa',
      };
      const result = { success: true };
      jest.spyOn(userService, 'edit').mockResolvedValue(result);

      expect(await userController.edit(expectedInput.id, expectedInput)).toBe(
        result,
      );
    });
  });
});
