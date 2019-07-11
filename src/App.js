import React, { createContext } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'


import firebase from './firebase'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/HomePage';
import Porady from './components/Tips/TipsPage';
import Przepisy from './components/Recipes/RecipesPage';
import Footer from './components/Footer/Footer'



const userContext = createContext(
  { user: null }
)

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/" component={Home} exact/>
        <Route path="/Porady" component={Porady} />
        <Route path="/Przepisy" component={Przepisy} />
        <Footer />
      </div>
    </Router>
  );
}


export default App;
