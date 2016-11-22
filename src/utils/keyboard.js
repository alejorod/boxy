const keys = {
  'left': false,
  'right': false,
  'up': false,
  'down': false,
  'a': false,
  'd': false,
  'w': false,
  's': false
};

const keyCodes = {
  37: 'left',
  39: 'right',
  38: 'up',
  40: 'down',
  65: 'a',
  68: 'd',
  83: 's',
  87: 'w'
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

export default {
  isPressed
}
