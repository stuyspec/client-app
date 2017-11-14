import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import Byline from "../Byline";
import Dateline from "../Dateline";

const styles = {
  section: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontWeight: 300,
    fontSize: "12px",
    marginBottom: "4px",
    textTransform: "uppercase",
    "&:hover": {
      color: "#000",
    },
    "&:active": {
      color: "#000",
    },
    "&:focus": {
      color: "#000",
    },
  },
  header: {
    paddingLeft: "0 !important",
  },
  title: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "26px",
    fontWeight: 700,
    lineHeight: 1.08,
    marginBottom: "9px",
    "&:hover": {
      color: "#000",
    },
    "&:active": {
      color: "#000",
    },
    "&:focus": {
      color: "#000",
    },
  },
  summary: {
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: 1.29,
  },
  featuredMedia: {
    paddingRight: "14px !important",
    height: "310px",
    overflow: "hidden",
    "& > figure > img": {
      width: "100%",
    },
  },
  "@media (min-width: 992px and max-width: )": {
    featuredMedia: {
      paddingLeft: "14px",
    },
  },
  "@media (max-width: 991px)": {
    featuredMedia: {
      paddingRight: "0 !important",
    },
  },
  "@media (max-width: 767px)": {
    featuredMedia: {
      height: "auto",
      overflow: "visible",
      paddingLeft: "0 !important",
      paddingTop: "14px",
      "& figure img": {
        marginLeft: "-14px",
        width: "100vw",
      },
    },
  },
};

const LeftTitleArticle = ({ classes, article, media, sections }) => {
  const featuredMedia = Object.values(media).find(
    mediaObject => mediaObject.articleId === article.id,
  );
  const section = Object.values(sections).find(
    section => article.sectionId === section.id,
  );
  return (
    <Row className={classes.article}>
      <Link className={classes.section} to={section.permalink}>
        {section.name}
      </Link>
      <Col
        xs={12}
        smPush={4}
        sm={8}
        mdPush={4}
        md={8}
        lgPush={4}
        lg={8}
        className={classes.featuredMedia}
      >
        <figure>
          <img src={featuredMedia.url} />
        </figure>
      </Col>
      <Col
        xs={12}
        smPull={8}
        sm={4}
        mdPull={8}
        md={4}
        lgPull={8}
        lg={4}
        className={classes.header}
      >
        <Link
          className={classes.title}
          to={`${section.permalink}/${article.slug}`}
        >
          {article.title}
        </Link>
        <p className={classes.summary}>{article.summary}</p>
        <Byline contributors={article.contributors} />
        <Dateline article={article} />
      </Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  media: state.media.media,
  sections: state.sections.sections,
});

export default connect(mapStateToProps)(injectSheet(styles)(LeftTitleArticle));
