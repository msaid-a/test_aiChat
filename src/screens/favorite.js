import React from 'react'
import Nav from '../component/Nav'
import FavoriteMovie from '../component/FavoriteMovie'
import {Container} from 'reactstrap'
import { useLocation } from 'react-router-dom';

const Favorite = ()=> {
    const location = useLocation()
    return (
        <div>
            <Container className="mt-5">
                <Nav path={location.pathname}/>
                <FavoriteMovie />
            </Container>
        </div>
    )
}
export default Favorite