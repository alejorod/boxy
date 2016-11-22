export default {
  name: 'default',
  sources: {
    vertex: `
      precision mediump float;
      attribute vec3 vertPosition;
      attribute vec3 vertColor;
      attribute vec3 vertNormal;
      varying vec3 fragColor;
      varying float height;
      varying float fogFactor;
      varying float directional;
      uniform mat4 mWorld;
      uniform mat4 mView;
      uniform mat4 mProj;

      void main()
      {
        height = vertPosition.y;
        vec3 directionalVector = vec3(0.1, 1.0, 0.0);
        directional = dot(normalize(vertNormal), directionalVector);

        gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
        fogFactor = 1.0 - (300.0 - gl_Position.z) / (300.0 - 0.1);
      }
    `,
    fragment: `
      precision mediump float;
      varying float height;
      varying vec3 fragColor;
      varying float fogFactor;
      varying float directional;

      void main()
      {
        vec4 black = vec4(0.1, 1.0, 0.2, 1.0);
        vec4 white = vec4(1.0, 0.5, 0.2, 1.0);
        float k = 4.0 * (height/20.0);
        float red = clamp(min(k - 1.5, 4.5 - k), 0.0, 1.0);
        float green = clamp(min(k - 0.5, 3.5 - k), 0.0, 1.0);
        float blue  = clamp(min(k + 0.5, 2.5 - k), 0.0, 1.0);
        vec4 hcolor = mix(black, vec4(red, green, blue, 1.0), 0.3);
        vec4 directionalLightColor = vec4(vec3(1.0, 1.0, 1.0) * directional, 1.0);
        vec4 color = mix(hcolor, directionalLightColor, 0.4);
        gl_FragColor = mix(color, vec4(0.2, 0.4, 0.95, 1.0) , clamp(fogFactor, 0.0, 1.0));
      }
    `
  },
  attributes: [ 'vertPosition', 'vertColor', 'vertNormal' ],
  uniforms: [ 'mWorld', 'mView', 'mProj' ]
}
