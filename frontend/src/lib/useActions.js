import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { useMemo } from 'react'


// ----------------------------------------------------------------------------
// 출처 링크 : https://react-redux.js.org/api/hooks#recipe-useactions
// ----------------------------------------------------------------------------
export default function useActions(actions, deps) {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map(a => bindActionCreators(a, dispatch));
      }
      return bindActionCreators(actions, dispatch);
    },
    deps ? [dispatch, ...deps] : [dispatch]
  )
}