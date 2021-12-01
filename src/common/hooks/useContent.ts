import { useContext, useEffect } from "react";
import { Context as ContentContext } from "@context/ContentContext";
import { PageType } from "@common/types";

export default function useContent(page: PageType) {
  const { state, getContent } = useContext(ContentContext);

  useEffect(() => {
    getContent(page);
  }, [state.selectedLanguage]);

  if (Object.keys(state?.[page] ?? {}).length > 0) {
    return state[page];
  }

  return null;
}
