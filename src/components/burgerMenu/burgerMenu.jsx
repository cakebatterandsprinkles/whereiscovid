import React, { PureComponent, Fragment } from "react";
import classes from "./burgerMenu.module.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";

class BurgerMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOnClick() {
    this.setState({
      isOpen: true
    });
  }

  handleClose() {
    this.setState({
      isOpen: false
    });
  }

  render() {
    return (
      <div>
        {!this.state.isOpen ? (
          <FontAwesomeIcon
            icon={faBars}
            className={classes.menu__icon}
            onClick={this.handleOnClick}
          />
        ) : (
          <Fragment>
            <div className={classes.backdrop} onClick={this.handleClose}></div>
            <div className={classes.navbar__side__container}>
              <div className={classes.navbar__side__x}>
                <FontAwesomeIcon
                  icon={faTimes}
                  className={classes.menu__icon}
                  onClick={this.handleClose}
                />
              </div>
              <div className={classes.navbar__container}>
                <NavLink
                  className={`${classes.navbar__item} ${this.state.visibilityClass}`}
                  exact
                  to="/world-status"
                  activeClassName="navbar__item--active"
                  activeStyle={{
                    backgroundColor: "var(--gray)",
                    color: "white",
                    fontWeight: "bold"
                  }}
                  onClick={this.handleClose}
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
                  onClick={this.handleClose}
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
                  onClick={this.handleClose}
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
          </Fragment>
        )}
      </div>
    );
  }
}

export default BurgerMenu;
