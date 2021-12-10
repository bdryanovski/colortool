import React, { Component } from 'react'

type ShowHideProps = {
  show?: boolean
  onClick?: (state: boolean) => void,
  component: any;
}

export default class ShowHide extends Component<ShowHideProps> {
  state = {
    show: false
  }

  handleChange = () => {
    this.setState({ show: !this.state.show })
  }

  showContent = () => {
    if (this.state.show) {
      return this.props.children
    }
    return null
  }

  render () {
    return (
      <>
        <div onClick={() => this.handleChange()}>
          {this.props.component}
        </div>
        {this.showContent()}
      </>
    )
  }
}
