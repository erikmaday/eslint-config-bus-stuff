module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce `for..of` loops over `Array.forEach`',
    },
    schema: [],
    url: 'https://medium.com/swlh/all-loops-are-a-code-smell-6416ac4865d6',
  },

  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.property && node.callee.property.name === 'forEach') {
          context.report({
            node,
            message: 'Prefer for...of instead of Array.forEach',
          })
        }
      },
    }
  },
}
