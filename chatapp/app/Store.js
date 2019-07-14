import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

const initialState = {
    todo: ['masuk']
}

reducer = (state, action) => {
    if (action.type === 'INPUT') {
        state = { 
            ...state,
            todo: [...state.todo, action.payload]}
    } else if (action.type === 'DEL') {
        state = {
            ...state,
            todo: [...state.todo.slice(0, action.payload)]
        }
    } else if (action.type === 'EDIT') {
        state = {
            ...state,
            todo: [...state.todo.slice(0, action.payload[0]), action.payload[2], 
            ...state.todo.slice(action.payload[0] + 1)
          ]
        }
    }
    return state
}


const incrementNumber = () => {
    return { type: 'INPUT' }
}

const middleware = applyMiddleware(logger)

const store = createStore(reducer, initialState, middleware)

export {
    store,
    incrementNumber
}