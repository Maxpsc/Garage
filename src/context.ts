import React from 'react';

interface CodeState {
	js: string;
	css: string;
	html: string;
}

interface CodeAction {
	type: 'js' | 'css' | 'html' | 'all',
	code: string;
	codeState?: CodeState
}

export const initCodeState = {
	js: '',
	css: '',
	html: ''
};

export const codeContext = React.createContext<{
  state: CodeState;
  dispatch: React.Dispatch<CodeAction>;
}>({
  state: initCodeState,
  dispatch: () => {},
});

export const codeReducer = (state: CodeState, action: CodeAction): CodeState => {
  if (['js', 'css', 'html'].indexOf(action.type) > -1) {
    return { ...state, [action.type]: action.code };
  }
  if (action.type === 'all' && action.codeState) {
    return action.codeState;
  }
  return state;
};