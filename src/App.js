import logo from './logo.svg';
import './App.css';
import Searchbar from './Components/Searchbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Recipe from './Components/Recipe';

function App() {
  return (
    <>
      <Router>
        <Switch>
          {/* <Searchbar /> */}
          <Route exact path="/" component={Searchbar}/>
          <Route exact path="/recipe/:id" component={Recipe}/>
        </Switch>
      </Router>
    </>

  );
}

export default App;
