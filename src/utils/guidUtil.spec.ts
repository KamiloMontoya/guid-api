import { generateGuid, isValidGuid } from './guidUtil';

describe('Guid Utilities', () => {
  describe('generateGuid', () => {
    it('should generateGuid a valid GUID', () => {
      const guid = generateGuid();
      expect(guid.length).toBe(32);
    });
  });

  describe('isValidGuid', () => {
    it('should retrun true having a valid GUID', () => {
      const guid = isValidGuid('E590008880B0422A91FEBE3B7A6E31E3');
      expect(guid).toBeTruthy();
    });

    it('should retrun false having an invalid GUID', () => {
      const guid = isValidGuid('e590008880b0422a91FEBE3B7A6e31e3');
      expect(guid).toBeFalsy();

      const otherGiud = isValidGuid('not_valid');
      expect(otherGiud).toBeFalsy();
    });
  });
});
