import { useEffect } from 'react';
import { Box } from '@mui/material';
import CodeList from './Code/CodeList';
import TextList from './Text/TextList';
import ImageList from './Image/ImageList';
import VideoList from './Video/VideoList';

const Slide = ({ presentationId, slide, handleChangeFontFamlityFinish }) => {
  useEffect(() => {
  }, [slide]);

  return (
    <Box sx={{ width: '100%', height: '100%', background: `${slide.background}` }}>
      <TextList texts={slide.texts} presentationId={presentationId} slideId={slide.id} handleChangeFontFamlityFinish={handleChangeFontFamlityFinish} />
      <ImageList images={slide.images} />
      <VideoList videos={slide.videos} />
      <CodeList codes={slide.codes} />
    </Box>
  );
};

export default Slide;
