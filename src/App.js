import {Route, Switch} from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import CourseDetailApiView from './components/CourseDetailApiView'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CourseDetailApiView} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
