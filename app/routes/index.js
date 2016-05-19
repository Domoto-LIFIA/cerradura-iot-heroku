var HomeRoute = require('./HomeRoute');
var StoveRoute = require('./api/StoveRoute');

module.exports = function(stove) {
  return [ (new HomeRoute(stove)).config(), (new StoveRoute(stove)).config() ]; 
};