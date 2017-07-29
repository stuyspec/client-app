import {
  FETCH_SECTION_PENDING,
  FETCH_SECTION_REJECTED,
  FETCH_SECTION_FULFILLED,
} from './actionTypes';

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  request: null,
  sections: {
    "news": {
      id: 0,
      name: "News",
      slug: "news",
      description: "The news of Stuyvesant.",
      parentSlug: null,
    },
    "opinions": {
      id: 1,
      name: "Opinions",
      slug: "opinions",
      description: "The opinions of Stuyvesant.",
      parentSlug: null,
    },
    "features": {
      id: 2,
      name: "Features",
      slug: "features",
      description: "The features of Stuyvesant.",
      parentSlug: null,
    },
    "humor": {
      id: 3,
      name: "Humor",
      slug: "humor",
      description: "The humor of Stuyvesant.",
      parentSlug: null,
    },
    "ae": {
      id: 4,
      name: "Arts & Entertainment",
      slug: "ae",
      description: "The arts and entertainment of Stuyvesant.",
      parentSlug: null,
    },
    "sports": {
      id: 5,
      name: "Sports",
      slug: "sports",
      description: "The sports of Stuyvesant.",
      parentSlug: null,
    },
    "photo": {
      id: 6,
      name: "Photo",
      slug: "photo",
      description: "The photo of Stuyvesant.",
      parentSlug: null,
    },
    "art": {
      id: 7,
      name: "Art",
      slug: "art",
      description: "The art of Stuyvesant.",
      parentSlug: null,
    },
    "campaign-coverage": {
      id: 8,
      name: "Campaign Coverage",
      slug: "campaign-coverage",
      description: "The campaign coverage of Stuyvesant.",
      parentSlug: "news",
    },
    "staff-editorials": {
      id: 9,
      name: "Staff Editorials",
      slug: "staff-editorials",
      description: "The staff editorials of Stuyvesant.",
      parentSlug: "opinions",
    },
    "creative-writing": {
      id: 10,
      name: "Creative Writing",
      slug: "creative-writing",
      description: "The creative writing of Stuyvesant.",
      parentSlug: "features",
    },
    "voices": {
      id: 11,
      name: "Voices",
      slug: "voices",
      description: "The voices of Stuyvesant.",
      parentSlug: "features",
    },
  },
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'sections/FETCH_SECTION_PENDING': {
      return { ...state, isFetching: true };
    }
    case 'sections/FETCH_SECTION_REJECTED': {
      return { ...state, isFetching: false, error: action.payload };
    }
    case 'sections/FETCH_SECTION_FULFILLED': {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        request: action.payload
      };
    }
  }
  return state;
};

export default reducer;
