import React from 'react'
import Nav from '../component/Nav'
import SearchMovie from '../component/SearchMovie'
import {Container} from 'reactstrap'
import { useLocation } from 'react-router-dom';
const Home = (props)=> {
    const location = useLocation()
    return (
        <div>
            <Container className="mt-5">
                <Nav path={location.pathname} />
                <SearchMovie />
            </Container>
        </div>
    )
}
export default Home