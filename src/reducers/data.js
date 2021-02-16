export const data = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        userList: action.payload
      }
    case "SET_USERS":
      return {
        ...state,
        userList: [...action.payload]
      }
    case "SET_PLAYERS":
      return {
        ...state,
        players: [...action.payload]
      }
    default:
      return {
      }
  }
}