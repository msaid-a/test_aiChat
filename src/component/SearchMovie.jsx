import React, { Component } from 'react'
import { Row, Col, Table, Input, Button, Form, Spinner, Modal} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import {getMovie, updateData, detailMovie} from '../action/movieAction'
import {connect} from 'react-redux'
import _ from 'lodash'

class SearchMovie extends Component {

    state ={ 
        valueSearch : '',
        data: [],
        modal: false
    }

    

     handleValueSearch = (e) => {
        const value = e.target.value
        this.setState({valueSearch: value})
    }

     handleSearch = async (e) => {
         e.preventDefault()
        const {valueSearch} = this.state
        await this.props.getMovie(valueSearch)
        this.setState({
            data: this.props.MovieData
        })
    }

     setFavorite = async (id) => {
        const {MovieData, updateData} = this.props
        const {data} = this.state
        const index = _.findIndex(MovieData.Search, (o) => o.imdbID === id)
            if (data.Search[index].is_favorite === 1) {
                data.Search[index].is_favorite = 0
            } else {
                data.Search[index].is_favorite = 1
            }
        this.setState({
            data: data
        })
        updateData(data)
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
        const {loading} = this.props
        if(loading) {
            return (<div>
                    <Spinner type="grow" color="primary" />
                    <Spinner type="grow" color="secondary" />
                    <Spinner type="grow" color="success" />
                    <Spinner type="grow" color="danger" />
                    <Spinner type="grow" color="warning" />
            </div>)
        }
            return data.Search && data.Search.map(val => (
                <tr>
                    <td><span className="text-primary" style={{cursor: 'pointer'}} onClick={()=> this.setModal(val.imdbID)}>{val.Title}</span></td>
                    <td>{val.Year}</td>
                    <td>{val.imdbID}</td>
                    <td><FontAwesomeIcon onClick={() => this.setFavorite(val.imdbID)} icon={faStar} style={val.is_favorite ?  {color: 'red', cursor: 'pointer'} : {cursor: 'pointer'}} /></td>
                </tr>
                ))
    }

    render() {
        const {loading, MovieDetail, loadingModal} = this.props
        return (
            <Row>
                <Col sm="12" className="mt-5">
                <Row>
                    <Form onSubmit={this.handleSearch} inline className="w-100">
                        <Input placeholder="Search" className="mr-4 w-75 ml-3" onChange={this.handleValueSearch} />
                        <Button onClick={this.handleSearch}>Submit</Button>
                    </Form>
                </Row>
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
            </Row>
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

export default connect(mapStateToProps, {getMovie, updateData, detailMovie})(SearchMovie)