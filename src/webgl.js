let canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.append(canvas);

export const gl = canvas.getContext('webgl');
