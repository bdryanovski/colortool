import React, { Component } from 'react'
import * as P from 'polished'

import { hslToString } from './details'
import { CopyToClipboard } from '../utils/copy'
import { toast } from 'react-toastify'

type ColorListProps = {
  list: string[];
  background?: string;
}
export default class ColorList extends Component<ColorListProps> {
  copy = (color: string) => {
    return () => {
      CopyToClipboard(color)
      toast(`${color} copy to clipboard`, { hideProgressBar: true, type: 'default', style: { backgroundColor: color } })
    }
  }

  render () {
    return (
      <div className='colorlist'>

        {
          this.props.list.map((color, index) => {
            const colorb = this.props.background || '#fff'
            const score = P.getContrast(color, colorb)
            const scoreW3: any = P.meetsContrastGuidelines(color, colorb)
            const s = Object.keys(scoreW3).find((k) => scoreW3[k] === true)
            return (
              <div
                key={index} onClick={this.copy(color)} className='color' style={{
                  backgroundColor: color,
                  color: colorb
                }}
              >
                <span>{color}</span>
                <span>{s}({score})</span>
                <span>{hslToString(P.parseToHsl(color))}</span>
              </div>
            )
          })
        }
      </div>
    )
  }
}
