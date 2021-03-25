import React from "react";
import HorizontalLine from "../horizontalLine/horizontalLine";
import classes from "./article.module.css";

function Article(props) {
  return (
    <div className={classes.card}>
      <p className={classes.card__journal}>
        {props.article.fulljournalname},{" "}
        <span className={classes.card__pubdate}>{props.article.pubdate}</span>
      </p>
      <a
        alt="article link"
        className={classes.card__link}
        href={`https://www.ncbi.nlm.nih.gov/pubmed/${props.article.uid}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        {" "}
        <p className={classes.card__header}>{props.article.title}</p>
      </a>

      <HorizontalLine color="#202020" />
      <p className={classes.card__authors}>
        {props.article.authors.map((author) => author.name).join(", ")}
      </p>
    </div>
  );
}

export default Article;
