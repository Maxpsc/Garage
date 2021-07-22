import React, { useContext, useEffect } from 'react';
import { editor, languages } from 'monaco-editor';
import Editor from '../Editor';
import { codeContext } from '../../context';

const JsEditor: React.FC = () => {
	const { dispatch } = useContext(codeContext);

	useEffect(() => {
		languages.typescript.typescriptDefaults.setCompilerOptions({
      allowJs: true,
      jsx: languages.typescript.JsxEmit.React,
      esModuleInterop: true,
      target: languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true,
      moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
      module: languages.typescript.ModuleKind.CommonJS,
      typeRoots: ['node_modules/@types'],
      allowSyntheticDefaultImports: true,
    });
	}, []);

	return (
    <div className="editor-wrap">
      <div className="title">typescript</div>
      <Editor
        language="typescript"
        onChange={editor => {
          dispatch({
            type: 'js',
            code: editor.getValue(),
          });
        }}
      />
    </div>
  );
};

export default JsEditor;