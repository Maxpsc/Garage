import React, { useReducer } from 'react';
import { initCodeState, codeContext, codeReducer } from './context';
import Header from './component/Header';
import HtmlEditor from './component/HtmlEditor';
import CssEditor from './component/CssEditor';
import JsEditor from './component/JsEditor';
import Preview from './component/Preview';
import './App.less';

function App() {
  const [codeState, dispatch] = useReducer(codeReducer, initCodeState);

  return (
    <codeContext.Provider
      value={{
        state: codeState,
        dispatch,
      }}
    >
      <div className="App">
        <Header />
        <div className="wrapper">
          <div className="code-wrap">
            <JsEditor />
            <CssEditor />
            <HtmlEditor />
          </div>
          <Preview />
        </div>
      </div>
    </codeContext.Provider>
  );
}

export default App;
