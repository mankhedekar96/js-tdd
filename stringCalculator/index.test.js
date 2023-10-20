import add from '.';

describe('String calculator', () => {
    it('returns 0 if got empty string as parameter', () => {
        expect(add('')).toEqual(0);
    });
});