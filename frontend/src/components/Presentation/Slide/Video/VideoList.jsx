import Video from './index';

const VideoList = ({ videos }) => {
  return (
    <>
      {
        videos && Object.values(videos).length > 0 ? (Object.values(videos).map((item, index) => (<Video key={index} width={item.width} height={item.height} url={item.url} autoPlayed={item.autoPlayed} />))) : (<></>)
      }
    </>
  );
};

export default VideoList;
