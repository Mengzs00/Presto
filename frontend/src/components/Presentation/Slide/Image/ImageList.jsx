import Image from './index';

const ImageList = ({ images }) => {
  return (
    <>
      {
        images && Object.values(images).length > 0 ? (Object.values(images).map((item, index) => (<Image key={index} width={item.width} height={item.height} url={item.url} description={item.description} />))) : (<></>)
      }
    </>
  );
};

export default ImageList;
