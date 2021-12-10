import React, { Component } from 'react'
import * as ColorMath from 'color-math'
import Icon from '../component/icons'
import Modal from '../component/modal'
import CalculatorHelp, { defineColors, modelColors, operationsColor, blendingColor } from '../component/calculator/calculator-help'
import HandleResult from '../component/calculator/handle-result'
import { generateUniqueId } from '../utils/math';

const tips = [
  ...defineColors,
  ...modelColors,
  ...operationsColor,
  ...blendingColor
];

// https://www.npmjs.com/package/color-math

export type Entry = {
  id?: string;
  input: string;
  result: any;
}

type CalculatorProps = {

}

export default class Calculator extends Component<CalculatorProps> {
  state: any = {
    exp: '',
    error: '',
    help: false,
    lists: []
  }

  update = (event: any) => {
    this.setState({
      error: '', // Reset error
      exp: event.target.value
    })
  }

  generate = () => {
    if (this.state.exp === '' || this.state.exp === undefined) {
      this.setState({ error: 'Nothing to evaluate try checking the help page for some suggestions' })
      return
    }

    const entry = {
      id: generateUniqueId(8),
      input: this.state.exp,
      result: ColorMath.evaluate(this.state.exp)
    }

    this.setState({ lists: [...this.state.lists, entry] })
  }

  toggleHelp = () => {
    this.setState({ modal: !this.state.modal })
  }

  helper () {
    return (
      <Icon name='help' onClick={() => this.toggleHelp()} />
    )
  }

  handleEnter = (e: any) => {
    if (e.key === 'Enter') {
      this.generate();
    }
  }

  renderList () {
    if (this.state.error.length > 0) {
      return <p className='color-danger-bg'>{this.state.error}</p>
    }

    if (this.state.lists.length > 0) {
      return this.state.lists.reverse().map((entry: any, index: number) => {
        return (
          <div key={entry.id} className='calculatorResultWrapper'>
            <pre><code>{entry.input}</code></pre>
            <HandleResult result={entry} />
          </div>
        )
      })
    }

    return (
      <React.Fragment>
        <p className='infoBlock'>
          Use the input above to write color expressions, for help
          check the question mark to see some examples.
          <br />
          <kbd>{ tips[Math.floor(Math.random() * tips.length)].expression }</kbd>
        </p>
      </React.Fragment>

      )
  }

  render () {
    return (
      <div className='calculator'>
        <Modal isOpen={this.state.modal} onRequestClose={this.toggleHelp}>
          <CalculatorHelp />
        </Modal>
        <h2>Calculator {this.helper()}</h2>
        <div className='card'>
          <div className='form-element pb-4'>
            <div className='form-group'>
              <input
                className='form-control'
                onChange={this.update}
                onKeyDown={this.handleEnter}
                name='expression'
                type='text'
                value={this.state.exp}
                placeholder='Enter expression'
              />
              <div className='form-addon'>
                <button className="btn-outline" onClick={this.generate}>Execute</button>
              </div>
            </div>
          </div>

          {
            this.renderList()
          }
        </div>
      </div>
    )
  }
}
