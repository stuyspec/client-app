import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap/lib";
import injectSheet from "react-jss";
import { Helmet } from "react-helmet";

import ArticleList from "./ArticleList";
import { TallAd } from "../../advertisements/components";
import { getArticlesWithContributors } from "../selectors";
import { searchArticles } from "../actions";
import { SearchForm } from "../../accounts/components/forms";

const styles = {
  SearchPage: {
    marginTop: "76px",
  },
  title: {
    color: "#000",
    fontFamily: "Canela",
    fontSize: "36px",
    fontWeight: "500",
    marginBottom: "26px",
    textAlign: "center",
  },
  "@media (min-width: 992px)": {
    SearchPage: {
      marginTop: "80px",
    },
  },
};

const SearchPage = ({ classes, articles, searchableIds }) => {
  return (
    <Grid fluid className={classes.SearchPage}>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>Search</title>
        <meta />
      </Helmet>
      <Row>
        <p className={classes.title}>
          Search Page
        </p>
        <SearchForm onSubmit={values => searchArticles(values)}/>
          {searchableIds.length !== 0 && <Col xs={12} sm={12} md={9} lg={9} className={classes.articleList}>
            <ArticleList articles={articles} title="Search" label="Articles" />
          </Col>}
        <Col
          xsHidden
          smHidden
          md={3}
          lg={3}
          className={classes.tallAdContainer}
        >
          <TallAd />
        </Col>
      </Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  articles: getArticlesWithContributors(state),
  searchableIds: state.articles.searchableIds,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ searchArticles }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(SearchPage));
