/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  rules: require('requireindex')(`${__dirname}/rules`),
  configs: {
    'recommended': require('./configs/recommended'),
    '@typescript-recommended': require('./configs/recommendedTS'),
  },
}
