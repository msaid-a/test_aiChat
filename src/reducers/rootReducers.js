import { combineReducers } from 'redux'
import movieData from './movieReducers'
import asyncData from './asyncReducers'

export default combineReducers({
    movie: movieData,
    loading: asyncData
  });