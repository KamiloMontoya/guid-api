import { Test, TestingModule } from '@nestjs/testing';
import { GuidController } from './guid.controller';
import { GuidService } from './guid.service';
import { GuidMock, GuidMockList } from './__mocks__/guid.mock';
import { NotFoundException } from '@nestjs/common';

jest.mock('./guid.service');

describe('GuidController', () => {
  let guidController: GuidController;
  let guidService: GuidService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GuidController],
      providers: [GuidService],
    }).compile();

    guidController = app.get<GuidController>(GuidController);
    guidService = app.get<GuidService>(GuidService);
  });

  describe('getOne', () => {
    it('should trhow an error since guid is not found', async () => {
      jest.spyOn(guidService, 'getActiveGuid').mockResolvedValue(null);
      const response = guidController.getOne(
        'E590008880B0422A91FEBE3B7A6E31E3',
      );
      expect(response).rejects.toThrow(
        new NotFoundException('Guid was not found or is expired'),
      );
    });
    it('should return a getOne', async () => {
      jest.spyOn(guidService, 'getActiveGuid').mockResolvedValue(GuidMock);
      const response = await guidController.getOne(
        'E590008880B0422A91FEBE3B7A6E31E3',
      );
      expect(response).toMatchObject({
        guid: 'E590008880B0422A91FEBE3B7A6E31E3',
        user: 'Camilo Montoya',
        expires: new Date('2025-08-02T19:30:30.000Z'),
      });
    });
  });

  describe('list', () => {
    it('should return a list of guid', async () => {
      jest.spyOn(guidService, 'list').mockResolvedValue(GuidMockList);
      const response = await guidController.list();
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
    });
  });

  describe('create', () => {
    it('should return a created guid', async () => {
      jest.spyOn(guidService, 'create').mockResolvedValue(GuidMock);
      const response = await guidController.create({
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

  describe('createWithGuid', () => {
    it('should return a created guid', async () => {
      jest.spyOn(guidService, 'create').mockResolvedValue(GuidMock);
      const response = await guidController.createWithGuid(
        'E590008880B0422A91FEBE3B7A6E31E3',
        {
          user: 'Camilo Montoya',
          expires: '2025-08-02T19:30:30.000Z',
        },
      );
      expect(response).toMatchObject({
        guid: 'E590008880B0422A91FEBE3B7A6E31E3',
        user: 'Camilo Montoya',
        expires: new Date('2025-08-02T19:30:30.000Z'),
      });
    });

    describe('update', () => {
      it('should return a update guid', async () => {
        jest.spyOn(guidService, 'update').mockResolvedValue(GuidMock);
        const response = await guidController.update(
          'E590008880B0422A91FEBE3B7A6E31E3',
          {
            user: 'Camilo Montoya',
            expires: '2025-08-02T19:30:30.000Z',
          },
        );
        expect(response).toMatchObject({
          guid: 'E590008880B0422A91FEBE3B7A6E31E3',
          user: 'Camilo Montoya',
          expires: new Date('2025-08-02T19:30:30.000Z'),
        });
      });
    });

    describe('deleted', () => {
      it('should return a deleted guid', async () => {
        const deleteServiceSpy = jest
          .spyOn(guidService, 'delete')
          .mockResolvedValue(null);
        await guidController.delete('E590008880B0422A91FEBE3B7A6E31E3');
        expect(deleteServiceSpy).toHaveBeenCalledWith(
          'E590008880B0422A91FEBE3B7A6E31E3',
        );
      });
    });
  });
});
