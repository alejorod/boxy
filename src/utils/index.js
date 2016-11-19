// import { mat4 } from 'gl-matrix';
import { gl } from '../webgl';
import Camera from './camera';
import Drawer from './drawer';
import Renderable from './renderable';

export const camera = Camera.create();
export const drawer = Drawer.create({
  camera,
  projection: mat4.perspective(
    new Float32Array(16),
    Math.PI / 2,
    gl.canvas.width / gl.canvas.height,
    0.0001,
    10000
  )
});


const items = [];
let item = null;

for (var i = 0; i < 100; i++) {
  item = Renderable.create({buffer: 'default-cube'});
  item.translate(3 * i, 0, 0);
  items.push(item);
}

export const world = {
  get items() {
    return items;
  }
};
