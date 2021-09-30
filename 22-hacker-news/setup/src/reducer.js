import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return { ...state, isLoading: true };

    case SET_STORIES:
      return { ...state, isLoading: false, hits: payload.hits, nbPages: payload.nbPages }

    default:
      throw new Error(`no matching ${type} action type`)
  }


}
export default reducer
