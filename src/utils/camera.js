// import { mat4 } from 'gl-matrix';
import keyboard from './keyboard';
import TransformableObject from './transformable-object';

class Camera extends TransformableObject {
  get matrix() {
    let i = mat4.identity(new Float32Array(16));
    mat4.invert(i, super.matrix);
    return i;
  }

  get direction() {
    let dir = new Float32Array(3);
    vec3.transformMat4(dir, [0, 0, 1], this.rotationMatrix);
    return {
      x: dir[0],
      y: dir[1],
      z: dir[2]
    };
  }

  get normalMatrix() {
    let i = mat4.identity(new Float32Array(16));
    mat4.translate(
      i,
      this.rotationMatrix,
      [this.transformation.translation.x, this.transformation.translation.y, this.transformation.translation.z]
    );
    mat4.invert(i, i);
    return i;
  }

  update(delta) {
    let perpDirection = this.perpDirection;

    let rotationVector = {
      x: 0,
      y: 0,
      z: 0
    };

    rotationVector.y += keyboard.isPressed('left') ? Math.PI : 0;
    rotationVector.y += keyboard.isPressed('right') ? -Math.PI : 0;
    rotationVector.x += keyboard.isPressed('up') ? Math.PI : 0;
    rotationVector.x += keyboard.isPressed('down') ? -Math.PI : 0;

    let movingVector = {
      x: 0,
      y: 0,
      z: 0
    };

    movingVector.z += keyboard.isPressed('w') ? -1 : 0;
    movingVector.z += keyboard.isPressed('s') ? 1 : 0;
    movingVector.x += keyboard.isPressed('a') ? -1 : 0;
    movingVector.x += keyboard.isPressed('d') ? 1 : 0;

    this.rotate(rotationVector.x * delta / 1000, rotationVector.y * delta / 1000, rotationVector.z * delta / 1000);

    let direction = new Float32Array(3);

    vec3.transformMat4(
      direction,
      [movingVector.x, movingVector.y, movingVector.z],
      this.rotationMatrix
    )

    this.translate(direction[0] * delta / 10, direction[1] * delta / 10, direction[2] * delta / 10);
  }
}

function create() {
  return new Camera();
}

export default {
  create
};
