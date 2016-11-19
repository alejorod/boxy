import { gl } from '../webgl';

const buffers = {};
let currentBuffer = null;

function create({name, description, data, indices}) {
  if (buffers[name]) return;

  let dataBuffer = gl.createBuffer();
  let indexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  description.indexLength = indices.length;

  buffers[name] = {
    buffer: dataBuffer,
    indexBuffer: indexBuffer,
    description: description
  }
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

export default {
  create,
  getDescription,
  getBuffer,
  getIndexBuffer,
  bindBuffer
};
