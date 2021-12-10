import React, { Component } from 'react'
import { MdContentCopy, MdSync, MdGradient, MdLoop, MdCompareArrows, MdExposure, MdHelp } from 'react-icons/md'

const ICON_LIST: any = {
  copy: MdContentCopy,
  reload: MdSync,
  refresh: MdLoop,
  list: MdGradient,
  compare: MdCompareArrows,
  calculator: MdExposure,
  help: MdHelp
}

const ICON_SIZE: any = {
  default: 20,
  small: 15
}

type IconProps = {
  name: string
  alt?: string
  size?: string
  className?: string
  onClick?: () => void
}

export default class Icon extends Component<IconProps> {
  render () {
    if (Object.keys(ICON_LIST).includes(this.props.name)) {
      const IconName: any = ICON_LIST[this.props.name]
      return <IconName
        alt={this.props.alt || ''}
        size={ICON_SIZE[this.props.size || 'default']}
        className={['icon', this.props.className].join(' ')}
        onClick={() => typeof this.props.onClick === 'function' ? this.props.onClick() : undefined}
      />
    }

    return <></>
  }
}
