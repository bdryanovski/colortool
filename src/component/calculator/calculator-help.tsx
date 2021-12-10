import React, { Component } from 'react'
import * as ColorMath from 'color-math'
import ShowHide from '../ui/show-hide'
import HandleResult from './handle-result'

export const defineColors = [
  {
    expression: '#ffcc00',
    description: 'Hexadecimal color representation'
  },
  {
    expression: 'ffcc00',
    description: 'Hexadecimal color representation without hash symbol'
  },
  {
    expression: '#fc0',
    description: 'Short hexadecimal color representation'
  },
  {
    expression: 'skyblue',
    description: 'Color literals from W3C/X11 specification'
  },
  {
    expression: 'rand',
    description: 'Generate random color'
  },
  {
    expression: 'num 33023',
    description: 'Color from number'
  },
  {
    expression: 'temp 3500',
    description: 'Color by temperature in Kelvin'
  },
  {
    expression: 'wl 560',
    description: 'Color from wavelength value'
  }
]

export const modelColors = [
  {
    expression: 'rgb 127 255 212',
    description: 'RGB color model'
  },
  {
    expression: 'rgba 135 206 235 75%',
    description: 'RGB color model with alpha channel'
  },
  {
    expression: 'argb .7 255 99 71',
    description: 'RGB color model with alpha channel (first)'
  },
  {
    expression: 'hsl 159.8 100% 75%',
    description: 'HSL color model'
  },
  {
    expression: 'hsla 197 .71 .73 55%',
    description: 'HSL color model with alpha channel'
  }
]
export const operationsColor = [
  {
    expression: '#444 * 2',
    description: 'Arithmetic operations with numbers'
  },
  {
    expression: '~red',
    description: 'invert color'
  },
  {
    expression: 'red | green',
    description: 'mix colors'
  },
  {
    expression: 'red | {25%} green',
    description: 'mix colors in variable proportion'
  },
  {
    expression: 'red | {25% hsl} green',
    description: 'mix colors in variable proportion and specific color model'
  },
  {
    expression: 'red | {hsl} green',
    description: 'mix colors in specific color model'
  },
  {
    expression: 'hotpink << 50%',
    description: 'desaturate color'
  },
  {
    expression: 'rgb 165 42 42 >> .2',
    description: 'saturate color'
  },
  {
    expression: 'temp 4000 <<< 30%',
    description: 'darken color'
  },
  {
    expression: '#fc0 >>> 70%',
    description: 'lighten color'
  },
  {
    expression: 'pink %% hotpink',
    description: 'compute WCAG contrast ratio between two colors'
  }
]
export const blendingColor = [
  {
    expression: '#222 + #444',
    description: 'add colors'
  },
  {
    expression: '#ccc - #111',
    description: 'subtract colors'
  },
  {
    expression: '#ff6600 * #ccc',
    description: 'multiply colors'
  },
  {
    expression: '#222 / #444',
    description: 'devide colors'
  },
  {
    expression: 'skyblue <<< tomato',
    description: 'darken colors'
  },
  {
    expression: 'skyblue >>> tomato',
    description: 'lighten colors'
  },
  {
    expression: '#ff6600 !* #00ff00',
    description: 'screen colors'
  },
  {
    expression: '#ff6600 ** #999',
    description: 'overlay colors'
  },
  {
    expression: 'olive <* pink',
    description: 'hard light'
  },
  {
    expression: 'olive *> pink',
    description: 'soft light'
  },
  {
    expression: 'ffcc00 ^* ccc',
    description: 'difference'
  },
  {
    expression: 'ffcc00 ^^ ccc',
    description: 'exclusion'
  },

  {
    expression: 'ffcc00 !^ ccc',
    description: 'negate '
  },
  {
    expression: 'indigo << red',
    description: 'burn'
  },
  {
    expression: 'indigo >> red',
    description: 'dodge'
  }
]

export default class CalculatorHelp extends Component {
  expression (description: string, expression: string) {
    return (
      <ShowHide
        component={<div className='lineExample'><kbd>{expression}</kbd><span>{description}</span></div>}
      >
        <div className='resultWrap'>
          <HandleResult result={{ input: expression, result: ColorMath.evaluate(expression) }} />
        </div>
      </ShowHide>
    )
  }

  defineColors () {
    return defineColors.map((d, index) => {
      return (
        <div key={index}>
          {this.expression(d.description, d.expression)}
        </div>
      )
    })
  }

  modelsColor () {
    return modelColors.map((d, index) => {
      return (
        <div key={index}>
          {this.expression(d.description, d.expression)}
        </div>
      )
    })
  }

  blendingColor () {
    return blendingColor.map((d, index) => {
      return (
        <div key={index}>
          {this.expression(d.description, d.expression)}
        </div>
      )
    })
  }

  operationsColor () {
    return operationsColor.map((d, index) => {
      return (
        <div key={index}>
          {this.expression(d.description, d.expression)}
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        <h2>Help</h2>
        <p>
          Try some of the examples below to see what and how some of the expressions works.
        </p>

        <h3>Color definition</h3>
        <div className='card'>
          {this.defineColors()}
        </div>

        <h3>Color models</h3>
        <div className='card'>{this.modelsColor()}</div>

        <h3>Color Operations</h3>
        <div className='card'>{this.operationsColor()}</div>

        <h3>Color Blending</h3>
        <div className='card'>{this.blendingColor()}</div>

      </div>
    )
  }
}
