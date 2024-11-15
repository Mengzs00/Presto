import { useEffect } from 'react';

const PreviewText = ({ width, height, text, colour, fontSize, fontFamily }) => {
  useEffect(() => {
  }, [width, height, text, colour, fontSize]);

  return (
    <div style={{ fontFamily: `'${fontFamily}'`, width: `${width}%`, height: `${height}%`, color: colour, fontSize: `${fontSize}em`, maxWidth: `${width}%`, textOverflow: 'ellipsis' }}>{text}</div>
  );
};

export default PreviewText;
