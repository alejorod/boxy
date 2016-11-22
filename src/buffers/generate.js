import cube from './cube';
import T from '../utils/transformation';

const strideLength = cube.description.stride / Float32Array.BYTES_PER_ELEMENT;

export default function generate(chunk) {
  let bufferData = [];
  let indexBufferData = [];
  let lastIndex = 0;
  let t = T.create();
  let transformedVertexPosition = new Float32Array(3);
  let finalVertex = new Float32Array(strideLength);
  let vertexPosition;

  chunk.items.forEach(function(row, x) {
    row.forEach(function(column, z) {
      let y = column;
      t.setTranslation(x, y, z);
      lastIndex = Math.floor(bufferData.length / strideLength);
      for (var i = 0; i < cube.data.length; i += strideLength) {
        vertexPosition = [
          cube.data[i],
          cube.data[i + 1],
          cube.data[i + 2]
        ];
        vec3.transformMat4(transformedVertexPosition, vertexPosition, t.matrix);

        finalVertex[0] = transformedVertexPosition[0];
        finalVertex[1] = transformedVertexPosition[1];
        finalVertex[2] = transformedVertexPosition[2];

        for (var j = 3; j < strideLength; j++) {
            finalVertex[j] = cube.data[i + j];
        }

        bufferData.push.apply(bufferData, finalVertex);
      }

      indexBufferData.push.apply(indexBufferData, cube.indices.map(i => i + lastIndex));
    })
  });

  return {
    name: chunk.name,
    description: cube.description,
    data: new Float32Array(bufferData),
    indices: new Uint16Array(indexBufferData)
  };
}
