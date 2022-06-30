import './App.css';
import {Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import {Header} from './components/Header';
import Home from './components/Home';
import CreateGame from './components/CreateGame';
import {GameDescription} from './components/GameDescription';
function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      <div>
        <Route exact path='/'>
          <LandingPage></LandingPage>
        </Route>
        <Route path='/home'>
          <Header></Header>
          <Home></Home>
        </Route>
        <Route exact path='/createVideogame'>
          <CreateGame></CreateGame>
        </Route>
        <Route path='/games/:id'>
          <GameDescription></GameDescription>
        </Route>
      </div>
    </div>
  );
}

export default App;
