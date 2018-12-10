const expect = require('expect');
const { isRealString } = require('./validation');

describe('server/utils/validation.js', () => {
  describe('isRealString', () => {
    it('should reject non-string value', () => {
      expect(isRealString(1)).toBe(false);
    });
    it('should reject string with only spaces', () => {
      expect(isRealString('    ')).toBe(false);
    });
    it('should allow string', () => {
      expect(isRealString('   Alejandro   ')).toBe(true);
    });
  });
});
