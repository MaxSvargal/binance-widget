import { useReducer } from 'react';
import { IMiniTickerShorten } from '../interfaces/ticker';

type IState = Map<string, IMiniTickerShorten>;
type IAction = IMiniTickerShorten[];
type IUseTickerReducer = (state: IState, action: IAction) => IState;

export const useTickerReducer = (): [IState, React.Dispatch<IAction>] =>
  useReducer<IUseTickerReducer>((state, action) => {
    const next = new Map(state);
    action.forEach((t) => next.set(t.s, t));
    return next;
  }, new Map());