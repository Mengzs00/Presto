import PreviewText from './index';

const PreviewTextList = ({ texts }) => {

  return (
    <>
      {
        texts && Object.values(texts).length > 0 ? (Object.values(texts).map((item, index) => (<PreviewText key={index} width={item.width} height={item.height} text={item.text} colour={item.colour} fontSize={item.fontSize} fontFamily={item.fontFamily} />))) : (<></>)
      }
    </>
  );
};

export default PreviewTextList;
