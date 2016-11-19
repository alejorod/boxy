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
    return {
      x: Math.sin(this.transformation.rotation.y) * Math.cos(this.transformation.rotation.z),
      y: -Math.sin(this.transformation.rotation.z),
      z: Math.cos(this.transformation.rotation.y) * Math.cos(this.transformation.rotation.z)
    };
  }

  get perpDirection() {
    return {
      x: Math.sin(this.transformation.rotation.y + Math.PI / 2) * Math.cos(this.transformation.rotation.z),
      y: -Math.sin(this.transformation.rotation.z),
      z: Math.cos(this.transformation.rotation.y + Math.PI / 2) * Math.cos(this.transformation.rotation.z)
    };
  }

  update(delta) {
    let direction = this.direction;
    let perpDirection = this.perpDirection;

    let moveVector = {
      x: delta / 150 * direction.x,
      y: delta / 150 * direction.y,
      z: delta / 150 * direction.z
    }

    let perpMoveVector = {
      x: delta / 150 * perpDirection.x,
      y: delta / 150 * perpDirection.y,
      z: delta / 150 * perpDirection.z
    }

    if (keyboard.isPressed('left')) {
      this.rotate(0, Math.PI * delta / 1000, 0)
    }

    if (keyboard.isPressed('right')) {
      this.rotate(0, -Math.PI * delta / 1000, 0)
    }

    if (keyboard.isPressed('up')) {
      this.translate(-moveVector.x, -moveVector.y, -moveVector.z);
    }

    if (keyboard.isPressed('down')) {
      this.translate(moveVector.x, moveVector.y, moveVector.z);
    }

    if (keyboard.isPressed('a')) {
      this.translate(-perpMoveVector.x, -perpMoveVector.y, -perpMoveVector.z);
    }
    if (keyboard.isPressed('d')) {
      this.translate(perpMoveVector.x, perpMoveVector.y, perpMoveVector.z);
    }
  }
}

function create() {
  return new Camera();
}

export default {
  create
};
