import React from "react";
import classes from "./navbar.module.css";

const Navbar = props => (
  <div className={classes.navbar}>
    <div className={classes.navbar__header}>Where is COVID-19?</div>
    <div className={classes.navbar__container}>
      <p className={classes.navbar__item}>Status</p>
      <p className={classes.navbar__item}>Protection</p>
      <p className={classes.navbar__item}>Articles</p>
    </div>
  </div>
);

export default Navbar;
