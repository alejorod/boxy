let BufferManager = (function(gl) {
  let buffers = {};

  function create({name, description, data, indices}) {
    if (buffers[name]) return;

    let dataBuffer = gl.createBuffer();
    let indexBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    description.stride = indices.length;

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
    return buffers[name].indexBuffer
  }

  return {
    create,
    getDescription,
    getBuffer,
    getIndexBuffer
  };
})(window.gl);
