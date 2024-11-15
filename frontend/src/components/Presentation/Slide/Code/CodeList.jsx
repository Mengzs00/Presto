import Code from './index';

const CodeList = ({ codes }) => {
  return (
    <>
      {
        codes && Object.values(codes).length > 0 ? (Object.values(codes).map((item, index) => (<Code key={index} width={item.width} height={item.height} code={item.code} fontSize={item.fontSize} />))) : (<></>)
      }
    </>
  );
};

export default CodeList;
