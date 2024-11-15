import { useState, useEffect } from 'react';
import Text from './index';
import FontChooserDialog from '../FontChooserDialog';

const TextList = ({ texts, presentationId, slideId, handleChangeFontFamlityFinish }) => {
  const [open, setOpen] = useState(false);
  const [textId, setTextId] = useState('');
  useEffect(() => {
  }, [textId]);

  const handleChangeFontFamlity = (id) => {
    setTextId(id);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  return (
    <>
      <FontChooserDialog handleChangeFontFamlityFinish={handleChangeFontFamlityFinish} presentationId={presentationId} slideId={slideId} textId={textId} open={open} handleClose={handleClose} />
      {
        texts && Object.values(texts).length > 0 ? (Object.values(texts).map((item, index) => (<Text key={index} id={item.id} width={item.width} height={item.height} text={item.text} colour={item.colour} fontSize={item.fontSize} fontFamily={item.fontFamily} handleChangeFontFamlity={handleChangeFontFamlity} />))) : (<></>)
      }
    </>
  );
};

export default TextList;
