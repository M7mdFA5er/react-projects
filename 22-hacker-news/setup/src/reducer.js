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

    case REMOVE_STORY: {
      const newHits = state.hits.filter((story) => story.objectID !== payload.id);
      console.log('newhits :>> ', newHits);
      return { ...state, hits: newHits }
    }

    default:
      throw new Error(`no matching ${type} action type`)
  }


}
export default reducer
