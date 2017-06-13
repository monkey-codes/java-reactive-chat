export const CREATE_USER = 'CREATE_USER';

export function createUser(user) {
  return dispatch => {
    dispatch({type: CREATE_USER, payload: user});
  }
}
