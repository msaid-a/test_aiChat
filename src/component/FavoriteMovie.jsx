import React, { Component } from 'react'
import { Row, Col, Table, Container,Modal, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import {getMovie, updateData, detailMovie} from '../action/movieAction'
import {connect} from 'react-redux'
import Nav from './Nav'
import _ from 'lodash'

class FavoriteMovie extends Component {

    state ={ 
        valueSearch : '',
        data: [],
        modal: false
    }

    componentWillReceiveProps= () => {
        if(this.props.MovieData.Search) {
            this.setState({
                data: this.props.MovieData
            })
        }
    }
     handleValueSearch = (e) => {
        const value = e.target.value
        this.setState({valueSearch: value})
    }

     handleSearch = (e) => {
         const {valueSearch} = this.state
        e.preventDefault()
        this.props.getMovie(valueSearch)
    }

     setFavorite = async (id) => {
        const {MovieData, updateData} = this.props
        const index = _.findIndex(MovieData.Search, (o) => o.imdbID === id)
            if (MovieData.Search[index].is_favorite === 1) {
                MovieData.Search[index].is_favorite = 0
            } else {
                MovieData.Search[index].is_favorite = 1
            }

            await this.setState({
                data: MovieData
            })
        updateData(MovieData)
    }

    setModal = (id) => {
        this.setState({
            modal: true
        })
        this.props.detailMovie(id)

    }

    closeModal = () => {
        this.setState({modal: false})
    }


    renderData = () => {
        const {data} = this.state
            return this.props.MovieData.Search && this.props.MovieData.Search.map(val => {
                if(val.is_favorite) {
                    return <tr>
                        <td><span className="text-primary" style={{cursor: 'pointer'}} onClick={()=> this.setModal(val.imdbID)}>{val.Title}</span></td>
                        <td>{val.Year}</td>
                        <td>{val.imdbID}</td>
                        <td><FontAwesomeIcon onClick={() => this.setFavorite(val.imdbID)} icon={faStar} style={val.is_favorite ?  {color: 'red', cursor: 'pointer'} : {cursor: 'pointer'}} /></td>
                    </tr>
                }
            })
    }

    render() {
        const {loadingModal, MovieDetail} = this.props
        return (
            <Container>
                <Row >
                    <Col sm="12" className="mt-2">
                    <Table responsive className="mt-5">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Year</th>
                                <th>imDB ID</th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.renderData()}
                        </tbody>
                    </Table>

                    </Col>
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.closeModal} external={true} >
                    {loadingModal ? 
                    <div className="p-4">
                    <Spinner type="grow" color="primary" />
                    <Spinner type="grow" color="secondary" />
                    <Spinner type="grow" color="success" />
                    <Spinner type="grow" color="danger" />
                    <Spinner type="grow" color="warning" />
            </div> :
                <div className="p-4">
                    <img src={MovieDetail.Poster} alt="" className="ml-5"/>
                    <h5 className="mt-5">{MovieDetail.Title}</h5>
                    <p>Year : {MovieDetail.Year}</p>
                    <p>Released : {MovieDetail.Released}</p>
                    <p>Director : {MovieDetail.Director}</p>
                    <p>Actors: {MovieDetail.Actors}</p>
                    <p>Plot : {MovieDetail.Plot}</p>
                    <p>Award : {MovieDetail.Awards}</p>

                </div>}

                </Modal>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        MovieData : state.movie.data,
        MovieDetail : state.movie.detail,
        loading: state.loading.loading,
        loadingModal : state.loading.loadingModal,
    }
}

export default connect(mapStateToProps, {getMovie, updateData, detailMovie})(FavoriteMovie)