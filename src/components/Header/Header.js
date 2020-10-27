import React,{useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import styles from "./Header.module.scss";
import { useFormik } from "formik";
import logo from "../../assets/logo.png";

const Header = (e) => {

  const {users} = useSelector(state => ({
    users: state.users
  }))

  const dispatch = useDispatch();
  const [nicks, setNicks] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState("");
  const [id, setId] = useState("");

  const change = (e) => {
    let arr = [];
    if(e.target.value === "") {
      arr = [];
    } else {
      for (const user of users) {
        if(user.login.startsWith(e.target.value)) {
          !arr.includes(user.login) && arr.push({login :user.login, userId: user._id})
        }
      }
    }
    setNicks(arr)
  }

  const chooseNick = e => {
    const input = document.querySelector('input');
    setUserId(e.target.dataset.id);
    setNicks([])
    input.value = "";
  }

  const submit = e => {
    e.preventDefault();
    let input = e.target.querySelector('input');
    let id;
    for(const user of users) {
      if(user.login === input.value) {
        setId(user._id);
        setRedirect(true)
      }
    }
    input.value = "";
  }

  return (
    <>
    <ReactTooltip />
    {redirect && <Redirect exact to={`/profile/${id}`} />}
      <header className={styles.header}>
        <form onSubmit={submit}>
          <input
            data-tip="search your friend"
            onKeyUp={change}
            type="search"
            name="text"
            id="text"
            placeholder="Write here"
            autoComplete="off"
          />
          <input type="submit" value="Search" />
        <ul>
            {nicks.map(({login, userId}) => <li key={userId}><Link onClick={chooseNick} to={`/profile/${userId}`} data-id={userId}>{login}</Link></li>)}
        </ul>
        </form>
        <img src={logo} alt="" />
      </header>
    </>
  );
};

export default Header;
