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
    it('returns sum for multiple numbers string with commas as parameter', () => {
        expect(add('1,2')).toEqual(3);
        expect(add('1,2,3')).toEqual(6);
    });
    it('returns sum for multiple numbers string with commas and new line character as parameter', () => {
        expect(add('1\n2')).toEqual(3);
        expect(add('1\n2,3')).toEqual(6);
    });
    it('returns sum for multiple numbers string with delimiters', () => {
        expect(add('//;\n1;2')).toEqual(3);
        expect(add('//;\n1;2;3')).toEqual(6);
    });
});