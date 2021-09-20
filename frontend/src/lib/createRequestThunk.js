import { finishLoading, startLoading } from '../redux/loading';


export default function createRequestThunk(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return params => async dispatch => {
    dispatch({type});
    dispatch(startLoading(type));

    try {
      const response = await request(params);
      dispatch({
        type: SUCCESS,
        payload: response.data,
        error: false,
      });
      dispatch(finishLoading(type));
    } catch (error) {
      dispatch({
        type: FAILURE,
        payload: error,
        error: true,
      });
      dispatch(finishLoading(type));
    }
  };
}