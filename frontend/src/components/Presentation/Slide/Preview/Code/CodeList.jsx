import PreviewCode from './index';

const PreviewCodeList = ({ codes }) => {
  return (
    <>
      {
        codes && Object.values(codes).length > 0 ? (Object.values(codes).map((item, index) => (<PreviewCode key={index} width={item.width} height={item.height} code={item.code} fontSize={item.fontSize} />))) : (<></>)
      }
    </>
  );
};

export default PreviewCodeList;
