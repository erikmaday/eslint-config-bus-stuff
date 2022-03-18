'use strict'
const path = require('path')
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'no color literals',
      categories: undefined,
    },
    fixable: null,
    messages: {
      forbiddenColorLiteral:
        'Color literals are forbidden, use colors in the color library.',
    },
  },
  /** @param {RuleContext} context */
  create(context) {
    // Reports if the value is static and a color literal on bound style props.
    const verifyStyle = (node) => {
      const value = node.value.value
      const hasColorLiteral = matchColorLiterals(value)
      const hasCssColorLiteral = matchesCssColorLiteral(value)
      if (hasColorLiteral || hasCssColorLiteral) {
        context.report({
          node: node.value,
          messageId: 'forbiddenColorLiteral',
        })
      }
    }

    // Reports if the value is static and a color literal on bound style props.
    const verifyVBindStyle = (node) => {
      // [value.expression.properties='bind']
      for (const n of getReportNodes(node)) {
        context.report({
          node: n,
          messageId: 'forbiddenColorLiteral',
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
      if (context.parserServices.defineTemplateBodyVisitor == null) {
        const filename = context.getFilename()
        if (path.extname(filename) === '.vue') {
          context.report({
            loc: { line: 1, column: 0 },
            message:
              'Use the latest vue-eslint-parser. See also https://eslint.vuejs.org/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error.',
          })
        }
        return {}
      }
      return context.parserServices.defineTemplateBodyVisitor(
        templateBodyVisitor,
        scriptVisitor,
        options
      )
    }

    const visitor = {
      "VAttribute[directive=false][key.name='style']": (node) =>
        verifyStyle(node),
    }
    visitor[
      "VAttribute[directive=true][key.name.name='bind'][key.argument.name='style']"
    ] = verifyVBindStyle

    return defineTemplateBodyVisitor(context, visitor)
  },
}

//Checks whether if the given property node is a static value/
const isStatic = (prop) => {
  return (
    !prop.computed &&
    prop.value.type === 'Literal' &&
    (prop.key.type === 'Identifier' || prop.key.type === 'Literal')
  )
}

// Checks whether the given property node is a color literal.
const isColorLiteral = (value) => {
  value = `${value}`
  const hexRegex = /^#(?:[0-9a-f]{3}){1,2}$/i
  return !!value.match(hexRegex)
}

const issCssColorLiteral = (value) => {
  value = `${value}`
  return cssColors.includes(value)
}

// Checks whether there are color literals in a string.
const matchColorLiterals = (value) => {
  value = `${value}`
  const regex = /#(?:[0-9a-f]{3}){1,2}/gi
  const result = value.match(regex)
  return !!result
}

const matchesCssColorLiteral = (value) => {
  value = `${value}`
  return cssColors.some((color) => value.includes(color))
}

// Gets the static properties of a given expression node.
// takes in the `:style` node to check
const getReportNodes = (node) => {
  const { value } = node
  if (!value) {
    return []
  }
  const { expression } = value
  if (!expression) {
    return []
  }

  let elements
  if (expression.type === 'ObjectExpression') {
    elements = [expression]
  } else if (expression.type === 'ArrayExpression') {
    elements = expression.elements
  } else {
    return []
  }
  const staticProperties = []
  for (const element of elements) {
    if (!element) {
      continue
    }
    if (element.type !== 'ObjectExpression') {
      return staticProperties
    }

    let isAllStatic = true
    for (const prop of element.properties) {
      if (prop.type === 'SpreadElement' || prop.computed) {
        // If `SpreadElement` or computed property exists, it gets only the static properties before it.
        return staticProperties
      }
      if (
        isStatic(prop) &&
        (isColorLiteral(prop.value.value) ||
          issCssColorLiteral(prop.value.value))
      ) {
        staticProperties.push(prop)
      } else {
        isAllStatic = false
      }
    }
    if (!isAllStatic) {
      // If non-static object exists, it gets only the static properties up to that object.
      return staticProperties
    }
  }
  // If all properties are static properties, it returns one root node.
  return [node]
}

const cssColors = [
  'aliceblue',
  'antiquewhite',
  'aqua',
  'aquamarine',
  'azure',
  'beige',
  'bisque',
  'black',
  'blanchedalmond',
  'blue',
  'blueviolet',
  'brown',
  'burlywood',
  'cadetblue',
  'chartreuse',
  'chocolate',
  'coral',
  'cornflowerblue',
  'cornsilk',
  'crimson',
  'cyan',
  'darkblue',
  'darkcyan',
  'darkgoldenrod',
  'darkgray',
  'darkgreen',
  'darkkhaki',
  'darkmagenta',
  'darkolivegreen',
  'darkorange',
  'darkorchid',
  'darkred',
  'darksalmon',
  'darkseagreen',
  'darkslateblue',
  'darkslategray',
  'darkturquoise',
  'darkviolet',
  'deeppink',
  'deepskyblue',
  'dimgray',
  'dodgerblue',
  'firebrick',
  'floralwhite',
  'forestgreen',
  'fuchsia',
  'gainsboro',
  'ghostwhite',
  'gold',
  'goldenrod',
  'gray',
  'green',
  'greenyellow',
  'honeydew',
  'hotpink',
  'indianred',
  'indigo',
  'ivory',
  'khaki',
  'lavender',
  'lavenderblush',
  'lawngreen',
  'lemonchiffon',
  'lightblue',
  'lightcoral',
  'lightcyan',
  'lightgoldenrodyellow',
  'lightgrey',
  'lightgreen',
  'lightpink',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'lightslategray',
  'lightsteelblue',
  'lightyellow',
  'lime',
  'limegreen',
  'linen',
  'magenta',
  'maroon',
  'mediumaquamarine',
  'mediumblue',
  'mediumorchid',
  'mediumpurple',
  'mediumseagreen',
  'mediumslateblue',
  'mediumspringgreen',
  'mediumturquoise',
  'mediumvioletred',
  'midnightblue',
  'mintcream',
  'mistyrose',
  'moccasin',
  'navajowhite',
  'navy',
  'oldlace',
  'olive',
  'olivedrab',
  'orange',
  'orangered',
  'orchid',
  'palegoldenrod',
  'palegreen',
  'paleturquoise',
  'palevioletred',
  'papayawhip',
  'peachpuff',
  'peru',
  'pink',
  'plum',
  'powderblue',
  'purple',
  'red',
  'rosybrown',
  'royalblue',
  'saddlebrown',
  'salmon',
  'sandybrown',
  'seagreen',
  'seashell',
  'sienna',
  'silver',
  'skyblue',
  'slateblue',
  'slategray',
  'snow',
  'springgreen',
  'steelblue',
  'tan',
  'teal',
  'thistle',
  'tomato',
  'turquoise',
  'violet',
  'wheat',
  'white',
  'whitesmoke',
  'yellow',
  'yellowgreen',
]
