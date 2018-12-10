const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('server/utils/message.js', () => {
  describe('generateMessage', () => {
    it('should generate the correct message object', () => {
      const from = 'Alejandro';
      const text = 'Text to test';
      const expectedMessage = { from, text };
      const message = generateMessage(from, text);
      expect(message).toMatchObject(expectedMessage);
      expect(typeof message.createdAt).toBe('number');
    })
  });

  describe('generateLocationMessage', () => {
    it('should generate current location object', () => {
      const from = 'Alejandro';
      const coords = {
        latitude: 4.7448177,
        longitude: -74.0283106
      };
      const res = generateLocationMessage(from, coords);
      expect(res.from).toBe(from);
      expect(res.url).toBe(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`);
      expect(typeof res.createdAt).toBe('number');
    });
  });
});
