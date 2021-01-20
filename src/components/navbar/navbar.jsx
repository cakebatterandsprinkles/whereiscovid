import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { PureComponent } from "react";
import { Link, NavLink } from "react-router-dom";
import BurgerMenu from "../burgerMenu/burgerMenu";
import classes from "./navbar.module.css";

class Navbar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibilityClass: classes.invisible
    };
  }

  handleWindowResize() {
    window.addEventListener("resize", e => {
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
          <Link className={classes.navbar__header__link} to="/">
            Where is COVID-19?
          </Link>
        </div>
        <div className={classes.navbar__container}>
          {this.state.visibilityClass === classes.invisible ? (
            <BurgerMenu />
          ) : null}
          <NavLink
            activeClassName="navbar__item--active"
            activeStyle={{
              backgroundColor: "var(--gray)",
              color: "white",
              fontWeight: "bold"
            }}
            className={`${classes.navbar__item} ${this.state.visibilityClass}`}
            exact
            to="/world-status"
          >
            World Status
          </NavLink>
          <NavLink
            activeClassName="navbar__item--active"
            activeStyle={{
              backgroundColor: "var(--gray)",
              color: "white",
              fontWeight: "bold"
            }}
            className={`${classes.navbar__item} ${this.state.visibilityClass}`}
            exact
            to="/us-status"
          >
            US Status
          </NavLink>
          <NavLink
            activeClassName="navbar__item--active"
            activeStyle={{
              backgroundColor: "var(--gray)",
              color: "white",
              fontWeight: "bold"
            }}
            className={`${classes.navbar__item} ${this.state.visibilityClass}`}
            to="/articles"
          >
            Articles
          </NavLink>
          <a
            className={`${classes.navbar__item} ${this.state.visibilityClass}`}
            href="https://www.cdc.gov/coronavirus/2019-ncov/index.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            CDC Guidelines <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>
        </div>
      </div>
    );
  }
}

export default Navbar;
