import React,{useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {fetchUserProfile} from 'actions'
import "./Header.module.scss";
import { useFormik } from "formik";
import logo from "../../assets/logo.png";

const Header = () => {

  const {posts} = useSelector(state => ({
    posts: state.posts
  }))

  const dispatch = useDispatch();
  const [nicks, setNicks] = useState([]);

  const change = (e) => {
    let arr = [];
    if(e.target.value === "") {
      arr = [];
    } else {
      for (const post of posts) {
        if(post.login.startsWith(e.target.value)) {
          !arr.includes(post.login) && arr.push(post.login)
        }
      }
    }
    setNicks(arr)
  }

  const chooseNick = e => {
    const input = document.querySelector('input');
    input.value = "";
    setNicks([])
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
          {nicks.map(nick => <li onClick={chooseNick} key={nick}>{nick}</li>)}
      </ul>
      </form>
      <img src={logo} alt="" />
    </header>
  );
};

export default Header;
