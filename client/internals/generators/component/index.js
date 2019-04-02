const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      default: 'Stateless Function',
      choices: () => [ // eslint-disable-line arrow-body-style
        'Stateless Function',
        // We could add more options here but with hooks.. 🤷‍
      ],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: (value) => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'directory',
      name: 'path',
      message: 'Where you like to put this component?',
      basePath: './',
    },
    {
      type: 'confirm',
      name: 'wantStorybook',
      default: true,
      message: 'Do you want a story for the component to be created?',
    },
  ],
  actions: (data) => {
    // Generate index.js and index.test.js
    let componentTemplate;

    switch (data.type) {
      case 'Stateless Function': {
        componentTemplate = './component/stateless.tsx.hbs';
        break;
      }
      // this is where we would add the templates for other component styles
      default: {
        componentTemplate = './component/stateless.tsx.hbs';
      }
    }

    const actions = [
      {
        type: 'add',
        path: '../../{{path}}/{{kebabCase name}}/index.tsx',
        templateFile: componentTemplate,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../{{path}}/{{kebabCase name}}/tests/index.spec.tsx',
        templateFile: './component/test.tsx.hbs',
        abortOnFail: true,
      },
    ];

    // If want index.stories.js to develop the component
    if (data.wantStorybook) {
      actions.push({
        type: 'add',
        path: '../../{{path}}/{{kebabCase name}}/index.stories.tsx',
        templateFile: './component/storybook.tsx.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
