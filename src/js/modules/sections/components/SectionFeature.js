import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Row, Col } from "react-bootstrap/lib";

import Byline from "../../articles/components/Byline";
import Dateline from "../../articles/components/Dateline";
import { getArticlesWithContributors } from "../../articles/selectors";

const styles = {
  SectionFeature: {
    borderTop: "1px solid #ddd",
    paddingTop: "6px",
  },
  sectionLabel: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "12px",
    marginBottom: "3px",
    textTransform: "uppercase",
    width: "100%",
    "&:hover": { color: "#000", textDecoration: "none" },
    "&:focus": { color: "#000", textDecoration: "none" },
  },
  primaryArticle: {
    borderRight: "solid 1px #ddd",
    paddingRight: "14px",
    marginBottom: "19px",
  },
  secondaryArticle: {
    paddingLeft: "13px !important",
    paddingRight: "7px",
    marginBottom: "19px",
  },
  ternaryArticle: {
    padding: "0 14px 0 13px",
    borderLeft: "solid 1px #ddd",
    marginBottom: "19px",
  },
  title: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "16px",
    fontWeight: "bold",
    lineHeight: 1.25,
    marginBottom: "7px",
    "&:active": {
      color: "#000",
    },
    "&:focus": {
      color: "#000",
    },
    "&:hover": {
      color: "#000",
    },
  },
  focus: {
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: 1.29,
    margin: "0 0 12px 0",
  },
  figure: {
    "& img": {
      width: "100%",
    },
  },
  featuredMediaContainer: {
    paddingRight: 0,
  },
};

const SectionFeature = ({ classes, articles, section, media, sections }) => {
  const sectionArticles = Object.values(
    Object.filter(articles, article => article.sectionId === section.id),
  );
  const primaryArticle = sectionArticles[0];
  let featuredMedia = null;
  const secondaryArticle = sectionArticles.slice(1).find(article => {
    const mediaObject = Object.values(media).find(
      mediaObject =>
        mediaObject.articleId === article.id && mediaObject.isFeatured,
    );
    if (mediaObject) {
      featuredMedia = mediaObject;
    }
    return mediaObject;
  });

  // NESTED IN <Col lg={9}>
  return (
    <Row className={classes.SectionFeature}>
      <Link to={section.permalink} className={classes.sectionLabel}>
        {section.name}
      </Link>
      <Col lg={4} md={4} className={classes.primaryArticle}>
        <Link
          className={classes.title}
          to={`${sections[primaryArticle.sectionId]
            .permalink}/${primaryArticle.slug}`}
        >
          {primaryArticle.title}
        </Link>
        <p className={classes.focus}>{primaryArticle.summary}</p>
        <Byline contributors={primaryArticle.contributors} />
        <Dateline article={primaryArticle} />
      </Col>
      <Col lg={4} md={4} className={classes.secondaryArticle}>
        <Link
          className={classes.title}
          to={`${sections[secondaryArticle.sectionId]
            .permalink}/${secondaryArticle.slug}`}
        >
          {secondaryArticle.title}
        </Link>
        <p className={classes.focus}>{secondaryArticle.summary}</p>
        <Byline contributors={secondaryArticle.contributors} />
        <Dateline article={secondaryArticle} />
      </Col>
      <Col lg={4} md={4} className={classes.featuredMediaContainer}>
        <figure className={classes.figure}>
          <img src={featuredMedia.url} />
        </figure>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state, ownProps) => ({
  articles: getArticlesWithContributors(state),
  media: state.media.media,
  sections: state.sections.sections,
});

export default connect(mapStateToProps)(injectSheet(styles)(SectionFeature));
