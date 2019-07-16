import requireDir from 'require-dir';

export default requireDir('../tasks', {
  noCache: true,
  extensions: ['.js'],
  // recurse: true
});