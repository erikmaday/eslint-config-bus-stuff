/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  rules: require('requireindex')(`${__dirname}/rules`),
  configs: {
    'recommended': require('./configs/recommended'),
    'recommended-vue': require('./configs/recommendedTS'),
    '@typescript-recommended': require('./configs/recommendedTS'),
    '@typescript-recommended-vue': require('./configs/recommendedTSVue'),
  },
}
