const moment = require('moment');

const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf() // Timestamp
  };
};

const generateLocationMessage = (from, coords) => {
  return {
    from,
    url: `https://google.com/maps?q=${coords.latitude},${coords.longitude}`,
    createdAt: moment().valueOf() // Timestamp
  };
}

module.exports = { generateMessage, generateLocationMessage };
