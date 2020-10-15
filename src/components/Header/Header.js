import React,{useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {fetchUserProfile} from 'actions'
import "./Header.module.scss";
import { useFormik } from "formik";
import logo from "../../assets/logo.png";

const Header = () => {

  const {users} = useSelector(state => ({
    users: state.users
  }))

  const dispatch = useDispatch();
  const [nicks, setNicks] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState("");

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
    setRedirect(true);
    setNicks([])
    input.value = "";
  }

  if(redirect) {
    return <Redirect to={`/profile/${userId}`} />
  }

  return (
    <header>
      <form>
        <input
          onKeyUp={change}
          type="search"
          name="text"
          id="text"
          placeholder="Write here"
        />
        <input type="submit" value="Search" />
      <ul>
          {nicks.map(({login, userId}) => <li onClick={chooseNick} key={userId} data-id={userId}>{login}</li>)}
      </ul>
      </form>
      <img src={logo} alt="" />
    </header>
  );
};

export default Header;
