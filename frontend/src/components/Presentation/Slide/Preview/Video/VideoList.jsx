import PreviewVideo from './index';

const PreviewVideoList = ({ videos }) => {

  return (
    <>
      {
        videos && Object.values(videos).length > 0 ? (Object.values(videos).map((item, index) => (<PreviewVideo key={index} width={item.width} height={item.height} url={item.url} autoPlayed={item.autoPlayed} />))) : (<></>)
      }
    </>
  );
};

export default PreviewVideoList;
