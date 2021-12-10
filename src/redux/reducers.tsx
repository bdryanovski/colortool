import { combineReducers } from 'redux'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'

const rootReducer = (history: History) => {
  return combineReducers({
    router: connectRouter(history)
  })
}

export default rootReducer
