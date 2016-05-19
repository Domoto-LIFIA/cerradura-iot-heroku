var StoveClient = function StoveClient() {
};

StoveClient.prototype.turnOn = function turnOn(data) {
  return $.ajax({
    url: '/api/turnOn',
    method: 'POST',
    data: data,
    dataType: 'json'
  });
};

StoveClient.prototype.turnOff = function turnOff() {
  return $.ajax({
    url: '/api/turnOff',
    method: 'POST',
    dataType: 'json'
  });  
};

StoveClient.prototype.status = function status() {
  return $.getJSON('/api/status');
};