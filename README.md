# eslint-config-bus-stuff

This package provides a .eslintrc as an extensible shared config for Vue 2.X with TypeScript projects.

## Usage

We export one ESLint configuration for your usage (with more coming soon).

### eslint-config-bus-stuff:@typescript-recommended

Our recommended config contains most of our ESLint rules, including ECMAScript 6+ and React. It requires `eslint:recommended`, `@vue/typescript`, `@vue/prettier`, `@vue/prettier/@typescript-eslint`, `vue/essential`, and `vue/recommended`.


1. Install the correct versions of each package, which are listed by the command:

  ```sh
  npm info "eslint-config-bus-stuff@latest" peerDependencies
  ```

  If using **npm 5+**, use this shortcut

  ```sh
  npx install-peerdeps --dev eslint-config-bus-stuff
  ```

  If using **npm < 5**, Linux/OSX users can run

  ```sh
  (
    export PKG=eslint-config-bus-stuff;
    npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"
  )
  ```

  If using **npm < 5**, Windows users can either install all the peer dependencies manually, or use the [install-peerdeps](https://github.com/nathanhleung/install-peerdeps) cli tool.

  ```sh
  npm install -g install-peerdeps
  install-peerdeps --dev eslint-config-bus-stuff
  ```

2. Add `plugins: ['bus-stuff'],` and `extends: ['plugin:bus-stuff/@typescript-recommended']` to your `.eslintrc`