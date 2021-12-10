import React, { Component } from 'react'
import { Entry } from '../../screen/calculator'
import CalculatorColor from './calculator-color'

type HandleResultProps = {
  result: Entry
}

export default class HandleResult extends Component<HandleResultProps> {
  render () {
    const { result: entry } = this.props

    if (entry.result?.error) {
      return <div className='color-danger'>{entry.result.error}</div>
    }

    if (typeof entry.result.result === 'number') {
      return <span className="number">{entry.result.result}</span>
    }

    if (entry.result.resultStr) {
      return (<CalculatorColor color={entry.result} />)
    }

    return null
  }
}
