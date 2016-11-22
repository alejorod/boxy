let canvas = document.createElement('canvas');
canvas.width = 1024;
canvas.height = 768;
document.body.append(canvas);

export const gl = canvas.getContext('webgl', {
  alpha: false
});
