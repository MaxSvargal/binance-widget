import React, {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

interface IContextProviderArgs<State> {
  children?: JSX.Element;
  value?: State;
}

type IContextInitialState<State> = [State, Dispatch<SetStateAction<State>>];

type IStateContextOutput<State> = readonly [
  Context<IContextInitialState<State>>,
  (props: IContextProviderArgs<State>) => JSX.Element,
];

export function makeStateContext<State>(
  defaultState: State,
): IStateContextOutput<State> {
  const initialState: IContextInitialState<State> = [
    defaultState,
    () => defaultState,
  ];
  const context = createContext<typeof initialState>(initialState);

  const ContextProvider = ({
    children,
    value,
  }: IContextProviderArgs<State>) => {
    const [state, dispatch] = useState(value ?? initialState[0]);
    return (
      <context.Provider value={[state, dispatch]}>{children}</context.Provider>
    );
  };

  return [context, ContextProvider] as const;
}
