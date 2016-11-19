import { initWebgl, loadShaders, loadBuffers, loop } from './helpers';
import { camera, drawer, world } from './utils/index';

initWebgl();
loadShaders();
loadBuffers();

loop(function(delta) {
  camera.update(delta);
  // world.update(delta);

  drawer.clear();
  drawer.drawShaderBatch({
    shader: 'default',
    items: world.items
  });
});
