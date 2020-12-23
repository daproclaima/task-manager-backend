import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import {ConflictException, InternalServerErrorException} from "@nestjs/common";
// import {InternalServerErrorException} from "@nestjs/common";

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
});
