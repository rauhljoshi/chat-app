const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {

	it('should reject non string values', () => {
		const result = isRealString(2);
		expect(result).toBe(false);
	});

	it('should reject values with only spaces', () => {
		const result = isRealString('    ');
		expect(result).toBe(false);
	});

	it('should allow valid strings', () => {
		const result = isRealString('Rahul');
		expect(result).toBe(true);
	});
});