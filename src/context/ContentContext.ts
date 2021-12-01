import createDataContext from "./createDataContext";
import ContentApi from "../api/ContentApi";
import { LanguageType, PageType } from "@common/types";
import React from "react";

export type State = {
  selectedLanguage: LanguageType;
  languages: LanguageType[];
  Signup:
    | {
        [key: string]: string;
      }
    | undefined;
  errorMessage: string;
};

export type Action =
  | {
      type: "get_content";
      payload: { name: PageType; content: [{ language: LanguageType }] };
    }
  | { type: "change_language"; payload: LanguageType };

export type Actions = {
  getContent: (name: PageType) => void;
  changeLanguage: (lang: LanguageType) => void;
};

const contentReducer = (state: State, action: Action) => {
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

const getContent =
  (dispatch: React.Dispatch<Action>) => async (name: PageType) => {
    try {
      const response = await ContentApi.get(`/page/${name}`);
      if (!response) {
        throw new Error("no_content");
      }
      const multilingualContent = response.data.content;

      dispatch({
        type: "get_content",
        payload: { name, content: multilingualContent },
      });
    } catch (error) {
      console.log("No page!");
    }
  };

const changeLanguage =
  (dispatch: React.Dispatch<Action>) => async (lang: LanguageType) => {
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
    errorMessage: "",
  }
);
