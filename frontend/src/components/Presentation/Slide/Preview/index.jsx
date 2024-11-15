import { useEffect } from 'react';
import { Box } from '@mui/material';
import PreviewTextList from './Text/TextList';
import PreviewImageList from './Image/ImageList';
import PreviewVideoList from './Video/VideoList';
import PreviewCodeList from './Code/CodeList';

const SlidePreview = ({ slide }) => {
  useEffect(() => {
    console.log('slide: ', slide)
  }, [slide]);

  return (
    <Box sx={{ width: '100%', height: '100%', background: `${slide.background}` }}>
      <PreviewTextList texts={slide.texts} />
      <PreviewImageList images={slide.images} />
      <PreviewVideoList videos={slide.videos} />
      <PreviewCodeList codes={slide.codes} />
    </Box>
  );
};

export default SlidePreview;
