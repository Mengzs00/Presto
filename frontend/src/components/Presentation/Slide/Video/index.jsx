import { useEffect } from 'react';
import { Resizable } from 'react-resizable';
import Draggable from 'react-draggable';
import 'react-resizable/css/styles.css';

const Video = ({ width, height, url, autoPlayed }) => {
  useEffect(() => {
  }, [width, height, url, autoPlayed]);

  return (
    <Draggable>
      <Resizable
        minConstraints={[100, 50]}
        maxConstraints={[400, 300]}
        height={100}
        width={200}
      >
        <video controls autoPlay={autoPlayed} width={`${width}%`} height={`${height}%`}>
          <source src={url} type="video/mp4" />
        </video>
      </Resizable>
    </Draggable>
  );
};

export default Video;
