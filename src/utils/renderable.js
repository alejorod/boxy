import TransformableObject from './transformable-object';

class Renderable extends TransformableObject {
  constructor(shader, buffer) {
    super();

    this.shader = shader;
    this.buffer = buffer;
  }
}

function create({shader, buffer}) {
  return new Renderable(shader, buffer);
}

export default {
  create
};
