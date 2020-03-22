import React, { PureComponent } from "react";
import classes from "./articles.module.css";
import Article from "./article/article";

class Articles extends PureComponent {
  constructor() {
    super();
    this.state = {
      articleSummaries: []
    };
  }
  retrieveData() {
    fetch(
      "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=covid&retmode=json"
    )
      .then(blob => blob.json())
      .then(data => {
        const idList = data.esearchresult.idlist;
        fetch(
          `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${idList.join(
            ","
          )}`
        )
          .then(blob => blob.json())
          .then(summaries =>
            this.setState({
              articleSummaries: Object.values(summaries.result).slice(0, -1)
            })
          );
      });
  }

  componentDidMount() {
    this.retrieveData();
  }

  render() {
    return (
      <div className={classes.article__main__container}>
        <div className={classes.article__info}>
          <p>You can click on the article headers to open them in Pubmed.</p>
        </div>
        <div className={classes.article__main__header}>
          <p>Latest Publications:</p>
        </div>
        <div className={classes.article__container}>
          {this.state.articleSummaries.map(article => (
            <Article key={article.uid} article={article} />
          ))}
        </div>
      </div>
    );
  }
}

export default Articles;
