'use strict'
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: `No using the index as the v-for key's only dynamic value`,
      categories: undefined,
      url: 'https://vueschool.io/articles/vuejs-tutorials/tips-and-gotchas-for-using-key-with-v-for-in-vue-js-3/',
    },
    fixable: null,
    messages: {
      invalidKey: `Invalid key, make sure to use a unique value specific to the items being iterated. If property being iterated is a count, make sure the property name ends with 'count'`,
    },
  },
  create(context) {
    // Reports if the loop only uses the index for it's key
    const verify = (node) => {
      const vForNode = getVForNodeFromParent(node)
      const doesNodeContainVFor = !!vForNode
      if (!doesNodeContainVFor) {
        return
      }
      const isIteratedPropertyAnInteger =
        checkIsIteratedPropertyAnInteger(vForNode)
      if (isIteratedPropertyAnInteger) {
        return
      }
      const isPropertyACount = checkIsPropertyACount(vForNode)
      if (isPropertyACount) {
        return
      }

      // TODO: add exception if property being iterated ends with Count
      const keyNode = getVForKeyNodeFromParent(node)
      const isKeyValid = validateKey(keyNode)

      if (!isKeyValid) {
        context.report({
          node,
          // message: `${vForNode.value.expression.right.raw}`,
          messageId: 'invalidKey',
        })
      }
    }

    // Register the given visitor to parser services.
    function defineTemplateBodyVisitor(
      context,
      templateBodyVisitor,
      scriptVisitor,
      options
    ) {
      return context.parserServices.defineTemplateBodyVisitor(
        templateBodyVisitor,
        scriptVisitor,
        options
      )
    }

    const visitor = {
      VStartTag: (node) => verify(node),
    }

    return defineTemplateBodyVisitor(context, visitor)
  },
}

const getVForNodeFromParent = (node) => {
  return node.attributes.find(
    (attribute) =>
      attribute.type === 'VAttribute' && attribute.key.name.name === 'for'
  )
}

const getVForKeyNodeFromParent = (node) => {
  return node.attributes.find((attribute) => {
    if (attribute.type === 'VAttribute' && attribute.key) {
      if (attribute.key.argument) {
        return attribute.key.argument.name === 'key'
      }
    }
    return null
  })
}

const validateKey = (keyNode) => {
  if (!keyNode) {
    return true
  }
  const expressions = keyNode.value.expression.expressions
  if (!expressions) {
    // if it doesn't have the expressions array, the key is a single value
    // ex: :key="predefinedFilterIndex" or :key="predefinedFilter.id"
    // expression type might be Identifier or MemberExpression instead of TemplateLiteral
    const expression = keyNode.value.expression
    if (expression.type === 'MemberExpression') {
      return true
    }
    if (expression.type === 'Identifier') {
      return false
    }
    // Case that I haven't seen yet that it isn't either one of these, but don't want to throw an error indiscriminately
    return true
  }

  for (const expression of expressions) {
    if (expression.type === 'MemberExpression') {
      return true
    }
    if (expression.type === 'Identifier' && expressions.length === 1) {
      return false
    }
  }
  return true
}

const checkIsIteratedPropertyAnInteger = (vForNode) => {
  const number = Number(vForNode.value.expression.right.raw)
  return Number.isInteger(number)
}

const checkIsPropertyACount = (vForNode) => {
  const iterator = vForNode.value.expression.right
  if (iterator.type === 'Identifier') {
    const name = vForNode.value.expression.right.name.toLowerCase()
    return name.endsWith('count')
  }
  return false
}
