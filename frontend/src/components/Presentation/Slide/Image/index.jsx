import { useEffect } from 'react';
import { Resizable } from 'react-resizable';
import Draggable from 'react-draggable';
import 'react-resizable/css/styles.css';

// image element
const Image = ({ width, height, url, description }) => {
  useEffect(() => {
  }, [width, height, url, description]);

  return (
    <Draggable>
      <Resizable
        minConstraints={[100, 50]}
        maxConstraints={[400, 300]}
        height={100}
        width={200}
      >
        <div style={{ width: `${width}%`, height: `${height}%` }}>
          <img src={url} alt={description} style={{ width: '100%', height: '100%' }} />
        </div>
      </Resizable>
    </Draggable>
  );
};

export default Image;
