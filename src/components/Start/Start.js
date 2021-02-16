import React, { useState, useEffect } from 'react';
import "./Start.css";
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Sidebar from "../sidebar/Sidebar";
import Pagination from '@material-ui/lab/Pagination';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from "react-redux";
function Start() {
  const user = useSelector(state => state.data.userList);
  const [count, setCount] = useState();
  const dispatch = useDispatch();
  const [viewUsers, setViewUsers] = useState([]);
  const [flagCount, setFlagCount] = useState(1);
  useEffect(() => {
    if (user && user % 7 === 0)
      setCount(parseInt(user.length / 7));
    else if (user)
      setCount(parseInt(user.length / 7) + 1);
    if (user && flagCount === 1) {
      let temp = user.slice(0, 7);
      setViewUsers(temp);
      setFlagCount(2);
    }
  }, [user,flagCount]);

  const changePage = (e, pageNo) => {
    let temp = user.slice(7 * (pageNo - 1), 7 * pageNo);
    setViewUsers(temp);
  }
  const selectPlayer = (e) => {
    let index = user.findIndex((val) => {
      return (val.Name === e.target.id);
    })
    user[index].Selected = e.target.checked;
    dispatch({ type: "SET_USERS", payload: user })
  }
  const searchPlayers = (e) => {
    const filtered = user.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(e.target.value)));
    setViewUsers(filtered);
    console.log(filtered);
  }

  return (
    <div className="start">
      <Sidebar />
      <div className="select">
        <div className="select__header">
          <h1>Select Playing 9</h1>
          <TextField id="standard-search" label="Search Player" type="search" onChange={searchPlayers} />
        </div>
        <div className="table">
          <table className="select__tableHead">
            <thead className="select__table__header">
              <tr>
                <th className="head__select">
                  <p>SELECT</p>
                </th>
                <th className="head__playerName">
                  <p>PLAYER NAME</p>
                </th>
                <th className="head__image">
                  <p>AVATAR</p>
                </th>
                <th>
                  <div className="head__bet"><img src="https://image.flaticon.com/icons/png/128/2927/2927808.png" alt="image1" width="16px" height="16px" /><p>BET</p></div>
                </th>
                <th>
                  <div className="head__wins"><img src="https://image.flaticon.com/icons/png/128/3112/3112946.png" alt="image1" width="16px" /><p>WINS</p></div>
                </th>
                <th className="head__lost">
                  <p>LOST</p>
                </th>
                <th>
                  <div className="head__price"><img src="https://image.flaticon.com/icons/png/128/1175/1175277.png" alt="image1" width="16px" height="16px" /><p>PRICE</p></div>
                </th>
              </tr>
            </thead>
          </table>
          <table className="select__tableBody">
            <tbody className="table__body">
              {viewUsers && viewUsers.map((row, key) => (
                <tr className="table__row" key={row.Name}>
                  <td>
                    <Checkbox
                      color="primary"
                      onChange={selectPlayer}
                      checked={row.Selected}
                      id={row.Name}
                    />
                  </td>
                  <td>
                    {row.Name}
                  </td>
                  <td >
                    <div className="table__rowImage"><Avatar variant="rounded" src={row["Profile Image"]} /></div>
                  </td>
                  <td>
                    {row.Bet}
                  </td>
                  <td>
                    {row.Win}
                  </td>
                  <td>
                    {row.Loss}
                  </td>
                  <td>
                    {row.Price}
                  </td>
                </tr>
              ))
              }
            </tbody>
          </table>
          <div className="pagination">
            <Pagination count={count} onChange={changePage} shape="rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Start
