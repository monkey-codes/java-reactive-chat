export const MINUTE_PASSED = 'MINUTE_PASSED';

export function createTimer() {
  const now = new Date();
  return dispatch => {
    setTimeout(() => {
      console.log("on the minute timeout fired");
      const interval = setInterval(() => {
        console.log("minute interval fired");
        dispatch({type: MINUTE_PASSED, payload: new Date()});
      }, 60000)

    }, (60 - now.getSeconds()) * 1000);
  }
}
