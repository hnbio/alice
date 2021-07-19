import React from "react";
import { NavLink } from 'react-router-dom';

import "./index.scss";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/index">首页</NavLink>
          </li>
          <li>
            <NavLink to="/category">分类</NavLink>
          </li>
          <li>
            <NavLink to="/labels">标签</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
