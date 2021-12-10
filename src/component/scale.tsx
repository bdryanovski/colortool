import React, { Component } from 'react'
import ColorList from './colorlist'
import Icon from './icons'
import { CopyToClipboard, AnyToJson } from '../utils/copy'
import { toast } from 'react-toastify'

type ScaleProps = {
  list: string[];
  background?: string;
}

export default class Scale extends Component<ScaleProps> {
  state = {
    show: false
  }

  copyArrayToJson = (array: string[]) => {
    return () => {
      CopyToClipboard(AnyToJson(array))
      toast('Copy list of colors', { autoClose: 2000, type: 'info' })
    }
  }

  copy = (color: string) => {
    return () => {
      CopyToClipboard(color)
      toast(`${color} copy to clipboard`, { hideProgressBar: true, type: 'default', style: { backgroundColor: color } })
    }
  }

  expand = () => {
    this.setState({ show: !this.state.show })
  }

  scale () {
    return (
      <div className='scale row'>
        {
          this.props.list.map((value, index) => {
            return (
              <div
                onClick={this.copy(value)}
                key={index}
                title={value}
                className='colorTinyBox'
                style={{ backgroundColor: value }}
              />
            )
          })
        }
      </div>
    )
  }

  list () {
    return (
      <ColorList list={this.props.list || []} background={this.props.background} />
    )
  }

  render () {
    return (
      <>
        <h5>
          {this.props.children} {' '}
          <Icon name='copy' onClick={this.copyArrayToJson(this.props.list || [])} />
          <Icon name='list' onClick={this.expand} />
        </h5>

        {
          this.state.show
            ? this.list()
            : this.scale()
        }
      </>
    )
  }
}
