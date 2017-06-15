export const MINUTE_PASSED = 'MINUTE_PASSED';
export const TICKER_INTERVAL_CREATED = 'TICKER_INTERVAL_CREATED';
export const TICKER_INTERVAL_REMOVED = 'TICKER_INTERVAL_REMOVED';

export function createTimer() {
  const now = new Date();
  return dispatch => {
    const interval = setInterval(() => {
      console.log("minute interval fired");
      dispatch({type: MINUTE_PASSED, payload: new Date()});
    }, 60000);
    dispatch({type: TICKER_INTERVAL_CREATED, payload: interval});
    dispatch({type: MINUTE_PASSED, payload: new Date()});
  }
}

export function removeTimer(interval) {
  return dispatch => {
    clearInterval(interval);
    console.log("interval cleared");
    dispatch({type: TICKER_INTERVAL_REMOVED, payload: interval});
  }
}
