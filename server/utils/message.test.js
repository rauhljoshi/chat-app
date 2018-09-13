const expect = require('expect');

const { generateMessage } = require('./message');


describe('generateMessage', () => {

	it('should generate correct message object', () => {
		const result = generateMessage('Rahul', 'Hello');
		expect(result.from).toBe('Rahul');
		expect(result.text).toBe('Hello');
		expect(typeof result.createdAt).toBe('number');
	});
});