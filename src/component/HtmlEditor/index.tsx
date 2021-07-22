import React, { useContext } from 'react';
import Editor from '../Editor';
import { codeContext } from '../../context';

const HtmlEditor: React.FC = () => {
  const { state, dispatch } = useContext(codeContext);
  return (
    <div className="editor-wrap">
      <div className="title">html</div>
      <Editor
        language="html"
        onChange={editor => {
          dispatch({
            type: 'html',
            code: editor.getValue(),
          });
        }}
      />
    </div>
  );
};

export default HtmlEditor;
