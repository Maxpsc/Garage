import React, { useEffect, useRef, useContext } from 'react';
import { debounce } from 'lodash';
import { editor, languages, Uri } from 'monaco-editor';
import { codeContext } from '../../context';
import './index.less';

import('monaco-themes/themes/Sunburst.json').then((data: any) => {
  editor.defineTheme('N', data);
  editor.setTheme('N');
});


export interface IEditorProps {
  initValue?: string;
  language: string;
  onChange: (editor: editor.IStandaloneCodeEditor) => void;
}

const Editor: React.FC<IEditorProps> = props => {
	const { initValue = '', language = '', onChange } = props;
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const container = useRef<HTMLDivElement>(null);

	const { state } = useContext(codeContext);
  console.log(state);

	useEffect(() => {
		if (container.current && !editorRef.current) {
			const model = editor.createModel(
        initValue,
        language,
        Uri.parse(`file:///main.${language === 'typescript' ? 'tsx' : language}`)
      );
			
			editorRef.current = editor.create(container.current, {
        language,
        automaticLayout: true,
        fontSize: 16,
				tabSize: 2,
        minimap: {
          enabled: false,
        },
        model,
      });

			editorRef.current.onDidChangeModelContent(
        debounce(function (e) {
          onChange(editorRef.current!);
        }, 1000)
      );
		}
	}, []);

  return (
		<div className="editor" ref={container}></div>
  );
};

export default Editor;