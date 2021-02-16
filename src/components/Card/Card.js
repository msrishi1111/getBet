import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import "./Card.css";
function Card({ status, player }) {
  return (
    <div className={status === "Winner" ? "card card__winner" : "card"}>
      <div className="card__intro">
        <Avatar variant="rounded" src={player["Profile Image"]} />
        <div className="card__detail"><p className="card__name">{player.Name}</p><p className="card__level">Level 5</p></div>
      </div>
      <div className="card__row"><div className="card__price">
        <img src="https://image.flaticon.com/icons/png/128/1175/1175277.png" alt="image1" width="16px" height="16px" /><p>{player.Price}</p></div>
        <div className="card__bet"><img src="https://image.flaticon.com/icons/png/128/2927/2927808.png" alt="image1" width="16px" height="16px" /><p>{player.Bet}</p></div>
      </div>
      <div className="card__win"><img src="https://image.flaticon.com/icons/png/128/3112/3112946.png" alt="image1" width="16px" height="16px" /><p>{player.Win}</p></div>
      <div className="card__tag"><p>{status}</p></div>
    </div>
  )
}

export default Card
