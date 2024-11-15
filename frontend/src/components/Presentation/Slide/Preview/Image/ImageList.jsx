import { useEffect } from 'react';
import PreviewImage from './index';

const PreviewImageList = ({ images }) => {
  useEffect(() => {
    console.log('images: ', images);
  }, [images]);
  return (
    <>
      {
        images && Object.values(images).length > 0 ? (Object.values(images).map((item, index) => (<PreviewImage key={index} width={item.width} height={item.height} url={item.url} description={item.description} />))) : (<></>)
      }
    </>
  );
};

export default PreviewImageList;
