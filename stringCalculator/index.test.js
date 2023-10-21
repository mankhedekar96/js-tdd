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
    it('throws exception for negative numbers', () => {
        // single negative
        expect(() => add('-1')).toThrow(Error);
        expect(() => add('-1')).toThrow('negatives not allowed : -1');

        // multiple negatives
        expect(() => add('-1,2,-3')).toThrow(Error);
        expect(() => add('-1,2,-3')).toThrow('negatives not allowed : -1,-3');

        // multiple negatives with next line
        expect(() => add('-1\n2\n-3')).toThrow(Error);
        expect(() => add('-1\n2\n-3')).toThrow('negatives not allowed : -1,-3');

        // delimiters
        expect(() => add('//;\n1;-2;-3')).toThrow(Error);
        expect(() => add('//;\n1;-2;-3')).toThrow('negatives not allowed : -2,-3');

        // long delimiters
        expect(() => add('//;;;\n1;;;-2;;;-3')).toThrow(Error);
        expect(() => add('//;;;\n1;;;-2;;;-3')).toThrow('negatives not allowed : -2,-3');

        // multiple delimiters
        expect(() => add('//;*?\n1;-2*-3?-4')).toThrow(Error);
        expect(() => add('//;*?\n1;-2*-3?-4')).toThrow('negatives not allowed : -2,-3,-4');

        // multiple long delimiters
        expect(() => add('//;;;***???\n1;;;-2***-3???-4')).toThrow(Error);
        expect(() => add('//;;;***???\n1;;;-2***-3???-4')).toThrow('negatives not allowed : -2,-3,-4');
    });
    it('ignores the number bigger than 1000 and return the sum', () => {
        expect(add('1,2,1001')).toEqual(3);
        expect(add('1,2,3,1001')).toEqual(6);
    });
    it('allows delimiters of any length and return the sum', () => {
        expect(add('//***\n1***2')).toEqual(3);
        expect(add('//***\n1***2***3')).toEqual(6);
    });
    it('allows multiple delimiters and return the sum', () => {
        expect(add('//*;\n1*2;3')).toEqual(6);
        expect(add('//*;?\n1*2;3?4')).toEqual(10);
    });
    it('allows multiple long delimiters and return the sum', () => {
        expect(add('//***;;;\n1***2;;;3')).toEqual(6);
        expect(add('//**;;;???\n1**2;;;3???4')).toEqual(10);
    });
});