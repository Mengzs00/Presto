import { useEffect } from 'react';

const PreivewImage = ({ width, height, url, description }) => {
  useEffect(() => {
  }, [width, height, url, description]);

  return (
    <div style={{ width: `${width}%`, height: `${height}%` }}>
      <img src={url} alt={description} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default PreivewImage;
