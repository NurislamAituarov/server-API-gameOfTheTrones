// import React, { Component } from 'react'
// import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
// import CharDetails from '../charDetails/charDetails'
// import Weather from '../weather/weather';
// import './header.css'
// export default class Header extends Component {
//     render() {
//         return (
//             <Router>
//                 <div className="header">
//                     <div className="logo">
//                         <a href=""><img src="https://img.profi-news.ru/2015/07/16/52082.jpg" alt="img"></img></a>
//                         <h1>Game of Trones DB</h1>
//                     </div>
//                     <ul className="ul">
//                         <li className="li"><NavLink to="/">Characters</NavLink></li>
//                         <li className="li"><NavLink to="/CharDetails">Houses</NavLink></li>
//                         <li className="li"><NavLink to="/">Books</NavLink></li>
//                         <li className="li"><NavLink to="/Weather">Weather</NavLink></li>
//                     </ul>
//                 </div>
//                 <Route exact path="/CharDetails" component={CharDetails} />
//                 <Route exact path="/Weather" component={Weather} />
//             </Router>
//         )
//     }
// }