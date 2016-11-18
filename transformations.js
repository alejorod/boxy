// import { mat4 } from 'gl-matrix';

class Transformation {
  constructor() {
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

  rotate(x, y, z) {
    this.rotation.x += x;
    this.rotation.y += y;
    this.rotation.z += z;
  }

  setRotation(x, y, z) {
    this.rotation = {
      x: x,
      y: y,
      z: z
    };
  }

  scale(x, y, z) {
    this.scales.x *= x;
    this.scales.y *= y;
    this.scales.z *= z;
  }

  setScale(x, y, z) {
    this.scales = {
      x: x,
      y: y,
      z: z
    };
  }

  translate(x, y, z) {
    this.translation.x += x;
    this.translation.y += y;
    this.translation.z += z;
  }

  setTranslation(x, y, z) {
    this.translation = {
      x: x,
      y: y,
      z: z
    };
  }

  get rotationMatrix() {
    mat4.identity(this._rotationMatrix);
    mat4.rotateX(
      this._rotationMatrix,
      this._rotationMatrix,
      this.rotation.x
    );

    mat4.rotateY(
      this._rotationMatrix,
      this._rotationMatrix,
      this.rotation.y
    );

    mat4.rotateZ(
      this._rotationMatrix,
      this._rotationMatrix,
      this.rotation.z
    );

    return this._rotationMatrix;
  }

  get matrix() {
    mat4.scale(
      this._matrix,
      mat4.identity(new Float32Array(16)),
      [this.scales.x, this.scales.y, this.scales.z]
    );

    mat4.translate(
      this._matrix,
      this._matrix,
      [this.translation.x, this.translation.y, this.translation.z]
    );

    mat4.multiply(this._matrix, this._matrix, this.rotationMatrix);

    return this._matrix;
  }
}


function create() {
  return new Transformation();
}

function combine(t1, t2) {
  let c = new Float32Array(16);
  mat4.multiply(c, t1.matrix, t2.matrix);
  return c;
}

const T = {
  create,
  combine
}
