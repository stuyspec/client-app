import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import { EditUserForm } from "./forms";
import { updateUser } from "../actions";

const styles = {
  pageTitle: {
    color: "#000",
    fontFamily: "Canela",
    fontSize: "48px",
    fontWeight: 500,
    lineHeight: 1,
    marginBottom: "11px",
  },
  backRedirect: {
    color: "#3084df",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "17px",
    marginBottom: "14px",
  },
};

const EditProfilePage = ({ classes, session, users, updateUser }) => {
  const handleUpdateUser = values => {
    updateUser(values, session.userId);
  };
  return (
    <Grid fluid className={classes.EditProfilePage}>
      <Row>
        <Col
          xs={12}
          sm={6}
          smOffset={3}
          md={6}
          mdOffset={3}
          lg={6}
          lgOffset={3}
        >
          <p className={classes.pageTitle}>Edit Profile</p>
          <Link to={"/myaccount/profile"} className={classes.backRedirect}>
            Back to Profile
          </Link>
          <EditUserForm onSubmit={handleUpdateUser} />
        </Col>
      </Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  session: state.accounts.session,
  users: state.users.users,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(EditProfilePage),
);
