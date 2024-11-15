import { useEffect } from 'react';

const PreviewVideo = ({ width, height, url, autoPlayed }) => {
  useEffect(() => {
  }, [width, height, url, autoPlayed]);

  return (
    <video controls autoPlay={autoPlayed} width={`${width}%`} height={`${height}%`}>
      <source src={url} type="video/mp4" />
    </video>
  );
};

export default PreviewVideo;
