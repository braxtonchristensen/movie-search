import { configure } from '@storybook/react';
// automatically import all files ending in *.stories.tsx

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context("..", true, /.stories.tsx$/));
}

configure(loadStories, module);