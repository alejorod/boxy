import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/main.js',
  format: 'umd',
  dest: 'lib/main.js',
  plugins: [ babel({
    babelrc: false,
    presets: [[ "es2015", { modules: false } ]],
    plugins: [ 'syntax-object-rest-spread', 'transform-object-rest-spread' ]
  })],
  moduleName: 'App'
};
