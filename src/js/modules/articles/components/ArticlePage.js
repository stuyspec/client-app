import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";

import ArticleHeader from "./ArticleHeader";
import ArticleBody from "./ArticleBody";
import RecommendedRow from "./RecommendedRow";
import CommentThread from "../../comments/components/CommentThread";
import {
  getArticleFromRequestedSlug,
  getArticleFeaturedMedia,
} from "../selectors";

const styles = {
  ArticlePage: {
    marginTop: "60px",
  },
  descriptionRow: {
    marginBottom: "24px",
  },
  description: {
    border: "1px solid #ddd",
    borderStyle: "solid none", // only top-bottom borders
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "16px",
    padding: "12px 0 13px",
  },
  subscribe: {
    color: "#3572b7",
    "&:active": {
      color: "#3572b7",
    },
    "&:focus": {
      color: "#3572b7",
    },
    "&:hover": {
      color: "#3572b7",
    },
  },
  "@media (max-width: 1199px)": {
    ArticlePage: {
      padding: "0 8%",
    },
  },
  "@media (max-width: 991px)": {
    ArticlePage: {
      padding: 0,
    },
    descriptionRow: {
      padding: "0 10%",
    },
  },
  "@media (max-width: 767px)": {
    descriptionRow: {
      padding: "0 2%",
    },
  },
};

//TODO: pop it up
const ArticlePage = ({ classes, article, section, featuredMedia }) => {
  return (
    <Grid fluid className={classes.ArticlePage}>
      <ArticleHeader article={article} section={section} />
      <ArticleBody content={article.content} featuredMedia={featuredMedia} />
      <Row className={classes.descriptionRow}>
        <Col xs={12} sm={12} md={9} lg={9} className={classes.description}>
          The Pulse of the Student Body:&nbsp;
          <Link
            to={"/maybe-we-should-pop-up-the-subscribe-modal"}
            className={classes.subscribe}
          >
            Subscribe
          </Link>
          &nbsp;to <em>The Stuyvesant Spectator</em>’s biweekly newsletter.
        </Col>
        <Col xsHidden smHidden md={3} lg={3} />
      </Row>
      <Row />
      <RecommendedRow section={section} />
      <CommentThread article={article} />
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  article: getArticleFromRequestedSlug(state, ownProps),
  featuredMedia: getArticleFeaturedMedia(state, ownProps),
});

export default connect(mapStateToProps)(injectSheet(styles)(ArticlePage));
