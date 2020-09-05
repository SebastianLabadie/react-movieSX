import React from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';
import Home from './components/Home'
import MovieDetail from './components/MovieDetail'

function App() {
  
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/movie/:id" component={MovieDetail} />
      </Switch>
    </main>
  );
}

export default App;
