import React, { useState, useEffect } from 'react';
import "./BetGround.css";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BetGround() {
  const [loading, setLoading] = useState(true);
  const [bet, setBet] = useState(0);
  const user = useSelector(state => state.data.userList);
  const playerList = useSelector(state => state.data.players);
  const [players, setPlayers] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    let temp = Math.floor(Math.random() * (9 - 1 + 1) + 1);
    if (localStorage.getItem("players")) {
      setPlayers(JSON.parse(localStorage.getItem("players")));
    }
    if (playerList && playerList.length) {
      setPlayers([...playerList]);
    }
    setTimeout(() => {
      setBet(temp);
      setLoading(false);
    }, 2000);
  }, []);
  useEffect(() => {
    if (players.length > 0 && bet > 0) {
      let flag = false;
      let tempArr = [];
      tempArr = [...user]

      tempArr.forEach((val, index) => {
        let isPlayerWin = players.findIndex((val) => { return val.Bet === bet });
        let isPlayer = players.findIndex((player) => { return player.Name === val.Name });
        if (val.Bet == bet && isPlayerWin > -1 && players[isPlayerWin].Name === val.Name) {
          let newObj = { ...val };
          newObj.Price = tempArr[index]["Price"] * 2;
          newObj.Win = tempArr[index]["Win"] - '0' + 1;
          tempArr[index] = newObj;
        }
        else if (isPlayer > -1) {
          let newObj = { ...val };
          newObj.Loss = tempArr[index]["Loss"] - '0' + 1;
          tempArr[index] = newObj;
        }
      });
      players.forEach((val, index) => {
        if (val.Bet == bet) {
          flag = true;
          players[index].Price = players[index].Price * 2;
          players[index].Win = players[index].Win - '0' + 1;
        }
      });
      localStorage.setItem("players", JSON.stringify([...players]));

      if (flag) {
        dispatch({ type: "SET_USERS", payload: tempArr });
        localStorage.setItem("users", JSON.stringify(tempArr));
      }
    }
  }, [players, bet]);
  const handleBack = () => {
    console.log(JSON.parse(localStorage.getItem("users")));
  }
  return (
    <div className="betGround">
      <div className="firstFiveCards">
        {players && players.map((row, key) => {
          if (row.Selected && key < 5) {
            return (<Card status={bet === row.Bet ? "Winner" : "Lose"} player={row} />)
          }
        })}
      </div>
      <div className="betLoading">
        {loading ? (<div className="betLoading__image">
          <img src="https://www.animatedimages.org/data/media/710/animated-dice-image-0052.gif" border="0" alt="animated-dice-image-0052" />:
        </div>) :
          (<div className="betResult"><p>{bet}</p></div>)}
      </div>
      <div className="lastFourCards">
        {players && players.map((row, key) => {
          if (row.Selected && key > 4 && key < 9) {
            return (<Card status={bet === row.Bet ? "Winner" : "Lose"} player={row} />)
          }
        })}
      </div>
      <Link to="/" onClick={handleBack}>
        <div className="backButton"><button>BACK</button></div>
      </Link>
    </div>
  )
}

export default BetGround
