/* The FeaturedArticle component displays the highest-rated article. It is
 * currently nested in a <Col md={9} lg={9}>.
 */

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import Byline from "../Byline";
import Dateline from "../Dateline";
import { getArticlesWithContributors } from "../../selectors";

const styles = {
  FeaturedArticle: {
    paddingBottom: "24px",
  },
  title: {
    color: "#000",
    fontFamily: "Canela",
    fontSize: "30px",
    fontWeight: "300",
    lineHeight: "1.25",
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
  sectionLabel: {
    color: "#000",
    display: "blocK",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: 300,
    margin: "6px 0 9px 0",
    textTransform: "uppercase",
    "&:hover": { color: "#000", textDecoration: "none" },
    "&:focus": { color: "#000", textDecoration: "none" },
  },
  headline: {
    paddingRight: "0 !important",
    paddingLeft: "0 !important",
  },
  summary: {
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: 1.29,
    margin: "0 0 8px 0",
  },
  featuredMediaContainer: {
    padding: "0 0 0 14px !important",
  },
  figure: {
    "& img": {
      width: "100%",
    },
  },
  "@media (max-width: 768px)": {
    featuredMediaContainer: {
      marginBottom: "14px",
      padding: "0 !important",
    },
    headline: {
      padding: "0 !important",
    },
    figure: {
      "& img": {
        marginLeft: "-14px",
        width: "100vw",
      },
    },
  },
};

const FeaturedArticle = ({ classes, articles, media, sections }) => {
  const article = Object.values(articles)[0];
  const section = Object.values(sections).find(section => {
    return section.id === article.sectionId;
  });
  const featuredMedia = Object.values(media).find(mediaObject => {
    return mediaObject.isFeatured && mediaObject.articleId === article.id;
  });
  return (
    <Row className={classes.FeaturedArticle}>
      <Col
        xs={12}
        sm={8}
        md={8}
        lg={8}
        smPush={4}
        mdPush={4}
        lgPush={4}
        className={classes.featuredMediaContainer}
      >
        <figure className={classes.figure}>
          <img src={featuredMedia.url} />
        </figure>
      </Col>
      <Col
        xs={12}
        sm={4}
        md={4}
        lg={4}
        smPull={8}
        mdPull={8}
        lgPull={8}
        className={classes.headline}
      >
        <Link
          className={classes.title}
          to={`${section.permalink}/${article.slug}`}
        >
          {article.title}
        </Link>
        <Link to={section.permalink} className={classes.sectionLabel}>
          {section.name}
        </Link>
        <p className={classes.summary}>{article.summary}</p>
        <Byline contributors={article.contributors} />
        <Dateline article={article} />
      </Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  articles: getArticlesWithContributors(state),
  media: state.media.media,
  sections: state.sections.sections,
  users: state.users.users,
});

export default connect(mapStateToProps)(injectSheet(styles)(FeaturedArticle));
