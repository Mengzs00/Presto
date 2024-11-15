import { useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const PreviewCode = ({ width, height, code, fontSize }) => {
  useEffect(() => {
  }, [width, height, code, fontSize]);

  return (
    <div style={{ width: `${width}%`, height: `${height}%`, fontSize: `${fontSize}em` }}>
      <SyntaxHighlighter language="javascript" style={darcula}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default PreviewCode;
