import { initWebgl, loadShaders, loadBuffers, loop } from './helpers';
import { camera, drawer, world } from './utils/index';

initWebgl();
loadShaders();
loadBuffers();

loop(function(delta) {
  camera.update(delta);
  world.update(delta);

  drawer.clear();
  // drawer.draw(world.renderable);
  world.renderables.forEach(function(r, i) {
    r.forEach(function(c, d) {
      c.transformation.setTranslation(d * 50, 0, i * 50);
      drawer.draw(c);
    })
  });
});
