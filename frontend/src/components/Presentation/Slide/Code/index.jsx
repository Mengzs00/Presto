import { useEffect } from 'react';
import { Resizable } from 'react-resizable';
import Draggable from 'react-draggable';
import 'react-resizable/css/styles.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Code = ({ width, height, code, fontSize }) => {
  useEffect(() => {
  }, [width, height, code, fontSize]);

  return (
    <Draggable>
      <Resizable
        minConstraints={[100, 50]}
        maxConstraints={[400, 300]}
        height={100}
        width={200}
      >
        <div style={{ width: `${width}%`, height: `${height}%`, fontSize: `${fontSize}em` }}>
          <SyntaxHighlighter language="javascript" style={darcula}>
            {code}
          </SyntaxHighlighter>
        </div>
      </Resizable>
    </Draggable>
  );
};

export default Code;
