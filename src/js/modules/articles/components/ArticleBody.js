import React from "react";
import injectSheet from "react-jss";

import ArticleFeaturedMedia from "./ArticleFeaturedMedia";

const styles = {
  ArticleBody: {
    borderBottom: "1px solid #ddd",
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "18px",
    lineHeight: 1.44,
    marginBottom: "38px",
    paddingBottom: "38px",
    width: "700px",
    "& p": {
      marginBottom: "20px",
    },
    "& p:first-child": {
      marginTop: "28px",
    },
    "& p:first-child::first-letter": {
      float: "left",
      fontSize: "58px",
      lineHeight: "43px",
      padding: "7px 6px 0px 3px",
    },
  },
};

const ArticleBody = ({ classes, content, featuredMedia }) => {
  return (
    <div className={classes.ArticleBody}>
      {featuredMedia && <ArticleFeaturedMedia featuredMedia={featuredMedia} />}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default injectSheet(styles)(ArticleBody);
