import { canUseDOM } from './safeHTMLElement'

let globalElement: any = null

export function assertNodeList (nodeList: any, selector: any) {
  if (!nodeList || !nodeList.length) {
    throw new Error(
      `react-modal: No elements were found for selector ${selector}.`
    )
  }
}

export function setElement (element: any) {
  let useElement = element
  if (typeof useElement === 'string' && canUseDOM) {
    const el = document.querySelectorAll(useElement)
    assertNodeList(el, useElement)
    useElement = 'length' in el ? el[0] : el
  }
  globalElement = useElement || globalElement
  return globalElement
}

export function validateElement (appElement: any) {
  if (!appElement && !globalElement) {
    console.log(
      [
        'react-modal: App element is not defined.',
        'Please use `Modal.setAppElement(el)` or set `appElement={el}`.',
        "This is needed so screen readers don't see main content",
        'when modal is opened. It is not recommended, but you can opt-out',
        'by setting `ariaHideApp={false}`.'
      ].join(' ')
    )

    return false
  }

  return true
}

export function hide (appElement: any) {
  if (validateElement(appElement)) {
    (appElement || globalElement).setAttribute('aria-hidden', 'true')
  }
}

export function show (appElement: any) {
  if (validateElement(appElement)) {
    (appElement || globalElement).removeAttribute('aria-hidden')
  }
}

export function documentNotReadyOrSSRTesting () {
  globalElement = null
}

export function resetForTesting () {
  globalElement = null
}
