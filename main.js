ShaderManager.create({
  name: 'default',
  sources: {
    vertex: `
      precision mediump float;
      attribute vec3 vertPosition;
      attribute vec3 vertColor;
      varying vec3 fragColor;
      uniform mat4 mWorld;
      uniform mat4 mView;
      uniform mat4 mProj;
      void main()
      {
        fragColor = vertColor;
        gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
      }
    `,
    fragment: `
      precision mediump float;
      varying vec3 fragColor;
      void main()
      {
        gl_FragColor = vec4(fragColor, 1.0);
      }
    `
  },
  attributes: [ 'vertPosition', 'vertColor' ],
  uniforms: [ 'mWorld', 'mView', 'mProj' ]
});


BufferManager.create({
  name: 'default-cube',
  description: {
    stride: Float32Array.BYTES_PER_ELEMENT * 6,
    vertPosition: {
      count: 3,
      type: gl.FLOAT,
      offset: 0
    },
    vertColor: {
      count: 3,
      type: gl.FLOAT,
      offset: Float32Array.BYTES_PER_ELEMENT * 3
    }
  },
  data: new Float32Array([
    -1.0, 1.0, -1.0,   0.5, 0.5, 0.5,
    -1.0, 1.0, 1.0,    0.5, 0.5, 0.5,
    1.0, 1.0, 1.0,     0.5, 0.5, 0.5,
    1.0, 1.0, -1.0,    0.5, 0.5, 0.5,

    -1.0, 1.0, 1.0,    0.75, 0.25, 0.5,
    -1.0, -1.0, 1.0,   0.75, 0.25, 0.5,
    -1.0, -1.0, -1.0,  0.75, 0.25, 0.5,
    -1.0, 1.0, -1.0,   0.75, 0.25, 0.5,

    1.0, 1.0, 1.0,    0.25, 0.25, 0.75,
    1.0, -1.0, 1.0,   0.25, 0.25, 0.75,
    1.0, -1.0, -1.0,  0.25, 0.25, 0.75,
    1.0, 1.0, -1.0,   0.25, 0.25, 0.75,

    1.0, 1.0, 1.0,    1.0, 0.0, 0.15,
    1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
    -1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
    -1.0, 1.0, 1.0,    1.0, 0.0, 0.15,

    1.0, 1.0, -1.0,    0.0, 1.0, 0.15,
    1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
    -1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
    -1.0, 1.0, -1.0,    0.0, 1.0, 0.15,

    -1.0, -1.0, -1.0,   0.5, 0.5, 1.0,
    -1.0, -1.0, 1.0,    0.5, 0.5, 1.0,
    1.0, -1.0, 1.0,     0.5, 0.5, 1.0,
    1.0, -1.0, -1.0,    0.5, 0.5, 1.0,
  ]),
  indices: new Uint16Array([
    0, 1, 2,
    0, 2, 3,

    5, 4, 6,
    6, 4, 7,

    8, 9, 10,
    8, 10, 11,

    13, 12, 14,
    15, 14, 12,

    16, 17, 18,
    16, 18, 19,

    21, 20, 22,
    22, 20, 23
  ])
});

let lastTime;

let ts = [];
let t = null;

for (var i = 0; i < 100; i++) {
  t = new TransformableObject();
  t.translate(3 * i, 0, 0);

  if (i) {
    t.parent = ts[0];
  } else {
    t.scale(0.2, 0.2, 0.2);
  }
  ts.push(t);
}

let camera = Camera.create();

camera.scale(2, 2, 2);

function loop(time) {

  lastTime = lastTime ? lastTime : time;
  delta = time - lastTime;
  lastTime = time;

  requestAnimationFrame(loop);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  camera.update(delta);

  ts.forEach((o, i) => {
    Drawer.draw({
      shaderName: 'default',
      bufferName: 'default-cube',
      uniformData: {
        'mWorld': {
          setter: 'uniformMatrix4fv',
          data: o.matrix
        },
        'mView': {
          setter: 'uniformMatrix4fv',
          data: camera.matrix
        },
        'mProj': {
          setter: 'uniformMatrix4fv',
          data: mat4.perspective(
            new Float32Array(16),
            Math.PI / 2,
            canvas.width / canvas.height,
            0.0001,
            10000
          )
        }
      }
    });
  });
}

loop(0);
