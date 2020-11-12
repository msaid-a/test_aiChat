import React, { useState }  from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, } from 'reactstrap';
import SearchMovie from './SearchMovie'
import classnames from 'classnames';
import FavoriteMovie from './FavoriteMovie'
import {Link} from 'react-router-dom'

const Data = ({path})=> {

    return (
        <div className="mt-5 mx-auto">
            <Nav tabs>
             <NavItem>
             <Link to="/">
                <NavLink active={path === "/" ? true : false} >
                 Search Movie
             </NavLink>
            </Link>
            </NavItem>
            <NavItem>
                
            <Link to="/favorite">
                <NavLink active={path === "/favorite" ? true : false} >
                  Favorite Movie
                </NavLink>
                </Link>
            </NavItem>
         </Nav>
        

        </div>
    )
}
export default Data