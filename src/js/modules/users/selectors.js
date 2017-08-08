import { createSelector } from "reselect";

export const getUsers = state => state.users.users;
export const getRoles = state => state.users.roles;
export const getUserRoles = state => state.users.userRoles;

const getRequestedContributorSlug = (state, props) => props.match.params.contributor_slug;
const getRoleFromProps = (state, props) => props.role;

export const getContributorFromSlug = createSelector(
  [ getUsers, getRequestedContributorSlug ],
  (users, requestedContributorSlug) => {
    return users[ requestedContributorSlug ];
  }
);

/**
 * The selector returns all users within a role.
 */
export const getUsersWithinRole = createSelector(
  [ getUsers, getRoleFromProps, getUserRoles ],
  (users, role, userRoles) => {
    const userSlugsInRole = userRoles
      .filter(userRole => userRole.roleSlug === role.slug)
      .map(userRole => userRole.userSlug);
    return Object.filter(users, user => {
      return userSlugsInRole.includes(user.slug);
    });
  }
);