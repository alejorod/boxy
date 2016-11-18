const keyboard = (function() {
  const keys = {
    'left': false,
    'right': false,
    'up': false,
    'down': false,
    'a': false,
    'd': false
  };

  const keyCodes = {
    37: 'left',
    39: 'right',
    38: 'up',
    40: 'down',
    65: 'a',
    68: 'd'
  };

  window.onkeydown = function(e) {
    keys[keyCodes[e.keyCode]] = true;
  };

  window.onkeyup = function(e) {
    keys[keyCodes[e.keyCode]] = false;
  }

  function isPressed(key) {
    return keys[key];
  }

  return {
    isPressed
  }
})();
