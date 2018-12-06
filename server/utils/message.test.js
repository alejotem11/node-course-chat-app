const expect = require('expect');
const { generateMessage } = require('./message');

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
