//使用useReducer改写版本

import { type } from "os";
import { features } from "process";
import { useCallback, useReducer, useState } from "react";

enum ActionType {
  UNDO = "UNDO",
  REDO = "REDO",
  SET = "SET",
  RESET = "RESET",
}

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type Action<T> = { newPresent?: T; type: ActionType };

const createUndoReducer =
  <T>() =>
  (state: State<T>, action: Action<T>): State<T> => {
    const { past, present, future } = state;
    const { type, newPresent } = action;
    switch (type) {
      case ActionType.UNDO: {
        if (past.length === 0) return state;
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);

        return {
          past: newPast,
          present: previous,
          future: [present, ...future],
        };
      }
      case ActionType.REDO: {
        const { past, present, future } = state;
        if (future.length === 0) return state;
        const next = future[0];
        const newFuture = future.slice(1);

        return {
          past: [...past, present],
          present: next,
          future: newFuture,
        };
      }
      case ActionType.SET: {
        const { past, present } = state;
        if (newPresent === present) return state;
        return {
          past: [...past, present],
          present: newPresent as T,
          future: [],
        };
      }
      case ActionType.RESET: {
        return {
          past: [],
          present: newPresent as T,
          future: [],
        };
      }
    }
  };

export const useUndo = <T>(initialPresent: T) => {
  //这一步目的是做类型推断，将T泛型传入undoReducer
  const undoReducer = createUndoReducer<T>();
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);
  console.log(state);
  //当state中数据改变时，就会触发当前函数，改变canUndo和canRedo的值
  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    dispatch({ type: ActionType.UNDO });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: ActionType.REDO });
  }, []);

  const set = useCallback((newPresent: T) => {
    dispatch({ type: ActionType.SET, newPresent });
  }, []);

  const reset = useCallback((newPresent: T) => {
    dispatch({ type: ActionType.RESET, newPresent });
  }, []);

  return [state, { set, reset, undo, redo, canRedo, canUndo }] as const;
};
