let Transformable = (function(mat4) {
  class Transformation {

    static rotation(x, y, z) {
      let rotation = new Transformation();
      return rotation.rotate(x, y, z);
    }

    static translation(x, y, z) {
      let translation = new Tranformation();
      return translation.translate(x, y, z);
    }

    static scale(x, y, z) {
      let scale = new Transformation();
      return scale.scale(x, y, z);
    }

    constructor() {
      this.xRotation = 0;
      this.zRotation = 0;
      this.yRotation = 0;
      this.xScale = 0;
      this.yScale = 0;
      this.zScale = 0;
      this.xTranslation = 0;
      this.zTranslation = 0;
      this.yTranslation = 0;
      this.dirty = true;

      this._matrix = mat4.identity(new Float32Array(16));
      this._normalMatrix = mat4.identity(new Float32Array(16));
    }

    rotate(x, y, z) {
      this.dirty = true;
      this.xRotation += x;
      this.yRotation += y;
      this.zRotation += z;

      return this;
    }

    translate(x, y, z) {
      this.dirty = true;
      this.xTranslation += x;
      this.yTranslation += y;
      this.zTranslation += z;

      return this;
    }

    scale(x, y, z) {
      this.dirty = true;
      this.xScale += x;
      this.yScale += y;
      this.zScale += z;

      return this;
    }

    setScale(x, y, z) {
      this.dirty = true;
      this.xScale = x;
      this.yScale = y;
      this.zScale = z;
    }

    setRotation(x, y, z) {
      this.dirty = true;
      this.xRotation = x;
      this.yRotation = y;
      this.zRotation = z;
    }

    setTranslation(x, y, z) {
      this.dirty = true;
      this.xTranslation = x;
      this.yTranslation = y;
      this.zTranslation = z;
    }


    getMatrix() {
      if (this.dirty) {
        mat4.identity(this._matrix);
        mat4.rotateX(
          this._matrix,
          this._matrix,
          this.xRotation
        );
        mat4.rotateY(
          this._matrix,
          this._matrix,
          this.yRotation
        );
        mat4.rotateZ(
          this._matrix,
          this._matrix,
          this.zRotation
        );
        mat4.translate(
          this._matrix,
          this._matrix,
          [this.xTranslation, this.yTranslation, this.zTranslation]
        );
        mat4.scale(
          this._matrix,
          this._matrix,
          [this.xScale, this.yScale, this.zScale]
        );

        this.dirty = false;
      }

      return this._matrix;
    }

    getNormalMatrix() {
      throw Error('Not Implemented!');
    }
  }

  class TransformationStack {
    constructor() {
      this.transformations = [];
      this.dirty = true;
      this._matrix = new Float32Array(16);
      this._normalMatrix = new Float32Array(16);
    }

    rotate(x, y, z) {
      this.dirty = true;
      this.transformations.push(Transformation.rotation(x, y, z));
      return this;
    }

    translate(x, y, z) {
      this.dirty = true;
      this.transformations.push(Transformation.translate(x, y, z));
      return this;
    }

    scale(x, y, z) {
      this.dirty = true;
      this.transformations.push(Transformation.scale(x, y, z));
      return this;
    }

    add(transformation) {
      this.dirty = true;
      this.transformations.push(transformation);
      return this;
    }

    getMatrix() {
      if (this.dirty) {
        mat4.identity(this._matrix);
        this.transformations
          .map(t => t.getMatrix())
          .forEach((m) => {
            mat4.multiply(this._matrix, this._matrix, m);
          });

        this.dirty = false;
      }

      return this._matrix;
    }

    getNormalMatrix() {
      throw Error('Not Implemented!');
    }
  }

  function single() {
    return new Transformation();
  }

  function stack() {
    return new TransformationStack();
  }

  return {
    single,
    stack
  }
})(window.mat4);
