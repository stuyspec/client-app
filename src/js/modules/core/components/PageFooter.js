import React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap/lib/';

const styles = {
  PageFooter: {
    background: '#FFFFFF',
    height: '370px',
  },
  pageFooterMain: {
    borderTop: '3px solid #dddddd',
    margin: '0 auto',
    width: '1060px',
  },
  sectionFlex: {
    height: '350px',
    display: 'flex',
    flexFlow: 'column wrap',
    paddingTop: '6px',
  },
  sectionBlock: {
    marginTop: '19px',
  },
  topLevelSectionLink: {
    color: '#000000',
    fontSize: '14px',
    fontFamily: "Circular Std",
    fontStyle: 'normal',
    fontWeight: 'bold',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  subsectionLink: {
    color: '#000000',
    fontSize: '13px',
    fontFamily: 'Circular Std',
    fontStyle: 'normal',
    fontWeight: '300',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  theSpectator: {
    color: '#000000',
    fontFamily: 'Old English Text MT',
    fontSize: '30px',
    fontStyle: 'normal',
    fontWeight: '400',
    paddingTop: '10px',
  },
};

const PageFooter = ({ classes, sectionsWithSubsections }) => {
  const makeSectionLinks = () => {
    return (sectionsWithSubsections.map((topLevelSection) => {
        return (
          <div className={classes.sectionBlock} key={topLevelSection.id}>
            <Link className={classes.topLevelSectionLink}
                  key={`topLevelLink${topLevelSection.id}`}
                  to={`/${topLevelSection.slug}`}>
              {topLevelSection.name}
            </Link>
            {
              Object.keys(topLevelSection.subsections).map((subsectionSlug) => {
                return makeSubsectionLink(
                  topLevelSection.slug,
                  topLevelSection.subsections[ subsectionSlug ]);
              })
            }
          </div>
        );
      })
    );
  };
  const makeSubsectionLink = (topLevelSectionSlug, subsection) => {
    return (
      <div key={`subsectionLink${subsection.id}`}>
        <Link className={classes.subsectionLink}
              to={`/${topLevelSectionSlug}/${subsection.slug}`}>
          {subsection.name}
        </Link>
      </div>
    );
  };

  return (
    <Grid className={classes.PageFooter}>
      <Row className={classes.pageFooterMain}>
        <Col md={8} mdOffset={2} className={classes.theSpectator}>
          The Spectator
        </Col>
        <Col md={8} mdOffset={2} className={classes.sectionFlex}>
          {makeSectionLinks()}
        </Col>
      </Row>
    </Grid>
  );
};

export default (injectSheet(styles)(PageFooter));