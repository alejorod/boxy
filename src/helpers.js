// import * as buffers from './buffers';
import cube from './buffers/cube';
// import * as shaders from './shaders';
import shader from './shaders/default';
import { gl } from './webgl';
import BufferManager from './managers/buffer';
import ShaderManager from './managers/shader';

export function loop(cb) {
  let lastTime = 0;

  function f(time) {
    requestAnimationFrame(f);
    lastTime = lastTime ? lastTime : time;
    cb(time - lastTime);
    lastTime = time;
  }

  requestAnimationFrame(f)
}

export function initWebgl() {
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.frontFace(gl.CCW);
  gl.cullFace(gl.BACK);
}

export function loadShaders() {
  [shader].forEach(function(s) {
    ShaderManager.create(s);
  });
}

export function loadBuffers() {
  [cube].forEach(function(b) {
    BufferManager.create(b);
  });
}
