import React, { Component } from 'react'
import * as P from 'polished'

import Scale from './scale'
import { CopyToClipboard } from '../utils/copy'
import { toast } from 'react-toastify'

type DetailsProps = {
  color: string,
  background?: string,
  change?: any
}

const shades = 10

function round (value: any, decimals: number) {
  // @ts-ignore
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

export function hslToString (hsl: any) {
  let { hue, lightness, saturation, alpha } = hsl
  hue = round(hue, 0)
  lightness = round(lightness * 100, 0)
  saturation = round(saturation * 100, 0)
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha || 1})`
}

export default class Details extends Component<DetailsProps> {
  state = {
    invalidColor: false,
    color: '#fff',
    invert: '#000',
    grayscale: '#000',
    tints: [],
    shades: [],
    darkers: [],
    lighters: [],
    hsl: { hue: 0, saturation: 0, lightness: 0, alpha: 0 },
    rgb: { red: 0, green: 0, blue: 0, alpha: 0 },
    string: ''
  }

  generate = () => {
    const state: any = {
      invalidColor: false,
      shades: [],
      tints: [],
      darkers: [],
      lighters: []
    }

    const color = this.state.color

    // shades
    try {
      for (let i = 1; i <= shades; i++) {
        state.shades.push(P.shade(i / shades, color))
        state.tints.push(P.tint(i / shades, color))
        state.darkers.push(P.darken(i / shades, color))
        state.lighters.push(P.lighten(i / shades, color))
      }

      state.hsl = P.parseToHsl(color)
      state.rgb = P.parseToRgb(color)
      state.string = P.rgbToColorString(state.rgb)
      state.invert = P.invert(color)
      state.grayscale = P.grayscale(color)

      this.setState(state)
    } catch (e) {
      this.setState({ invalidColor: true })
    }

    this.updateListener()
  }

  updateListener () {
    if (this.props.change && typeof this.props.change === 'function') {
      this.props.change(this.state.color)
    }
  }

  updateColor = (event: any) => {
    this.setState({
      color: event.target.value
    })
  }

  handleEnter = (e: any) => {
    if (e.key === 'Enter') {
      this.generate()
    }
  }

  copy = (color: string) => {
    return () => {
      CopyToClipboard(color)
      toast(`${color} copy to clipboard`, { hideProgressBar: true, type: 'info', style: { backgroundColor: color } })
    }
  }

  random = () => {
    const c = '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6)
    this.setState({ color: c }, () => {
      this.generate()
    })
  }

  componentDidMount () {
    this.setState({ color: this.props.color }, () => {
      this.generate()
    })
  }

  score (colora: string, colorb: string = '#FFFFFF') {
    try {
      const score = P.getContrast(colora, colorb)
      const scoreW3 = P.meetsContrastGuidelines(colora, colorb)
      // @ts-ignore
      const s = Object.keys(scoreW3).find((k) => scoreW3[k] === true)

      return (
        <div
          className='scoreBox' style={{
            backgroundColor: colorb,
            color: colora
          }}
        >
          {`${score} (${s || 'Fail'})`} - {`${colorb}`}
        </div>
      )
    } catch (e) {
      return <></>
    }
  }

  convert () {
    const list = [
      this.state.string,
      `rgba(${this.state.rgb.red}, ${this.state.rgb.green}, ${this.state.rgb.blue}, ${this.state.rgb.alpha || 1})`,
      hslToString(this.state.hsl)
    ]
    return (
      <ul className='convertion'>
        {
          list.map((i, k) => {
            return <li key={k} onClick={this.copy(i)}>{i}</li>
          })
        }
      </ul>
    )
  }

  renderColors () {
    return (
      <>
        <h5>Contrast Score</h5>
        <div className='score'>
          {this.score(this.state.color, '#FFFFFF')}
          {this.score(this.state.color, this.props.background)}
        </div>

        <h5>Color models</h5>
        {this.convert()}

        <div className='row around'>
          <div
            onClick={this.copy(this.state.color)} className='colorPreview' style={{
              backgroundColor: this.state.color
            }}
          />
          <div
            onClick={this.copy(this.state.invert)} className='colorPreview' style={{
              backgroundColor: this.state.invert,
              color: this.state.color
            }}
          >Invert
          </div>
          <div
            onClick={this.copy(this.state.grayscale)} className='colorPreview' style={{
              backgroundColor: this.state.grayscale,
              color: this.state.invert
            }}
          >Grayscale
          </div>
        </div>

        <Scale list={this.state.shades} background={this.props.background}>Shade</Scale>
        <Scale list={this.state.tints} background={this.props.background}>Tint</Scale>
        <Scale list={this.state.lighters} background={this.props.background}>Light</Scale>
        <Scale list={this.state.darkers} background={this.props.background}>Dark</Scale>
      </>
    )
  }

  render () {
    return (
      <div>

        <div className="form-element pb-2">
          <div className="form-group">
            <div className="form-addon">
              <button className="btn-outline" onClick={this.random}>Random</button>
            </div>
            <input
              className='form-control'
              id='colorInput'
              onChange={this.updateColor}
              onKeyDown={this.handleEnter}
              name='color'
              type='text'
              value={this.state.color}
              placeholder='Enter color'
            />
            <div className="form-addon">
              <button className="btn-outline" onClick={this.generate}>Calculate</button>
            </div>
          </div>
        </div>
        {
          this.state.invalidColor
            ? <p className='error'>The color or the format is invalid</p>
            : this.renderColors()
        }

      </div>
    )
  }
}
