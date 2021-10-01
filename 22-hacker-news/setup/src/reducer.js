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
      return { ...state, hits: newHits }
    }

    case HANDLE_SEARCH: {
      return { ...state, query: payload.query, page: 0 }
    }

    case HANDLE_PAGE: {
      let newPage = 0;
      if (payload.value === 'inc') {
        newPage = state.page + 1;
        if (newPage > state.nbPages - 1) newPage = 0;
      } else {
        newPage = state.page - 1;
        if (newPage < 0) newPage = 0;
      }
      return { ...state, page: newPage }
    }

    default:
      throw new Error(`no matching ${type} action type`)
  }


}
export default reducer
