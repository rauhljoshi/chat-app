const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
	var users;
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Auba',
			room: 'Arsenal Fans'
		}, {
			id: '2',
			name: 'Messi',
			room: 'Barca Fans'
		}, {
			id: '3',
			name: 'Laca',
			room: 'Arsenal Fans'
		}];
	});

	it('should add new user', () => {
		const users = new Users();
		const user = {
			id: '123',
			name: 'Rahul',
			room: 'Arsenal Fans'
		};
		const resp = users.addUser(user.id, user.name, user.room);
		expect(users.users).toContainEqual(user);
	});

	it('should remove a user', () => {
		const resp = users.removeUser('2');
		expect(resp.id).toBe('2');
		expect(users.users.length).toBe(2);
	});

	it('should not remove a user', () => {
		const resp = users.removeUser('44');
		expect(resp).toBe(undefined);
		expect(users.users.length).toBe(3);
	});

	it('should find user', () => {
		const resp = users.getUser('1');
		expect(resp.name).toBe('Auba');
	});

	it('should not find user', () => {
		const resp = users.getUser('33');
		expect(resp).toBe(undefined);
	});

	it('should return names for Arsenal', () => {
		const resp = users.getUserList('Arsenal Fans');
		expect(resp).toContain('Auba', 'Laca');
	});

	it('should return names for Barca', () => {
		const resp = users.getUserList('Barca Fans');
		expect(resp).toContain('Messi');
	});
})