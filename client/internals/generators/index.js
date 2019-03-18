const fs = require('fs');
const path = require('path');
const promptDirectory = require('inquirer-directory');
const componentGenerator = require('./component/index.js');

module.exports = (plop) => {
  plop.setPrompt('directory', promptDirectory);
  plop.setGenerator('component', componentGenerator);
  plop.addHelper('directory', (comp) => {
    try {
      fs.accessSync(
        path.join(__dirname, `../../containers/${ comp }`),
        // @ts-ignore
        fs.F_OK,
      );

      return `containers/${ comp }`;
    } catch (e) {
      return `components/${ comp }`;
    }
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}')); // eslint-disable-line
};
