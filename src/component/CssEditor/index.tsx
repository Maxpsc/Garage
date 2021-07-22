import React, { useContext } from 'react';
import Editor from '../Editor';
import { codeContext } from '../../context';

const CssEditor: React.FC = () => {
	const { state, dispatch } = useContext(codeContext);
	return (
		<div className="editor-wrap">
			<div className="title">css</div>
			<Editor
				language="css"
				onChange={editor => {
					dispatch({
            type: 'css',
            code: editor.getValue()
          });
				}}
			/>
		</div>
	);
};

export default CssEditor;