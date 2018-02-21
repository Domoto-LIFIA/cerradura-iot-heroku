var HomeRoute = require('./HomeRoute');
var LockRoute = require('./api/LockRoute');

module.exports = function(lock) {
  return [ (new HomeRoute()).config(), (new LockRoute(lock)).config() ]; 
};
