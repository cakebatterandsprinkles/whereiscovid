import React from "react";
import classes from "./footer.module.css";

const Footer = props => (
  <div className={classes.footer}>
    <p className={classes.footer__text}>
      Licensed under MIT. Contribute to the project at{" "}
      <span>
        <a
          href="https://github.com/cakebatterandsprinkles/whereiscovid"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.footer__link}
        >
          GitHub
        </a>
      </span>
      .
    </p>
  </div>
);

export default Footer;
