import React, { Component } from 'react'
import { Row, Col, Table, Input, Button, Form, Container, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import {getMovie, updateData} from '../action/movieAction'
import {connect} from 'react-redux'
import Nav from './Nav'
import _ from 'lodash'

class FavoriteMovie extends Component {

    state ={ 
        valueSearch : '',
        data: []
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

    renderData = () => {
        const {data} = this.state
            return this.props.MovieData.Search && this.props.MovieData.Search.map(val => {
                if(val.is_favorite) {
                    return <tr>
                        <td>{val.Title}</td>
                        <td>{val.Year}</td>
                        <td>{val.imdbID}</td>
                        <td><FontAwesomeIcon onClick={() => this.setFavorite(val.imdbID)} icon={faStar} style={val.is_favorite ?  {color: 'red', cursor: 'pointer'} : {cursor: 'pointer'}} /></td>
                    </tr>
                }
            })
    }

    render() {

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
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        MovieData : state.movie.data
    }
}

export default connect(mapStateToProps, {getMovie, updateData})(FavoriteMovie)