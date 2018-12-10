const expect = require('expect');
const { Users } = require('./users');
const users = new Users();

beforeEach(() => {
  users.users = [{
    id: '1',
    name: 'Mike',
    room: 'Room 1'
  }, {
    id: '2',
    name: 'Alejandro',
    room: 'Room 1'
  }, {
    id: '3',
    name: 'Andres',
    room: 'Room 1'
  }, {
    id: '4',
    name: 'Oscar',
    room: 'Room 2'
  }, {
    id: '5',
    name: 'Luis',
    room: 'Room 2'
  }];
});

describe('server/utils/users', () => {
  describe('addUser', () => {
    it('should add new user', () => {
      const user = {
        id: '6',
        name: 'Alejandro',
        room: 'The Office Fans'
      };
      const resUser = users.addUser(user.id, user.name, user.room);
      expect(resUser).toEqual(user);
      expect(users.users.length).toBe(6);
    });
  });

  describe('getUserList', () => {
    it('should return names for Room 1', () => {
      const userList = users.getUserList('Room 1');
      expect(userList).toEqual(['Mike', 'Alejandro', 'Andres']);
    });
    it('should return names for Room 2', () => {
      const userList = users.getUserList('Room 2');
      expect(userList).toEqual(['Oscar', 'Luis']);
    });
  });

  describe('getUser', () => {
    it('should get the user 1', () => {
      const user = users.getUser('1');
      expect(user).toBe(users.users[0]);
    });
    it('should not find the user', () => {
      const user = users.getUser('10000');
      expect(user).toBeFalsy();
    });
  });

  describe('removeUser', () => {
    it('should remove a user', () => {
      const user1 = users.users[0];
      const userRemoved = users.removeUser('1');
      expect(userRemoved).toEqual(user1);
      expect(users.users.length).toBe(4);
    });
    it('should not remove a user', () => {
      const user = users.removeUser('10000');
      expect(user).toBeFalsy();
    });
  });
});
