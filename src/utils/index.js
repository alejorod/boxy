// import { mat4 } from 'gl-matrix';
import { gl } from '../webgl';
import Camera from './camera';
import Drawer from './drawer';
import Renderable from './renderable';

const noise = new Noise(Math.random());

export const camera = Camera.create();
camera.translate(10, 40, 20);
camera.rotate(0, -Math.PI * 2.2 / 3, 0);
export const drawer = Drawer.create({
  camera,
  projection: mat4.perspective(
    new Float32Array(16),
    Math.PI / 2,
    gl.canvas.width / gl.canvas.height,
    0.3,
    10000000
  )
});


const wm = [];
let d;
let dp;

const chunks = [];

function getClearChunk(size) {
  let chunk = [];
  for (var x = 0; x < size; x++) {
    chunk[x] = [];
    for (var y = 0; y < size; y++) {
      chunk[x][y] = 0;
    }
  }

  return chunk;
}


for (var c = 0; c < 5; c++) {
  chunks[c] = [];
  for (var f = 0; f < 5; f++) {
    chunks[c][f] = getClearChunk(50);
    for (var x = 0; x < 50; x++) {
      for (var y = 0; y < 50; y++) {
        d = Math.abs(Math.floor(noise.perlin2((x + f * 50) / 120, ((y + c * 50) / 120)) * 50)) + 1;
        chunks[c][f][x][y] = d;
      }
    }
  }
}

/**
 * TODO: Remove this
 */
import BufferManager from '../managers/buffer';
import generate from '../buffers/generate';

const renderables = chunks.map((ch, i) => {
  return ch.map((h, fi) => {
    BufferManager.create(generate({
      name: `w_${i}-${fi}`,
      items: h
    }));

    return Renderable.create({
      buffer: `w_${i}-${fi}`,
      shader: 'default'
    });
  });
})

// BufferManager.create(generate({
//   name: 'world',
//   items: wm
// }));

export const world = {
  renderables: renderables,
  update: (delta) => {
    // world.renderables.forEach(function(r) { r.rotate(0, 0, Math.PI * delta / 1000); });
  }
}

// world.renderable.rotate(Math.PI / 2, 0, 0);
