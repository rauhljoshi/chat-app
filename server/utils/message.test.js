const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');


describe('generateMessage', () => {

	it('should generate correct message object', () => {
		const result = generateMessage('Rahul', 'Hello');
		expect(result.from).toBe('Rahul');
		expect(result.text).toBe('Hello');
		expect(typeof result.createdAt).toBe('number');
	});
});

describe('generateLocationMessage', () => {

	it('should generate correct location object', () => {
		const result = generateLocationMessage('Rahul', 100, 100);
		expect(result.from).toBe('Rahul');
		expect(result.url).toBe('https://www.google.com/maps?q=100,100');
		expect(typeof result.createdAt).toBe('number');
	});
});