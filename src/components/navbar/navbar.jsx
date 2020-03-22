import React from "react";
import classes from "./navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

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
        World Status
      </NavLink>
      <NavLink
        className={classes.navbar__item}
        exact
        to="/us-status"
        activeClassName="navbar__item--active"
        activeStyle={{
          backgroundColor: "var(--gray)",
          color: "white",
          fontWeight: "bold"
        }}
      >
        US Status
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
      <a
        className={classes.navbar__item}
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.cdc.gov/coronavirus/2019-ncov/index.html"
      >
        CDC Guidelines <FontAwesomeIcon icon={faExternalLinkAlt} />
      </a>
    </div>
  </div>
);

export default Navbar;
