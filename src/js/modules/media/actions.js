import axios from "axios";
import { STUY_SPEC_API_URL, STUY_SPEC_API_HEADERS } from "../../constants";
import { validateKey } from "../../utils";
import * as t from "./actionTypes";

const fakeMedia = [
  {
    id: 5,
    userId: 5,
    articleId: 5,
    url: "https://i.ytimg.com/vi/qh7LLydY8eo/maxresdefault.jpg",
    title: "A Bird Will Die.",
    caption:
      "As the snake reaches up to kill the bird, the bird has deja vu of that visit to the Gucci store.",
    type: "photograph",
    isFeatured: true,
  },
  {
    id: 1,
    userId: 2,
    articleId: 1,
    url: "https://i.ytimg.com/vi/v6wfobPI2fI/maxresdefault.jpg",
    title: "Car Crash",
    caption:
      "Two cars fight to the death in order to win lifetime supply of tires.",
    type: "photograph",
    isFeatured: true,
  },
  {
    id: 2,
    userId: 1,
    articleId: 2,
    url:
      "https://images.unsplash.com/photo-1441794016917-7b6933969960?dpr=2&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop=",
    title: "Beach Day",
    caption:
      "The towers next to this beach are sinking three inches further into the ground every year.",
    type: "photograph",
    isFeatured: true,
  },
  {
    id: 3,
    userId: 1,
    articleId: 3,
    url:
      "https://images.unsplash.com/photo-1489619547086-641e1c87c3ff?dpr=2&auto=format&fit=crop&w=1080&h=750&q=80&cs=tinysrgb&crop=",
    title: "Pocket Watch",
    caption:
      "The pocket watch of Benjamin Franklin was found near the University of Pennsylvania",
    type: "photograph",
    isFeatured: true,
  },
  {
    id: 4,
    userId: 2,
    articleId: 4,
    url:
      "http://www.stockillustrations.com/Image.aspx?src=medres&name=ALBA1060.jpg&sz=1144&fitw=y",
    title: "Happy Birthday",
    caption:
      "As Charlotte celebrates her thirteenth birthday, she is surprised by two nice rabbits.",
    type: "illustration",
    isFeatured: true,
  },
];

export const fetchMedia = () => {
  return dispatch => {
    dispatch({ type: t.FETCH_MEDIA_PENDING });
    dispatch({
      type: t.FETCH_MEDIA_FULFILLED,
      payload: fakeMedia,
    });
    /*
    axios
      .get(`${STUY_SPEC_API_URL}/media`, STUY_SPEC_API_HEADERS)
      .then(response => {
        validateMedia(response.data);
        dispatch({
          type: t.FETCH_MEDIA_FULFILLED,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_MEDIA_REJECTED,
          payload: err,
        });
      });
    */
  };
};

const validateMedia = mediaArray => {
  const integerProperties = ["id", "userId"];
  const stringProperties = ["url", "title", "caption", "type"];
  if (!Array.isArray(mediaArray)) {
    throw "EXCEPTION: media response is not an array.";
  }
  mediaArray.forEach(mediaObject => {
    integerProperties.forEach(numberKey => {
      validateKey(mediaObject, numberKey, "number");
    });
    stringProperties.forEach(stringKey => {
      validateKey(mediaObject, stringKey, "string");
    });
  });
  return true;
};
