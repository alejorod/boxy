import { gl } from '../webgl';

const shaders = {};
let currentProgram = null;

function create({name, sources, attributes, uniforms}) {
  if (shaders[name]) return;

  let vertexShader = gl.createShader(gl.VERTEX_SHADER);
  let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, sources.vertex);
  gl.shaderSource(fragmentShader, sources.fragment);

  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(vertexShader));
    gl.deleteShader(vertexShader);
    return;
  }

  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(fragmentShader));
    gl.deleteShader(fragmentShader);
    return;
  }

  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return;
  }

  let attributeLocations = {};
  let uniformLocations = {};

  attributes.forEach((name) => {
    attributeLocations[name] = gl.getAttribLocation(program, name);
  });

  uniforms.forEach((name) => {
    uniformLocations[name] = gl.getUniformLocation(program, name);
  });

  shaders[name] = {
    program: program,
    attributes: attributeLocations,
    uniforms: uniformLocations
  };
};

function use(name) {
  if (currentProgram === name) return false;
  gl.useProgram(shaders[name].program);
  return true;
}

function getAttributes(shaderName, attributeName) {
  return shaders[shaderName].attributes;
}

function getUniforms(shaderName, uniformName) {
  return shaders[shaderName].uniforms;
}


export default {
  create,
  use,
  getAttributes,
  getUniforms
}
