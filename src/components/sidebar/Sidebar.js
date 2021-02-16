import React from 'react';
import "./Sidebar.css";
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Sidebar() {
  const user = useSelector(state => state.data.userList);
  const dispatch = useDispatch();
  const start = (e) => {
    let temp = [];
    user.forEach(element => {
      if (element.Selected)
        temp.push({ ...element });
    });
    if (temp.length === 0)
      e.preventDefault();
    dispatch({ type: "SET_PLAYERS", payload: temp });
  }
  return (
    <div className="sidebar">
      <div className="sidebar_logo"><img src="http://www.pngplay.com/wp-content/uploads/1/Dice-PNG-Transparent-Background.png" alt="logo" /></div>
      <h1 className="sidebar__heading">Playing 9</h1>
      <div className="sidebar__players">
        {user && user.map((row) => {
          if (row.Selected) {
            return (<div className="sidebar__player">
              <div className="player__image"><Avatar variant="rounded" src={row["Profile Image"]} /></div>
              <div className="player__details">
                <p>{row.Name}</p>
                <div className="player__winLoss">
                  <div className="player__win"><img src="https://image.flaticon.com/icons/png/128/3112/3112946.png" alt="image1" width="16px" height="16px" /><p>{row.Win}</p></div>
                  <div className="player__bet"><img src="https://image.flaticon.com/icons/png/128/2927/2927808.png" alt="image1" width="16px" height="16px" /><p>{row.Bet}</p></div>
                </div>
              </div>
              <div className="player__price">
                <img src="https://image.flaticon.com/icons/png/128/1175/1175277.png" alt="image1" width="16px" height="16px" /><p>{row.Price}</p>
              </div>
            </div>)
          }
          else {
            return (<div></div>);
          }
        })}
      </div>
      <Link to="/betGround" onClick={start}>
        <div className="start_button"><button>START</button></div>
      </Link>
    </div>
  )
}

export default Sidebar
