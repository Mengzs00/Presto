import { useEffect } from 'react';
import { Resizable } from 'react-resizable';
import Draggable from 'react-draggable';
import 'react-resizable/css/styles.css';

// text element
const Text = ({ id, width, height, text, colour, fontSize, fontFamily, handleChangeFontFamlity }) => {
  useEffect(() => {
  }, [width, height, text, colour, fontSize]);

  return (
    <Draggable>
      <Resizable
        minConstraints={[100, 50]}
        maxConstraints={[400, 300]}
        height={100}
        width={200}
      >
        <div onDoubleClick={() => handleChangeFontFamlity(id) } style={{ fontFamily: `'${fontFamily}'`, width: `${width}%`, height: `${height}%`, color: colour, fontSize: `${fontSize}em`, border: '1px dashed grey', maxWidth: `${width}%`, textOverflow: 'ellipsis', cursor: 'pointer' }}>{text}</div>
      </Resizable>
    </Draggable>
  );
};

export default Text;
