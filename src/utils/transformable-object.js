import T from './transformation';

export default class TransformableObject {
  constructor() {
    this.transformation = T.create();
    this._parent = null;
  }

  rotate(x, y, z) {
    this.transformation.rotate(x, y, z);
    return this;
  }

  scale(x, y, z) {
    this.transformation.scale(x, y, z);
    return this;
  }

  translate(x, y, z) {
    this.transformation.translate(x, y, z);
    return this;
  }

  set parent(p) {
    if (!p instanceof TransformableObject) {
      throw Error('parent need to be an instance of TransformableObject');
    }

    this._parent = p;
    return this;
  }

  get parent() {
    return this._parent;
  }

  get matrix() {
    return this._parent
      ? T.combine(this.parent.transformation, this.transformation)
      : this.transformation.matrix;
  }
}
