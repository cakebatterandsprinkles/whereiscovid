import React, { PureComponent } from "react";
import classes from "./navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import BurgerMenu from "../burgerMenu/burgerMenu";

class Navbar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibilityClass: classes.invisible
    };
  }

  handleWindowResize() {
    window.addEventListener("resize", e => {
      console.log(e);
      if (e.srcElement.outerWidth < 600) {
        this.setState({ visibilityClass: classes.invisible });
      } else if (e.srcElement.outerWidth >= 600) {
        this.setState({ visibilityClass: classes.visible });
      }
    });
  }

  handleFirstNavbar() {
    if (window.outerWidth >= 600) {
      this.setState({ visibilityClass: classes.visible });
    } else {
      this.setState({ visibilityClass: classes.invisible });
    }
  }

  componentDidMount() {
    this.handleFirstNavbar();
    this.handleWindowResize();
  }

  render() {
    return (
      <div className={classes.navbar}>
        <div className={classes.navbar__header}>
          <Link to="/" className={classes.navbar__header__link}>
            Where is COVID-19?
          </Link>
        </div>
        <div className={classes.navbar__container}>
          {this.state.visibilityClass === classes.invisible ? (
            <BurgerMenu />
          ) : null}
          <NavLink
            className={`${classes.navbar__item} ${this.state.visibilityClass}`}
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
            className={`${classes.navbar__item} ${this.state.visibilityClass}`}
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
            className={`${classes.navbar__item} ${this.state.visibilityClass}`}
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
            className={`${classes.navbar__item} ${this.state.visibilityClass}`}
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.cdc.gov/coronavirus/2019-ncov/index.html"
          >
            CDC Guidelines <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>
        </div>
      </div>
    );
  }
}

export default Navbar;
