import React, { useState, useContext, useEffect } from 'react';
import { transform } from '@babel/standalone';
import { codeContext, libContext } from '../../context';
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
    const systemjs = `<script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/system.min.js"></script>
    <script type="systemjs-importmap">
        {
          "imports": {
            "lodash": "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js"
          }
        }
      </script>`;
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

      <!-- 加载模块 -->
      ${systemjs}
      
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