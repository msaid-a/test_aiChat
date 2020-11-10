import {connect} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './screens/home'
import Favorite from './screens/favorite'

// import './static/styles/css/style.css'

function App(props) {
  return (
    <BrowserRouter>
    <div >
            <Switch>
              <Route path='/'  component={Home} exact/>
              <Route path='/favorite'  component={Favorite} />

            </Switch>
    </div>
    </BrowserRouter>
  );
}



export default  connect()(App);