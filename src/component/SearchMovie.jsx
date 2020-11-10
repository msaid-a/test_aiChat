import React, { Component } from 'react'
import { Row, Col, Table, Input, Button, Form, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import {getMovie, updateData, detailMovie} from '../action/movieAction'
import {connect} from 'react-redux'
import _ from 'lodash'

class SearchMovie extends Component {

    state ={ 
        valueSearch : '',
        data: []
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

    renderData = () => {
        const {data} = this.state
            return data.Search && data.Search.map(val => (
                <tr>
                    <td><span className="text-primary" style={{cursor: 'pointer'}}>{val.Title}</span></td>
                    <td>{val.Year}</td>
                    <td>{val.imdbID}</td>
                    <td><FontAwesomeIcon onClick={() => this.setFavorite(val.imdbID)} icon={faStar} style={val.is_favorite ?  {color: 'red', cursor: 'pointer'} : {cursor: 'pointer'}} /></td>
                </tr>
                ))
    }

    render() {

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
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        MovieData : state.movie.data
    }
}

export default connect(mapStateToProps, {getMovie, updateData})(SearchMovie)