import combineReducers from "redux/lib/combineReducers";
import { routerReducer } from "react-router-redux/reducer";
import { reducer as formReducer } from "redux-form";
import core from "./modules/core";
import accounts from "./modules/accounts";
import articles from "./modules/articles";
import sections from "./modules/sections";
import users from "./modules/users";
import media from "./modules/media";
import comments from "./modules/comments";
import descriptions from "./modules/descriptions";
import advertisements from "./modules/advertisements";
import outquotes from "./modules/outquotes";

export default combineReducers({
  [core.constants.NAME]: core.reducer,
  [accounts.constants.NAME]: accounts.reducer,
  [articles.constants.NAME]: articles.reducer,
  [media.constants.NAME]: media.reducer,
  [sections.constants.NAME]: sections.reducer,
  [users.constants.NAME]: users.reducer,
  [comments.constants.NAME]: comments.reducer,
  [descriptions.constants.NAME]: descriptions.reducer,
  [advertisements.constants.NAME]: advertisements.reducer,
  [outquotes.constants.NAME]: outquotes.reducer,
  router: routerReducer,
  form: formReducer,
});
