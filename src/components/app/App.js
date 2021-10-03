import RandomChar from "../randomChar/randomChar";
import './app.css'
import { useState, useEffect } from "react";
import Character from "../character/character";
import Error from "../error/error";
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Weather from '../weather/weather';
import '../header/header.css'
import Houses from "../houses/houses";
import Books from "../book/book";
import CharDetails from "../charDetails/charDetails"
import NewFile from "../../newFolder/newFile";

export default function App() {
  const [random , setRandom] = useState(true);
  const [error, setError] =useState(false);
  
  const onHidden = () => {
    setRandom(!random)
  }
  // useEffect(()=>{
  //   return setError(!error)
  // },[])

    if (error) {
      return <Error />
    }
    const randomChar = random ? <RandomChar /> : null;
    let showHidden = ''
    const text = random ? showHidden = 'Hidden' : showHidden = 'Show';
    return (
      <>
        <Router>
          <div className="header">
            <div className="logo">
              <a href=""><img src="https://img.profi-news.ru/2015/07/16/52082.jpg" alt="img"></img></a>
              <h1>Game of Thrones DB</h1>
            </div>
            <ul className="ul">
              <li className="li"><NavLink to="/Character">Characters</NavLink></li>
              <li className="li"><NavLink to="/Houses">Houses</NavLink></li>
              <li className="li"><NavLink to="/Books">Books</NavLink></li>
              <li className="li"><NavLink to="/Weather">Weather</NavLink></li>
              <li className="li"><NavLink to="/CharDetails">CharDetails</NavLink></li>
              <li className="li"><NavLink to="/NewFile">NewFile</NavLink></li>
            </ul>
          </div>
          <button className="btn" onClick={onHidden}>{text}</button>
          {randomChar}
          <div className="wrapper">
            <Route exact path="/Character" render={() => <Character name="Character" />} />
            <Route exact path="/Houses" render={() => <Houses name="Hoses" />} />
            <Route exact path="/Books" render={() => <Books name="Books" />} />
            <Route exact path="/Weather" component={Weather} />
            <Route exact path="/CharDetails" component={CharDetails} />
            <Route exact path="/NewFile" component={NewFile} />
          </div>
        </Router>
      </>
    );
}


