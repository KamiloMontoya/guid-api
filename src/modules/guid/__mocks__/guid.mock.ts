import { Guid } from '../guid.entity';

export const GuidMockList: Guid[] = [
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
];

export const GuidMock: Guid = {
  guid: 'E590008880B0422A91FEBE3B7A6E31E3',
  user: 'Camilo Montoya',
  expires: new Date('2025-08-02T19:30:30.000Z'),
};
