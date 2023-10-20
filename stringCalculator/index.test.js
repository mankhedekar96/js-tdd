import add from '.';

describe('String calculator', () => {
    it('returns 0 if got empty string as parameter', () => {
        expect(add('')).toEqual(0);
    });
    it('returns same number if got single number string as parameter', () => {
        expect(add('1')).toEqual(1);
        expect(add('12')).toEqual(12);
        expect(add('123')).toEqual(123);
    });
});