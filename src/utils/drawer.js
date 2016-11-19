import { gl } from '../webgl';
import BufferManager from '../managers/buffer';
import ShaderManager from '../managers/shader';

class Drawer {
  constructor(camera, projection) {
    this.camera = camera;
    this.projection = projection;
  }

  clear() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  drawShaderBatch({shader, items}) {
    let attributes = ShaderManager.getAttributes(shader);
    let uniforms = ShaderManager.getUniforms(shader);
    let newProgram = ShaderManager.use(shader);

    gl.uniformMatrix4fv(uniforms['mProj'], gl.FALSE, this.projection);
    gl.uniformMatrix4fv(uniforms['mView'], gl.FALSE, this.camera.matrix);

    items.forEach((r) => {
      let description = BufferManager.getDescription(r.buffer);
      let buffer = BufferManager.getBuffer(r.buffer);
      let indexBuffer = BufferManager.getIndexBuffer(r.buffer);

      let newBuffer = BufferManager.bindBuffer(r.buffer);

      gl.uniformMatrix4fv(uniforms['mWorld'], gl.FALSE, r.matrix);

      if (newProgram || newBuffer) {
        Object.keys(attributes).forEach(function(attributeKey) {
          let config = description[attributeKey];
          let location = attributes[attributeKey];
          gl.enableVertexAttribArray(location);
          gl.vertexAttribPointer(
            location,
            config.count,
            config.type,
            gl.FALSE,
            description.stride,
            config.offset
          );
        });
      }

      gl.drawElements(gl.TRIANGLES, description.indexLength, gl.UNSIGNED_SHORT, 0);
    });
  }

  drawBatch(renderables) {
    renderables.forEach(r => this.draw(r));
  }

  draw(renderable) {
    let description = BufferManager.getDescription(renderable.buffer);
    let buffer = BufferManager.getBuffer(renderable.buffer);
    let indexBuffer = BufferManager.getIndexBuffer(renderable.buffer);
    let attributes = ShaderManager.getAttributes(renderable.shader);
    let uniforms = ShaderManager.getUniforms(renderable.shader);

    let newProgram = ShaderManager.use(renderable.shader);
    let newBuffer = BufferManager.bindBuffer(renderable.buffer);

    if (newProgram || newBuffer) {
      Object.keys(attributes).forEach(function(attributeKey) {
        let config = description[attributeKey];
        let location = attributes[attributeKey];
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(
          location,
          config.count,
          config.type,
          gl.FALSE,
          description.stride,
          config.offset
        );
      });
    }

    gl.uniformMatrix4fv(uniforms['mProj'], gl.FALSE, projection);
    gl.uniformMatrix4fv(uniforms['mView'], gl.FALSE, camera.matrix);
    gl.uniformMatrix4fv(uniforms['mWorld'], gl.FLASE, renderable.matrix);

    gl.drawElements(gl.TRIANGLES, description.indexLength, gl.UNSIGNED_SHORT, 0);
  }
}

function create({camera, projection}) {
  return new Drawer(camera, projection);
}

export default {
  create
}
