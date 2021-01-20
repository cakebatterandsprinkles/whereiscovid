import {
  faBars,

  faExternalLinkAlt, faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, PureComponent } from "react";
import { NavLink } from "react-router-dom";
import classes from "./burgerMenu.module.css";

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
            className={classes.menu__icon}
            icon={faBars}
            onClick={this.handleOnClick}
          />
        ) : (
          <Fragment>
            <div className={classes.backdrop} onClick={this.handleClose}></div>
            <div className={classes.navbar__side__container}>
              <div className={classes.navbar__side__x}>
                <FontAwesomeIcon
                  className={classes.menu__icon}
                  icon={faTimes}
                  onClick={this.handleClose}
                />
              </div>
              <div className={classes.navbar__container}>
                <NavLink
                  activeClassName="navbar__item--active"
                  activeStyle={{
                    backgroundColor: "var(--gray)",
                    color: "white",
                    fontWeight: "bold"
                  }}
                  className={`${classes.navbar__item} ${this.state.visibilityClass}`}
                  exact
                  onClick={this.handleClose}
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
                  onClick={this.handleClose}
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
                  onClick={this.handleClose}
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
          </Fragment>
        )}
      </div>
    );
  }
}

export default BurgerMenu;
