import React, { useReducer } from "react";
import {
  State as ContentState,
  Action as ContentAction,
  Actions as ContentActions,
} from "./ContentContext";

import {
  State as AuthState,
  Action as AuthAction,
  Actions as AuthActions,
} from "./AuthContext";

type States = ContentState | AuthState;
type Actions = ContentAction | AuthAction;

type ReducerType =
  | ((state: ContentState, action: ContentAction) => ContentState)
  | ((state: AuthState, action: AuthAction) => AuthState);

type ActionsType = {
  [key: string]: (
    dispatch: React.Dispatch<Actions>
  ) => (any?: any) => Promise<void>;
};

type DefaultValueType = States;

type BoundActionsType = ContentActions & AuthActions;

type ContextProps = BoundActionsType & { state: ContentState & AuthState };

export default (
  reducer: ReducerType,
  actions: ActionsType,
  defaultValue: DefaultValueType
) => {
  // @ts-ignore - This is the only I could keep the whole application happy
  const Context = React.createContext<ContextProps>({});

  const Provider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions: any = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Provider, Context };
};
