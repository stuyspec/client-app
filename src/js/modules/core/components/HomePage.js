import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import articles from "../../articles";
import sections from "../../sections";
import { fetchArticles} from "../../articles/actions"

const styles = {
  HomePage: {}
};

const HomePage = ({ classes, sectionsWithLinks, articles, fetchArticles }) => {
  const createSectionListItems = () => {
    return Object.keys(sectionsWithLinks).map((key) => {
      return (
        <li key={key}>
          <Link to={sectionsWithLinks[ key ].pathToSectionPage}>{sectionsWithLinks[ key ].name}</Link>
        </li>
      );
    });
  };
  const createArticleListItems = () => {
    return Object.keys(articles).map((key) => {
      const article = articles[ key ];
      const pathToArticlePage = `${sectionsWithLinks[ article.sectionSlug ]
        .pathToSectionPage}/${key}`;
      return (
        <li key={key}>
          <Link to={pathToArticlePage}>{article.title}</Link>
        </li>
      );
    });
  };
  const handleFetch = () => {
    fetchArticles();
  };
  return (
    <div className={classes.HomePage}>
      <h1>Home page</h1>
      <button onClick={handleFetch}>Articles </button>
      <h2>Sections</h2>
      <ul>
        {createSectionListItems()}
      </ul>
      <h2>Articles</h2>
      <ul>
        {createArticleListItems()}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  articles: articles.selectors.getArticles(state),
  sectionsWithLinks: sections.selectors.getSectionsWithLinks(state),
});

//TODO: Make this mapDispatchToProps actually do something
const mapDispatchToProps = dispatch => {
  return bindActionCreators({fetchArticles: fetchArticles}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(HomePage));
