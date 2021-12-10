import { minMax } from './math';

describe('Math', () => {

  describe('minMax', () => {
    it('should return number', () => {
      expect(minMax(5, 3, 6)).toBe(5);
      expect(minMax(1, 2, 3)).toBe(2);
      expect(minMax(3, 2, 1)).toBe(1);
    });
  });
});