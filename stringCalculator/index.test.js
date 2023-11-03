import calculate, { substraction } from '.';

describe('String calculator', () => {
    it('returns 0 if got empty string as parameter', () => {
        expect(calculate('')).toEqual(0);
    });
    it('returns same number if got single number string as parameter', () => {
        expect(calculate('1')).toEqual(1);
        expect(calculate('12')).toEqual(12);
        expect(calculate('123')).toEqual(123);
    });
    it('returns sum for multiple numbers string with commas as parameter', () => {
        expect(calculate('1,2')).toEqual(3);
        expect(calculate('1,2,3')).toEqual(6);
    });
    it('returns sum for multiple numbers string with commas and new line character as parameter', () => {
        expect(calculate('1\n2')).toEqual(3);
        expect(calculate('1\n2,3')).toEqual(6);
    });
    it('returns sum for multiple numbers string with delimiters', () => {
        expect(calculate('//;\n1;2')).toEqual(3);
        expect(calculate('//;\n1;2;3')).toEqual(6);
    });
    it('throws exception for negative numbers', () => {
        // single negative
        expect(() => calculate('-1')).toThrow(Error);
        expect(() => calculate('-1')).toThrow('negatives not allowed : -1');

        // multiple negatives
        expect(() => calculate('-1,2,-3')).toThrow(Error);
        expect(() => calculate('-1,2,-3')).toThrow('negatives not allowed : -1,-3');

        // multiple negatives with next line
        expect(() => calculate('-1\n2\n-3')).toThrow(Error);
        expect(() => calculate('-1\n2\n-3')).toThrow('negatives not allowed : -1,-3');

        // delimiters
        expect(() => calculate('//;\n1;-2;-3')).toThrow(Error);
        expect(() => calculate('//;\n1;-2;-3')).toThrow('negatives not allowed : -2,-3');

        // long delimiters
        expect(() => calculate('//;;;\n1;;;-2;;;-3')).toThrow(Error);
        expect(() => calculate('//;;;\n1;;;-2;;;-3')).toThrow('negatives not allowed : -2,-3');

        // multiple delimiters
        expect(() => calculate('//;*?\n1;-2*-3?-4')).toThrow(Error);
        expect(() => calculate('//;*?\n1;-2*-3?-4')).toThrow('negatives not allowed : -2,-3,-4');

        // multiple long delimiters
        expect(() => calculate('//;;;***???\n1;;;-2***-3???-4')).toThrow(Error);
        expect(() => calculate('//;;;***???\n1;;;-2***-3???-4')).toThrow('negatives not allowed : -2,-3,-4');
    });
    it('ignores the number bigger than 1000 and return the sum', () => {
        expect(calculate('1,2,1001')).toEqual(3);
        expect(calculate('1,2,3,1001')).toEqual(6);
    });
    it('allows delimiters of any length and return the sum', () => {
        expect(calculate('//***\n1***2')).toEqual(3);
        expect(calculate('//***\n1***2***3')).toEqual(6);
    });
    it('allows multiple delimiters and return the sum', () => {
        expect(calculate('//*;\n1*2;3')).toEqual(6);
        expect(calculate('//*;?\n1*2;3?4')).toEqual(10);
    });
    it('allows multiple long delimiters and return the sum', () => {
        expect(calculate('//***;;;\n1***2;;;3')).toEqual(6);
        expect(calculate('//**;;;???\n1**2;;;3???4')).toEqual(10);
    });
    it('should remove duplicates and return the sum', () => {
        expect(calculate('//***;;;\n1***2;;;3;;;3')).toEqual(6);
    });
    it('should accept custom callback function and return the result accordingly', () => {
        expect(calculate('//***;;;\n1***2;;;3;;;3', substraction)).toEqual(-4);
    });
    it('should accept notification callback function and return the result accordingly with sending notification', () => {
        const mockNotification = jest.fn();
        expect(calculate('//***;;;\n1***2;;;3;;;3', substraction, mockNotification)).toEqual(-4);
        expect(mockNotification).toBeCalledWith('//***;;;\n1***2;;;3;;;3', -4);
    });
});