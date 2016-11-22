(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

var canvas = document.createElement('canvas');
canvas.width = 1024;
canvas.height = 768;
document.body.append(canvas);

var gl = canvas.getContext('webgl', {
  alpha: false
});

var cube = {
  name: 'default-cube',
  description: {
    stride: Float32Array.BYTES_PER_ELEMENT * 9,
    vertPosition: {
      count: 3,
      type: gl.FLOAT,
      offset: 0
    },
    vertColor: {
      count: 3,
      type: gl.FLOAT,
      offset: Float32Array.BYTES_PER_ELEMENT * 3
    },
    vertNormal: {
      count: 3,
      type: gl.FLOAT,
      offset: Float32Array.BYTES_PER_ELEMENT * 6
    }
  },
  // data: new Float32Array([
  //   -0.5, 0.5, -0.5,   0.5, 0.5, 0.5,
  //   -0.5, 0.5, 0.5,    0.5, 0.5, 0.5,
  //   0.5, 0.5, 0.5,     0.5, 0.5, 0.5,
  //   0.5, 0.5, -0.5,    0.5, 0.5, 0.5,
  //
  //   -0.5, 0.5, 0.5,    0.75, 0.25, 0.5,
  //   -0.5, -0.5, 0.5,   0.75, 0.25, 0.5,
  //   -0.5, -0.5, -0.5,  0.75, 0.25, 0.5,
  //   -0.5, 0.5, -0.5,   0.75, 0.25, 0.5,
  //
  //   0.5, 0.5, 0.5,    0.25, 0.25, 0.75,
  //   0.5, -0.5, 0.5,   0.25, 0.25, 0.75,
  //   0.5, -0.5, -0.5,  0.25, 0.25, 0.75,
  //   0.5, 0.5, -0.5,   0.25, 0.25, 0.75,
  //
  //   0.5, 0.5, 0.5,    1.0, 0.0, 0.15,
  //   0.5, -0.5, 0.5,    1.0, 0.0, 0.15,
  //   -0.5, -0.5, 0.5,    1.0, 0.0, 0.15,
  //   -0.5, 0.5, 0.5,    1.0, 0.0, 0.15,
  //
  //   0.5, 0.5, -0.5,    0.0, 1.0, 0.15,
  //   0.5, -0.5, -0.5,    0.0, 1.0, 0.15,
  //   -0.5, -0.5, -0.5,    0.0, 1.0, 0.15,
  //   -0.5, 0.5, -0.5,    0.0, 1.0, 0.15,
  //
  //   -0.5, -0.5, -0.5,   0.5, 0.5, 1.0,
  //   -0.5, -0.5, 0.5,    0.5, 0.5, 1.0,
  //   0.5, -0.5, 0.5,     0.5, 0.5, 1.0,
  //   0.5, -0.5, -0.5,    0.5, 0.5, 1.0,
  // ]),
  data: new Float32Array([
  // top
  -0.5, 0.5, -0.5, 0.0, 1.0, 0.15, 0.0, 1.0, 0.0, -0.5, 0.5, 0.5, 0.0, 1.0, 0.15, 0.0, 1.0, 0.0, 0.5, 0.5, 0.5, 0.0, 1.0, 0.15, 0.0, 1.0, 0.0, 0.5, 0.5, -0.5, 0.0, 1.0, 0.15, 0.0, 1.0, 0.0,

  // left
  -0.5, 0.5, 0.5, 0.75, 0.25, 0.5, -1.0, 0.0, 0.0, -0.5, -0.5, 0.5, 0.75, 0.25, 0.5, -1.0, 0.0, 0.0, -0.5, -0.5, -0.5, 0.75, 0.25, 0.5, -1.0, 0.0, 0.0, -0.5, 0.5, -0.5, 0.75, 0.25, 0.5, -1.0, 0.0, 0.0,

  // right
  0.5, 0.5, 0.5, 0.25, 0.25, 0.75, 1.0, 0.0, 0.0, 0.5, -0.5, 0.5, 0.25, 0.25, 0.75, 1.0, 0.0, 0.0, 0.5, -0.5, -0.5, 0.25, 0.25, 0.75, 1.0, 0.0, 0.0, 0.5, 0.5, -0.5, 0.25, 0.25, 0.75, 1.0, 0.0, 0.0,

  // front
  0.5, 0.5, 0.5, 1.0, 0.0, 0.15, 0.0, 0.0, 1.0, 0.5, -0.5, 0.5, 1.0, 0.0, 0.15, 0.0, 0.0, 1.0, -0.5, -0.5, 0.5, 1.0, 0.0, 0.15, 0.0, 0.0, 1.0, -0.5, 0.5, 0.5, 1.0, 0.0, 0.15, 0.0, 0.0, 1.0,

  // back
  0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.0, 0.0, -1.0, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.0, 0.0, -1.0, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.0, 0.0, -1.0, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.0, 0.0, -1.0,

  // bottom
  -0.5, -0.5, -0.5, 0.5, 0.5, 1.0, 0.0, -1.0, 0.0, -0.5, -0.5, 0.5, 0.5, 0.5, 1.0, 0.0, -1.0, 0.0, 0.5, -0.5, 0.5, 0.5, 0.5, 1.0, 0.0, -1.0, 0.0, 0.5, -0.5, -0.5, 0.5, 0.5, 1.0, 0.0, -1.0, 0.0]),
  indices: new Uint16Array([0, 1, 2, 0, 2, 3, 5, 4, 6, 6, 4, 7, 8, 9, 10, 8, 10, 11, 13, 12, 14, 15, 14, 12, 16, 17, 18, 16, 18, 19, 21, 20, 22, 22, 20, 23])
};

var shader = {
  name: 'default',
  sources: {
    vertex: '\n      precision mediump float;\n      attribute vec3 vertPosition;\n      attribute vec3 vertColor;\n      attribute vec3 vertNormal;\n      varying vec3 fragColor;\n      varying float height;\n      varying float fogFactor;\n      varying float directional;\n      uniform mat4 mWorld;\n      uniform mat4 mView;\n      uniform mat4 mProj;\n\n      void main()\n      {\n        height = vertPosition.y;\n        vec3 directionalVector = vec3(0.1, 1.0, 0.0);\n        directional = dot(normalize(vertNormal), directionalVector);\n\n        gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);\n        fogFactor = 1.0 - (300.0 - gl_Position.z) / (300.0 - 0.1);\n      }\n    ',
    fragment: '\n      precision mediump float;\n      varying float height;\n      varying vec3 fragColor;\n      varying float fogFactor;\n      varying float directional;\n\n      void main()\n      {\n        vec4 black = vec4(0.1, 1.0, 0.2, 1.0);\n        vec4 white = vec4(1.0, 0.5, 0.2, 1.0);\n        float k = 4.0 * (height/20.0);\n        float red = clamp(min(k - 1.5, 4.5 - k), 0.0, 1.0);\n        float green = clamp(min(k - 0.5, 3.5 - k), 0.0, 1.0);\n        float blue  = clamp(min(k + 0.5, 2.5 - k), 0.0, 1.0);\n        vec4 hcolor = mix(black, vec4(red, green, blue, 1.0), 0.3);\n        vec4 directionalLightColor = vec4(vec3(1.0, 1.0, 1.0) * directional, 1.0);\n        vec4 color = mix(hcolor, directionalLightColor, 0.4);\n        gl_FragColor = mix(color, vec4(0.2, 0.4, 0.95, 1.0) , clamp(fogFactor, 0.0, 1.0));\n      }\n    '
  },
  attributes: ['vertPosition', 'vertColor', 'vertNormal'],
  uniforms: ['mWorld', 'mView', 'mProj']
};

var buffers = {};
var currentBuffer = null;

function create(_ref) {
  var name = _ref.name,
      description = _ref.description,
      data = _ref.data,
      indices = _ref.indices;

  if (buffers[name]) return;

  var dataBuffer = gl.createBuffer();
  var indexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  description.indexLength = indices.length;

  var d = Object.assign({}, description);
  d.indexLength = indices.length;

  buffers[name] = {
    buffer: dataBuffer,
    indexBuffer: indexBuffer,
    description: d
  };
}

function getDescription(name) {
  return buffers[name].description;
}

function getBuffer(name) {
  return buffers[name].buffer;
}

function getIndexBuffer(name) {
  return buffers[name].indexBuffer;
}

function bindBuffer(bufferName) {
  if (currentBuffer === bufferName) return false;

  gl.bindBuffer(gl.ARRAY_BUFFER, getBuffer(bufferName));
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, getIndexBuffer(bufferName));

  return true;
}

var BufferManager = {
  create: create,
  getDescription: getDescription,
  getBuffer: getBuffer,
  getIndexBuffer: getIndexBuffer,
  bindBuffer: bindBuffer
};

var shaders = {};
var currentProgram = null;

function create$1(_ref) {
  var name = _ref.name,
      sources = _ref.sources,
      attributes = _ref.attributes,
      uniforms = _ref.uniforms;

  if (shaders[name]) return;

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, sources.vertex);
  gl.shaderSource(fragmentShader, sources.fragment);

  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(vertexShader));
    gl.deleteShader(vertexShader);
    return;
  }

  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(fragmentShader));
    gl.deleteShader(fragmentShader);
    return;
  }

  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return;
  }

  var attributeLocations = {};
  var uniformLocations = {};

  attributes.forEach(function (name) {
    attributeLocations[name] = gl.getAttribLocation(program, name);
  });

  uniforms.forEach(function (name) {
    uniformLocations[name] = gl.getUniformLocation(program, name);
  });

  shaders[name] = {
    program: program,
    attributes: attributeLocations,
    uniforms: uniformLocations
  };
}

function use(name) {
  if (currentProgram === name) return false;
  gl.useProgram(shaders[name].program);
  return true;
}

function getAttributes(shaderName, attributeName) {
  return shaders[shaderName].attributes;
}

function getUniforms(shaderName, uniformName) {
  return shaders[shaderName].uniforms;
}

var ShaderManager = {
  create: create$1,
  use: use,
  getAttributes: getAttributes,
  getUniforms: getUniforms
};

function loop(cb) {
  var lastTime = 0;

  function f(time) {
    requestAnimationFrame(f);
    lastTime = lastTime ? lastTime : time;
    cb(time - lastTime);
    lastTime = time;
  }

  requestAnimationFrame(f);
}

function initWebgl() {
  gl.clearColor(0.2, 0.4, 0.95, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.frontFace(gl.CCW);
  gl.cullFace(gl.BACK);
}

function loadShaders() {
  [shader].forEach(function (s) {
    ShaderManager.create(s);
  });
}

function loadBuffers() {
  [cube].forEach(function (b) {
    BufferManager.create(b);
  });
}

var keys = {
  'left': false,
  'right': false,
  'up': false,
  'down': false,
  'a': false,
  'd': false,
  'w': false,
  's': false
};

var keyCodes = {
  37: 'left',
  39: 'right',
  38: 'up',
  40: 'down',
  65: 'a',
  68: 'd',
  83: 's',
  87: 'w'
};

window.onkeydown = function (e) {
  keys[keyCodes[e.keyCode]] = true;
};

window.onkeyup = function (e) {
  keys[keyCodes[e.keyCode]] = false;
};

function isPressed(key) {
  return keys[key];
}

var keyboard = {
  isPressed: isPressed
};

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import { mat4 } from 'gl-matrix';

var Transformation = function () {
  function Transformation() {
    _classCallCheck$2(this, Transformation);

    this.rotation = {
      x: 0,
      y: 0,
      z: 0
    };

    this.scales = {
      x: 1,
      y: 1,
      z: 1
    };

    this.translation = {
      x: 0,
      y: 0,
      z: 0
    };

    this._matrix = mat4.identity(new Float32Array(16));
    this._rotationMatrix = mat4.identity(new Float32Array(16));
  }

  _createClass$2(Transformation, [{
    key: "rotate",
    value: function rotate(x, y, z) {
      this.rotation.x += x;
      this.rotation.y += y;
      this.rotation.z += z;
    }
  }, {
    key: "setRotation",
    value: function setRotation(x, y, z) {
      this.rotation = {
        x: x,
        y: y,
        z: z
      };
    }
  }, {
    key: "scale",
    value: function scale(x, y, z) {
      this.scales.x *= x;
      this.scales.y *= y;
      this.scales.z *= z;
    }
  }, {
    key: "setScale",
    value: function setScale(x, y, z) {
      this.scales = {
        x: x,
        y: y,
        z: z
      };
    }
  }, {
    key: "translate",
    value: function translate(x, y, z) {
      this.translation.x += x;
      this.translation.y += y;
      this.translation.z += z;
    }
  }, {
    key: "setTranslation",
    value: function setTranslation(x, y, z) {
      this.translation = {
        x: x,
        y: y,
        z: z
      };
    }
  }, {
    key: "rotationMatrix",
    get: function get() {
      mat4.identity(this._rotationMatrix);
      mat4.rotateZ(this._rotationMatrix, this._rotationMatrix, this.rotation.z);

      mat4.rotateY(this._rotationMatrix, this._rotationMatrix, this.rotation.y);

      mat4.rotateX(this._rotationMatrix, this._rotationMatrix, this.rotation.x);

      return this._rotationMatrix;
    }
  }, {
    key: "matrix",
    get: function get() {
      mat4.scale(this._matrix, mat4.identity(new Float32Array(16)), [this.scales.x, this.scales.y, this.scales.z]);

      mat4.translate(this._matrix, this._matrix, [this.translation.x, this.translation.y, this.translation.z]);

      mat4.multiply(this._matrix, this._matrix, this.rotationMatrix);

      return this._matrix;
    }
  }]);

  return Transformation;
}();

function create$3() {
  return new Transformation();
}

function combine(t1, t2) {
  var c = new Float32Array(16);
  mat4.multiply(c, t1.matrix, t2.matrix);
  return c;
}

var T = {
  create: create$3,
  combine: combine
};

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TransformableObject = function () {
  function TransformableObject() {
    _classCallCheck$1(this, TransformableObject);

    this.transformation = T.create();
    this._parent = null;
  }

  _createClass$1(TransformableObject, [{
    key: 'rotate',
    value: function rotate(x, y, z) {
      this.transformation.rotate(x, y, z);
      return this;
    }
  }, {
    key: 'scale',
    value: function scale(x, y, z) {
      this.transformation.scale(x, y, z);
      return this;
    }
  }, {
    key: 'translate',
    value: function translate(x, y, z) {
      this.transformation.translate(x, y, z);
      return this;
    }
  }, {
    key: 'parent',
    set: function set(p) {
      if (!p instanceof TransformableObject) {
        throw Error('parent need to be an instance of TransformableObject');
      }

      this._parent = p;
      return this;
    },
    get: function get() {
      return this._parent;
    }
  }, {
    key: 'matrix',
    get: function get() {
      return this._parent ? T.combine(this.parent.transformation, this.transformation) : this.transformation.matrix;
    }
  }, {
    key: 'rotationMatrix',
    get: function get() {
      return this._parent ? T.combine(this.parent.rotationMatrix, this.rotationMatrix) : this.transformation.rotationMatrix;
    }
  }]);

  return TransformableObject;
}();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { mat4 } from 'gl-matrix';
var Camera = function (_TransformableObject) {
  _inherits(Camera, _TransformableObject);

  function Camera() {
    _classCallCheck(this, Camera);

    return _possibleConstructorReturn(this, (Camera.__proto__ || Object.getPrototypeOf(Camera)).apply(this, arguments));
  }

  _createClass(Camera, [{
    key: 'update',
    value: function update(delta) {
      var perpDirection = this.perpDirection;

      var rotationVector = {
        x: 0,
        y: 0,
        z: 0
      };

      rotationVector.y += keyboard.isPressed('left') ? Math.PI : 0;
      rotationVector.y += keyboard.isPressed('right') ? -Math.PI : 0;
      rotationVector.x += keyboard.isPressed('up') ? Math.PI : 0;
      rotationVector.x += keyboard.isPressed('down') ? -Math.PI : 0;

      var movingVector = {
        x: 0,
        y: 0,
        z: 0
      };

      movingVector.z += keyboard.isPressed('w') ? -1 : 0;
      movingVector.z += keyboard.isPressed('s') ? 1 : 0;
      movingVector.x += keyboard.isPressed('a') ? -1 : 0;
      movingVector.x += keyboard.isPressed('d') ? 1 : 0;

      this.rotate(rotationVector.x * delta / 1000, rotationVector.y * delta / 1000, rotationVector.z * delta / 1000);

      var direction = new Float32Array(3);

      vec3.transformMat4(direction, [movingVector.x, movingVector.y, movingVector.z], this.rotationMatrix);

      this.translate(direction[0] * delta / 10, direction[1] * delta / 10, direction[2] * delta / 10);
    }
  }, {
    key: 'matrix',
    get: function get() {
      var i = mat4.identity(new Float32Array(16));
      mat4.invert(i, _get(Camera.prototype.__proto__ || Object.getPrototypeOf(Camera.prototype), 'matrix', this));
      return i;
    }
  }, {
    key: 'direction',
    get: function get() {
      var dir = new Float32Array(3);
      vec3.transformMat4(dir, [0, 0, 1], this.rotationMatrix);
      return {
        x: dir[0],
        y: dir[1],
        z: dir[2]
      };
    }
  }, {
    key: 'normalMatrix',
    get: function get() {
      var i = mat4.identity(new Float32Array(16));
      mat4.translate(i, this.rotationMatrix, [this.transformation.translation.x, this.transformation.translation.y, this.transformation.translation.z]);
      mat4.invert(i, i);
      return i;
    }
  }]);

  return Camera;
}(TransformableObject);

function create$2() {
  return new Camera();
}

var Camera$1 = {
  create: create$2
};

var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Drawer = function () {
  function Drawer(camera, projection) {
    _classCallCheck$3(this, Drawer);

    this.camera = camera;
    this.projection = projection;
  }

  _createClass$3(Drawer, [{
    key: 'clear',
    value: function clear() {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
  }, {
    key: 'drawShaderBatch',
    value: function drawShaderBatch(_ref) {
      var shader = _ref.shader,
          items = _ref.items;

      var attributes = ShaderManager.getAttributes(shader);
      var uniforms = ShaderManager.getUniforms(shader);
      var newProgram = ShaderManager.use(shader);

      gl.uniformMatrix4fv(uniforms['mProj'], gl.FALSE, this.projection);
      gl.uniformMatrix4fv(uniforms['mView'], gl.FALSE, this.camera.matrix);

      items.forEach(function (r) {
        var description = BufferManager.getDescription(r.buffer);
        var buffer = BufferManager.getBuffer(r.buffer);
        var indexBuffer = BufferManager.getIndexBuffer(r.buffer);

        var newBuffer = BufferManager.bindBuffer(r.buffer);

        gl.uniformMatrix4fv(uniforms['mWorld'], gl.FALSE, r.matrix);

        if (newProgram || newBuffer) {
          Object.keys(attributes).forEach(function (attributeKey) {
            var config = description[attributeKey];
            var location = attributes[attributeKey];
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, config.count, config.type, gl.FALSE, description.stride, config.offset);
          });
        }

        gl.drawElements(gl.TRIANGLES, description.indexLength, gl.UNSIGNED_SHORT, 0);
      });
    }
  }, {
    key: 'drawBatch',
    value: function drawBatch(renderables) {
      var _this = this;

      renderables.forEach(function (r) {
        return _this.draw(r);
      });
    }
  }, {
    key: 'draw',
    value: function draw(renderable) {
      var description = BufferManager.getDescription(renderable.buffer);
      var buffer = BufferManager.getBuffer(renderable.buffer);
      var indexBuffer = BufferManager.getIndexBuffer(renderable.buffer);
      var attributes = ShaderManager.getAttributes(renderable.shader);
      var uniforms = ShaderManager.getUniforms(renderable.shader);

      var newProgram = ShaderManager.use(renderable.shader);
      var newBuffer = BufferManager.bindBuffer(renderable.buffer);

      gl.uniformMatrix4fv(uniforms['mProj'], gl.FALSE, this.projection);
      gl.uniformMatrix4fv(uniforms['mView'], gl.FALSE, this.camera.matrix);
      gl.uniformMatrix4fv(uniforms['mWorld'], gl.FLASE, renderable.matrix);

      if (newProgram || newBuffer) {
        Object.keys(attributes).forEach(function (attributeKey) {
          var config = description[attributeKey];
          var location = attributes[attributeKey];
          gl.enableVertexAttribArray(location);
          gl.vertexAttribPointer(location, config.count, config.type, gl.FALSE, description.stride, config.offset);
        });
      }

      gl.drawElements(gl.TRIANGLES, description.indexLength, gl.UNSIGNED_SHORT, 0);
    }
  }]);

  return Drawer;
}();

function create$4(_ref2) {
  var camera = _ref2.camera,
      projection = _ref2.projection;

  return new Drawer(camera, projection);
}

var Drawer$1 = {
  create: create$4
};

function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Renderable = function (_TransformableObject) {
  _inherits$1(Renderable, _TransformableObject);

  function Renderable(shader, buffer) {
    _classCallCheck$4(this, Renderable);

    var _this = _possibleConstructorReturn$1(this, (Renderable.__proto__ || Object.getPrototypeOf(Renderable)).call(this));

    _this.shader = shader;
    _this.buffer = buffer;
    return _this;
  }

  return Renderable;
}(TransformableObject);

function create$5(_ref) {
  var shader = _ref.shader,
      buffer = _ref.buffer;

  return new Renderable(shader, buffer);
}

var Renderable$1 = {
  create: create$5
};

var strideLength = cube.description.stride / Float32Array.BYTES_PER_ELEMENT;

function generate(chunk) {
  var bufferData = [];
  var indexBufferData = [];
  var lastIndex = 0;
  var t = T.create();
  var transformedVertexPosition = new Float32Array(3);
  var finalVertex = new Float32Array(strideLength);
  var vertexPosition = void 0;

  chunk.items.forEach(function (row, x) {
    row.forEach(function (column, z) {
      var y = column;
      t.setTranslation(x, y, z);
      lastIndex = Math.floor(bufferData.length / strideLength);
      for (var i = 0; i < cube.data.length; i += strideLength) {
        vertexPosition = [cube.data[i], cube.data[i + 1], cube.data[i + 2]];
        vec3.transformMat4(transformedVertexPosition, vertexPosition, t.matrix);

        finalVertex[0] = transformedVertexPosition[0];
        finalVertex[1] = transformedVertexPosition[1];
        finalVertex[2] = transformedVertexPosition[2];

        for (var j = 3; j < strideLength; j++) {
          finalVertex[j] = cube.data[i + j];
        }

        bufferData.push.apply(bufferData, finalVertex);
      }

      indexBufferData.push.apply(indexBufferData, cube.indices.map(function (i) {
        return i + lastIndex;
      }));
    });
  });

  return {
    name: chunk.name,
    description: cube.description,
    data: new Float32Array(bufferData),
    indices: new Uint16Array(indexBufferData)
  };
}

// import { mat4 } from 'gl-matrix';
var noise = new Noise(Math.random());

var camera = Camera$1.create();
camera.translate(10, 40, 20);
camera.rotate(0, -Math.PI * 2.2 / 3, 0);
var drawer = Drawer$1.create({
  camera: camera,
  projection: mat4.perspective(new Float32Array(16), Math.PI / 2, gl.canvas.width / gl.canvas.height, 0.3, 10000000)
});

var d = void 0;
var chunks = [];

function getClearChunk(size) {
  var chunk = [];
  for (var x = 0; x < size; x++) {
    chunk[x] = [];
    for (var y = 0; y < size; y++) {
      chunk[x][y] = 0;
    }
  }

  return chunk;
}

for (var c = 0; c < 5; c++) {
  chunks[c] = [];
  for (var f = 0; f < 5; f++) {
    chunks[c][f] = getClearChunk(50);
    for (var x = 0; x < 50; x++) {
      for (var y = 0; y < 50; y++) {
        d = Math.abs(Math.floor(noise.perlin2((x + f * 50) / 120, (y + c * 50) / 120) * 50)) + 1;
        chunks[c][f][x][y] = d;
      }
    }
  }
}

/**
 * TODO: Remove this
 */
var renderables = chunks.map(function (ch, i) {
  return ch.map(function (h, fi) {
    BufferManager.create(generate({
      name: 'w_' + i + '-' + fi,
      items: h
    }));

    return Renderable$1.create({
      buffer: 'w_' + i + '-' + fi,
      shader: 'default'
    });
  });
});

// BufferManager.create(generate({
//   name: 'world',
//   items: wm
// }));

var world = {
  renderables: renderables,
  update: function update(delta) {
    // world.renderables.forEach(function(r) { r.rotate(0, 0, Math.PI * delta / 1000); });
  }
};

// world.renderable.rotate(Math.PI / 2, 0, 0);

initWebgl();
loadShaders();
loadBuffers();

loop(function (delta) {
  camera.update(delta);
  world.update(delta);

  drawer.clear();
  // drawer.draw(world.renderable);
  world.renderables.forEach(function (r, i) {
    r.forEach(function (c, d) {
      c.transformation.setTranslation(d * 50, 0, i * 50);
      drawer.draw(c);
    });
  });
});

})));
