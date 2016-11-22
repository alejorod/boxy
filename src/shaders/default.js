export default {
  name: 'default',
  sources: {
    vertex: `
      precision mediump float;
      attribute vec3 vertPosition;
      attribute vec3 vertColor;
      varying vec3 fragColor;
      varying float fogFactor;
      uniform mat4 mWorld;
      uniform mat4 mView;
      uniform mat4 mProj;
      void main()
      {
        fragColor = vertColor;
        gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
        fogFactor = 1.0 - (300.0 - gl_Position.z) / (300.0 - 0.1);
      }
    `,
    fragment: `
      precision mediump float;
      varying vec3 fragColor;
      varying float fogFactor;
      void main()
      {
        gl_FragColor = mix(vec4(fragColor, 1.0), vec4(0.2, 0.4, 0.95, 1.0), clamp(fogFactor, 0.0, 1.0));
      }
    `
  },
  attributes: [ 'vertPosition', 'vertColor' ],
  uniforms: [ 'mWorld', 'mView', 'mProj' ]
}
