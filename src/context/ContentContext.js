import createDataContext from "./createDataContext";
import ContentApi from "../api/ContentApi";

const contentReducer = (state, action) => {
  switch (action.type) {
    case "change_language":
      return {
        ...state,
        selectedLanguage: action.payload,
      };
    case "get_content":
      return {
        ...state,
        languages: action.payload.content.map(
          (langContent) => langContent.language
        ),
        [action.payload.name]: action.payload.content.find(
          (lang) => lang.language === state.selectedLanguage
        ),
      };
    default:
      return state;
  }
};

const getContent = (dispatch) => async (name) => {
  try {
    const response = await ContentApi.get(`/page/${name}`);
    const multilingualContent = response.data.content;

    dispatch({
      type: "get_content",
      payload: { name, content: multilingualContent },
    });
  } catch (error) {
    console.log("No page!");
  }
};

const changeLanguage = (dispatch) => async (lang) => {
  try {
    dispatch({
      type: "change_language",
      payload: lang,
    });
  } catch (error) {
    console.log(error);
  }
};

export const { Provider, Context } = createDataContext(
  contentReducer,
  {
    getContent,
    changeLanguage,
  },
  {
    selectedLanguage: "en",
    languages: [],
    Signup: {},
  }
);
