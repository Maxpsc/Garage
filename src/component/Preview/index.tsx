import React, { useState, useContext, useEffect } from 'react';
import { transform } from '@babel/standalone';
import { codeContext } from '../../context';
import './index.less';

const parser = (source: string) => {
  try {
    const compiled = transform(source, {
      presets: ['react']
    })
    return compiled.code;
  } catch (error) {
    console.log(error);
    return {
      isError: true,
      error,
    }
  }
}

const Preview: React.FC = () => {
  const { state } = useContext(codeContext);
  const [iframeSrc, setIframeSrc] = useState('');
  
  useEffect(() => {
    const js = parser(state.js);
    const showHtml = typeof js === 'string'
      ? state.html
      : JSON.stringify(js?.error)
    const source = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>${state.css}</style>
    </head>
    <body>
      ${showHtml}
      <script type="text/javascript">
      (async function() {
        try {
          ${js}
        } catch (err) {
          console.error(err)
        }
      })();
      </script>
    </body>
    </html>
  `;

    const blob = new Blob([source], { type: 'text/html' });
    const src = URL.createObjectURL(blob);
    setIframeSrc(src);
    return () => {
      URL.revokeObjectURL(src);
    }
  }, [state]);
  
  return (
    <div className="preview-wrap">
      <iframe
        src={iframeSrc}
        className="preview"
        frameBorder={0}
      ></iframe>
    </div>
  );
};

export default Preview;