let Drawer = (function(gl) {
  function draw({shaderName, bufferName, uniformData}) {
    let description = BufferManager.getDescription(bufferName);
    let buffer = BufferManager.getBuffer(bufferName);
    let indexBuffer = BufferManager.getIndexBuffer(bufferName);
    let attributes = ShaderManager.getAttributes(shaderName);
    let uniforms = ShaderManager.getUniforms(shaderName);

    ShaderManager.use(shaderName);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    Object.keys(uniforms).forEach(function(uniformKey) {
      let config = uniformData[uniformKey];
      let location = uniforms[uniformKey];
      gl[config.setter](location, gl.FALSE, config.data);
    });

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

    gl.drawElements(gl.TRANGLES, description.indexLength, gl.UNSIGNED_SHORT, 0);
  }

  return {
    draw
  }
})(window.gl);
