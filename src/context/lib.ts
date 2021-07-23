import React from 'react';

interface LibState {
  css: string[];
  js: string[];
}

interface LibAction {
  type: 'css' | 'js'
	result: string[]
}

export const initLibState = {
  js: [],
  css: [],
};

export const libContext = React.createContext<{
  state: LibState;
  dispatch: React.Dispatch<LibAction>;
}>({
  state: initLibState,
  dispatch: () => {},
});

export const libReducer = (state: LibState, action: LibAction): LibState => {
  return {
		...state,
		[action.type]: action.result
	}
};
