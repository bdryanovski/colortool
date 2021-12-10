// @ts-nocheck
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ModalPortal from './ModalPortal'
import * as ariaAppHider from '../helpers/ariaAppHider'
import SafeHTMLElement, { canUseDOM } from '../helpers/safeHTMLElement'

export const portalClassName = 'ReactModalPortal'
export const bodyOpenClassName = 'ReactModal__Body--open'

const isReact16 = ReactDOM.createPortal !== undefined

const getCreatePortal = () =>
  isReact16
    ? ReactDOM.createPortal
    : ReactDOM.unstable_renderSubtreeIntoContainer

function getParentElement (parentSelector: any) {
  return parentSelector()
}

class Modal extends Component<any> {
  static setAppElement (element: any) {
    ariaAppHider.setElement(element)
  }

  static defaultProps = {
    isOpen: false,
    portalClassName,
    bodyOpenClassName,
    role: 'dialog',
    ariaHideApp: true,
    closeTimeoutMS: 0,
    shouldFocusAfterRender: true,
    shouldCloseOnEsc: true,
    shouldCloseOnOverlayClick: true,
    shouldReturnFocusAfterClose: true,
    parentSelector: () => document.body
  };

  static defaultStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      zIndex: 1000
    },
    content: {
      position: 'absolute',
      top: '40px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px'
    }
  };

  node: any;
  portal: any;

  componentDidMount () {
    if (!canUseDOM) return

    if (!isReact16) {
      this.node = document.createElement('div')
    }
    this.node.className = this.props.portalClassName

    const parent = getParentElement(this.props.parentSelector)
    parent.appendChild(this.node)

    !isReact16 && this.renderPortal(this.props)
  }

  getSnapshotBeforeUpdate (prevProps: any) {
    const prevParent = getParentElement(prevProps.parentSelector)
    const nextParent = getParentElement(this.props.parentSelector)
    return { prevParent, nextParent }
  }

  componentDidUpdate (prevProps: any, _: any, snapshot: any) {
    if (!canUseDOM) return
    const { isOpen, portalClassName } = this.props

    if (prevProps.portalClassName !== portalClassName) {
      this.node.className = portalClassName
    }

    const { prevParent, nextParent } = snapshot
    if (nextParent !== prevParent) {
      prevParent.removeChild(this.node)
      nextParent.appendChild(this.node)
    }

    // Stop unnecessary renders if modal is remaining closed
    if (!prevProps.isOpen && !isOpen) return

    !isReact16 && this.renderPortal(this.props)
  }

  componentWillUnmount () {
    if (!canUseDOM || !this.node || !this.portal) return

    const state = this.portal.state
    const now = Date.now()
    const closesAt =
      state.isOpen &&
      this.props.closeTimeoutMS &&
      (state.closesAt || now + this.props.closeTimeoutMS)

    if (closesAt) {
      if (!state.beforeClose) {
        this.portal.closeWithTimeout()
      }

      setTimeout(this.removePortal, closesAt - now)
    } else {
      this.removePortal()
    }
  }

  removePortal = () => {
    !isReact16 && ReactDOM.unmountComponentAtNode(this.node)
    const parent = getParentElement(this.props.parentSelector)
    if (parent) {
      parent.removeChild(this.node)
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        'React-Modal: "parentSelector" prop did not returned any DOM ' +
        'element. Make sure that the parent element is unmounted to ' +
        'avoid any memory leaks.'
      )
    }
  };

  portalRef = (ref: any) => {
    this.portal = ref
  };

  renderPortal = (props: any) => {
    const createPortal = getCreatePortal()
    const portal = createPortal(
      this,
      <ModalPortal defaultStyles={Modal.defaultStyles} {...props} />,
      this.node
    )
    this.portalRef(portal)
  };

  render () {
    if (!canUseDOM || !isReact16) {
      return null
    }

    if (!this.node && isReact16) {
      this.node = document.createElement('div')
    }

    const createPortal = getCreatePortal()
    return createPortal(
      <ModalPortal
        ref={this.portalRef}
        defaultStyles={Modal.defaultStyles}
        {...this.props}
      />,
      this.node
    )
  }
}

export default Modal
