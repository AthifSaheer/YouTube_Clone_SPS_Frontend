import React from "react";

import classes from './SidebarRow.module.css';

const SidebarRow = (props) => {
  return (
    <li className={`${classes.sidebar__row} ${props.selected && classes.selected}`}>
      <span className={`material-icons `} >{props.icon}</span>
      <h2>{props.title}</h2>
    </li>
  );
};
export default SidebarRow;
