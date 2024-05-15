// auto import all modules/*.js smart & beautiful
const modulesFiles = require.context('.', false, /\.js$/);
let configRouters = [];
// inject routers
modulesFiles.keys().reduce((paths, currPath) => {
  if (currPath === './index.js') return;
  configRouters = configRouters
    .concat(modulesFiles(currPath).default)
    .sort((a, b) => (a.sort ? a.sort - b.sort : -1));
  return configRouters;
}, {});

export default configRouters;
