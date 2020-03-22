import React from "react";
import classes from "./navbar.module.css";
import { Link, NavLink } from "react-router-dom";

const Navbar = props => (
  <div className={classes.navbar}>
    <div className={classes.navbar__header}>
      <Link to="/" className={classes.navbar__header__link}>
        Where is COVID-19?
      </Link>
    </div>
    <div className={classes.navbar__container}>
      <NavLink
        className={classes.navbar__item}
        exact
        to="/"
        activeClassName="navbar__item--active"
        activeStyle={{
          backgroundColor: "var(--gray)",
          color: "white",
          fontWeight: "bold"
        }}
      >
        Status
      </NavLink>
      <NavLink
        className={classes.navbar__item}
        to="/protection"
        activeClassName="navbar__item--active"
        activeStyle={{
          backgroundColor: "var(--gray)",
          color: "white",
          fontWeight: "bold"
        }}
      >
        Protection
      </NavLink>
      <NavLink
        className={classes.navbar__item}
        to="/articles"
        activeClassName="navbar__item--active"
        activeStyle={{
          backgroundColor: "var(--gray)",
          color: "white",
          fontWeight: "bold"
        }}
      >
        Articles
      </NavLink>
    </div>
  </div>
);

export default Navbar;
