import axios from 'axios'
import {GET_MOVIE, GET_MOVIE_DETAIL, SET_LOADING, SET_LOADING_MODAL} from './type'

export const setLoading = (bool) => dispatch =>{
    dispatch({
        type: SET_LOADING,
        payload: bool
    })
}

export const setLoadingModal = (bool) => dispatch =>{
    dispatch({
        type: SET_LOADING_MODAL,
        payload: bool
    })
}


export const getMovie =  (name) => async dispatch => {
    try {
        dispatch(setLoading(true))
        const res = await axios.get(`http://www.omdbapi.com/?s=${name}&apikey=c4564e0b`)
        if(res.data) {
            dispatch({
                type: GET_MOVIE,
                payload: res.data
            })
        }
        dispatch(setLoading(false))
    } catch (error) {
        dispatch(setLoading(false))
    }
}

export const updateData = (data) => async dispatch => {
    try {
        dispatch({
            type: GET_MOVIE,
            payload: data
        })
    } catch (error) {
        
    }
}

export const detailMovie = (id) => async dispatch => {
    try {
        dispatch(setLoadingModal(true))
        const res = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=c4564e0b`)
        if(res.data) {
            dispatch({
                type: GET_MOVIE_DETAIL,
                payload: res.data
            })
        }
        dispatch(setLoadingModal(false))
    } catch (error) {
        dispatch(setLoadingModal(false))
    }
}