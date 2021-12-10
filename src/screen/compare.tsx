import React, { Component } from 'react'
import Details from '../component/details'
import { randomColor } from '../utils/color';

import 'react-toastify/dist/ReactToastify.css'

export default class Compare extends Component {
  state = {
    a: randomColor(),
    b: randomColor()
  }

  setColor = (name: string, color: string) => {
    this.setState({ [name]: color })
  }

  render () {
    return (
      <>
        <h2>Compare colors</h2>
        <div className='row around'>
          <div className='card compare-container'>
            <Details color={this.state.a} background={this.state.b} change={(color: string) => { this.setColor('a', color) }} />
          </div>

          <div className='card compare-container'>
            <Details color={this.state.b} background={this.state.a} change={(color: string) => { this.setColor('b', color) }} />
          </div>
        </div>
      </>
    )
  }
}
