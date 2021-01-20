import React from "react";
import classes from "./footer.module.css";

const Footer = props => (
  <div className={classes.footer}>
    <p className={classes.footer__text}>
      Licensed under MIT. Contribute to the project at{" "}
      <span>
        <a
          className={classes.footer__link}
          href="https://github.com/cakebatterandsprinkles/whereiscovid"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>
      </span>
      .
    </p>
  </div>
);

export default Footer;
