import { Test, TestingModule } from '@nestjs/testing';
import { Guid } from './guid.entity';
import { GuidService } from './guid.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { GuidMock, GuidMockList } from './__mocks__/guid.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('GuidController', () => {
  let guidService: GuidService;
  let guidRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuidService,
        {
          provide: getRepositoryToken(Guid),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            persistAndFlush: jest.fn(),
            removeAndFlush: jest.fn(),
          },
        },
      ],
    }).compile();

    guidService = module.get<GuidService>(GuidService);
    guidRepository = module.get(getRepositoryToken(Guid));
  });

  describe('list', () => {
    it('should return a list of guid', async () => {
      const findSpy = jest
        .spyOn(guidRepository, 'find')
        .mockResolvedValue(GuidMockList);
      const response = await guidService.list();
      expect(response).toMatchObject([
        {
          guid: '0AEEF740FC514D608CC06B442E6B4B63',
          user: 'Jhon Doe',
          expires: new Date('2025-08-02T19:30:30.000Z'),
        },
        {
          guid: 'E590008880B0422A91FEBE3B7A6E31E3',
          user: 'Camilo Montoya',
          expires: new Date('2025-08-02T19:30:30.000Z'),
        },
        {
          guid: '65B200CCB8FE470BBA4C4E085CEFC514',
          user: 'Rick griguidmes',
          expires: new Date('2025-08-02T19:30:30.000Z'),
        },
      ]);

      expect(findSpy).toHaveBeenCalledWith({
        expires: {
          $gte: expect.any(Date),
        },
      });
    });
  });

  describe('getActiveGuid', () => {
    it('should return an active guid', async () => {
      const findOneSpy = jest
        .spyOn(guidRepository, 'findOne')
        .mockResolvedValue(GuidMock);
      const response = await guidService.getActiveGuid(
        'E590008880B0422A91FEBE3B7A6E31E3',
      );
      expect(response).toMatchObject({
        guid: 'E590008880B0422A91FEBE3B7A6E31E3',
        user: 'Camilo Montoya',
        expires: new Date('2025-08-02T19:30:30.000Z'),
      });
      expect(findOneSpy).toHaveBeenCalledWith({
        guid: 'E590008880B0422A91FEBE3B7A6E31E3',
        expires: {
          $gte: expect.any(Date),
        },
      });
    });
  });

  describe('create', () => {
    it('should throw an error since the given GUID is not valid', () => {
      jest.spyOn(guidRepository, 'findOne').mockResolvedValue(null);
      const response = guidService.create({
        guid: 'NOTVALID',
        user: 'Camilo Montoya',
        expires: '2025-08-02T19:30:30.000Z',
      });
      expect(response).rejects.toThrow(
        new BadRequestException('Giud value is not a valid guid'),
      );
    });

    it('should throw an error since the given GUID already exists', () => {
      jest.spyOn(guidRepository, 'findOne').mockResolvedValue(GuidMock);
      const response = guidService.create({
        guid: 'E590008880B0422A91FEBE3B7A6E31E3',
        user: 'Camilo Montoya',
        expires: '2025-08-02T19:30:30.000Z',
      });
      expect(response).rejects.toThrow(
        new BadRequestException('Giud already exists'),
      );
    });

    it('should create a new register generating a new GUID', async () => {
      jest.spyOn(guidRepository, 'findOne').mockResolvedValue(null);
      const response = await guidService.create({
        user: 'Camilo Montoya',
      });
      expect(response).toMatchObject({
        guid: expect.any(String),
        user: 'Camilo Montoya',
        expires: expect.any(Date),
      });

      expect(response.guid.length).toBe(32);
    });

    it('should create a new register given a new GUID and expirationDate', async () => {
      jest.spyOn(guidRepository, 'findOne').mockResolvedValue(null);
      const response = await guidService.create({
        guid: 'E590008880B0422A91FEBE3B7A6E31E3',
        user: 'Camilo Montoya',
        expires: '2025-08-02T19:30:30.000Z',
      });
      expect(response).toMatchObject({
        guid: 'E590008880B0422A91FEBE3B7A6E31E3',
        user: 'Camilo Montoya',
        expires: new Date('2025-08-02T19:30:30.000Z'),
      });
    });
  });

  describe('update', () => {
    it('should throw an error since the given GUID was not found', () => {
      jest.spyOn(guidRepository, 'findOne').mockResolvedValue(null);
      const response = guidService.update('E590008880B0422A91FEBE3B7A6E31E3', {
        user: 'Jhon Doe',
        expires: '2025-12-10T19:30:30.000Z',
      });
      expect(response).rejects.toThrow(new NotFoundException('Giud not found'));
    });
    it('should return a uddate a guid', async () => {
      jest.spyOn(guidRepository, 'findOne').mockResolvedValue(GuidMock);
      const response = await guidService.update(
        'E590008880B0422A91FEBE3B7A6E31E3',
        {
          user: 'Jhon Doe',
          expires: '2025-12-10T19:30:30.000Z',
        },
      );
      expect(response).toMatchObject({
        guid: 'E590008880B0422A91FEBE3B7A6E31E3',
        user: 'Jhon Doe',
        expires: new Date('2025-12-10T19:30:30.000Z'),
      });
    });
  });

  describe('delete', () => {
    it('should throw an error since the given GUID was not found', () => {
      jest.spyOn(guidRepository, 'findOne').mockResolvedValue(null);
      const response = guidService.delete('E590008880B0422A91FEBE3B7A6E31E3');
      expect(response).rejects.toThrow(new NotFoundException('Giud not found'));
    });
    it('should return a delete a guid', async () => {
      jest.spyOn(guidRepository, 'findOne').mockResolvedValue(GuidMock);
      const removeAndFlushSpy = jest.spyOn(guidRepository, 'removeAndFlush');
      await guidService.delete('E590008880B0422A91FEBE3B7A6E31E3');
      expect(removeAndFlushSpy).toBeCalledWith(GuidMock);
    });
  });
});
