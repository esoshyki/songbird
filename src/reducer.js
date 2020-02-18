const initialState = {
  score: 0,
  round: 0,
  user: '',
}

const actions = {
  changeScore: 'CHANGE_SCORE',
  nextRound: 'NEXT_ROUND',
  endGame: 'END_GAME',
  setName: 'SET_NAME'
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case (actions.changeScore):
      return {
        ...state,
        score: state.score + action.payload
      }
    case (actions.nextRound):
      return {
        ...state,
        round: state.round + 1
      }
    case (actions.endGame):
      return {
        ...initialState,
        user: state.user
      }
    case (actions.setName):
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
    }
  return state
}