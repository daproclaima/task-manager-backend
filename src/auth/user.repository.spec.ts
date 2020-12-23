import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
const mockCrendentialDto = {
  username: 'TestUsername',
  password: 'TestPassword1;',
};

describe('UserRepository', () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    let save;
    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('successfully signs up the user', () => {
      save.mockResolvedValue(undefined);
      expect(userRepository.signUp(mockCrendentialDto)).resolves.not.toThrow();
    });

    it('throws a conflict exception as username already exists', () => {
      save.mockRejectedValue({ code: '23505' });
      // expect(userRepository.signUp(mockCrendentialsDto)).rejects.toThrow();
      // expect(userRepository.signUp(mockCrendentialDto)).rejects.toThrow(InternalServerErrorException);
      expect(userRepository.signUp(mockCrendentialDto))
        .rejects.toThrow(ConflictException)
        .catch(Error);
    });

    it('throws an internal error exception', () => {
      save.mockRejectedValue({ code: '12344222' });
      expect(userRepository.signUp(mockCrendentialDto))
        .rejects.toThrow(InternalServerErrorException)
        .catch(Error);
    });
  });

  describe('validatePassword', () => {
    let user;
    beforeEach(() => {
      userRepository.findOne = jest.fn();
      user = new User();
      user.username = 'TestUsername';
      user.validatePassword = jest.fn();
    });

    it('returns the username as validation is successful', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(true);
      const result = await userRepository.validateUserPassword(
        mockCrendentialDto,
      );
      expect(result).toEqual('TestUsername');
    });

    it('returns null user as user can not be found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      const result = await userRepository.validateUserPassword(
        mockCrendentialDto,
      );
      expect(user.validatePassword).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('returns null user as password is invalid', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(false);
      const result = await userRepository.validateUserPassword(
        mockCrendentialDto,
      );
      expect(user.validatePassword).toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('hashPassword', () => {
    it('calls bcrypt.hash to generate hash', async () => {
      bcrypt.hash = jest.fn().mockResolvedValue('testHash');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await userRepository.hashPassword(
        'testPassword',
        'testSalt',
      );
      expect(bcrypt.hash).toHaveBeenCalledWith('testPassword', 'testSalt');
      expect(result).toEqual('testHash');
    });
  });
});
