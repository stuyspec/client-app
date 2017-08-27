import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { EditProfileForm } from "./forms";
import { updateUser } from "../actions";

const EditProfilePage = ({ session, updateUser }) => {
  if (session === null) {
    return <p>You are not signed in. <Link to="/myaccount">Sign in.</Link></p>;
  }
  return (
    <div>
      <EditProfileForm onSubmit={ updateUser }/>
    </div>
  )
};

const mapStateToProps = state => ({
  session: state.accounts.session,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { updateUser },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfilePage);