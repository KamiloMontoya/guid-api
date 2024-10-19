import { getExpirationDate } from './dateUtil';

Object.defineProperty(global, 'performance', {
  writable: true,
});

describe('Date Utilities', () => {
  describe('getExpirationDate', () => {
    it('should return a valid expiration Date', () => {
      jest.useFakeTimers().setSystemTime(new Date('2024-10-18 12:30:00'));
      const date = getExpirationDate();
      expect(date.toISOString()).toBe('2024-11-17T17:30:00.000Z');
    });
  });
});
