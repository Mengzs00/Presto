import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  Tooltip,
  Chip,
  IconButton
} from '@mui/material';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import FormatSizeOutlinedIcon from '@mui/icons-material/FormatSizeOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { http } from '../../../../util/http'
import alertStore from '../../../../store/alert';
import PresentationEdit from '../../../../components/Presentation/Edit';
import ConfirmDialog from '../../../../components/ConfirmDialog';
import Slide from '../../../../components/Presentation/Slide';
import { getUUID } from '../../../../util/uuid';
import AddTextDialog from '../../../../components/Presentation/Slide/AddTextDialog';
import AddImageDialog from '../../../../components/Presentation/Slide/AddImageDialog';
import AddVideoDialog from '../../../../components/Presentation/Slide/AddVideoDialog';
import AddCodeDialog from '../../../../components/Presentation/Slide/AddCodeDialog';
import ColorChooserDialog from '../../../../components/Presentation/Slide/ColorChooserDialog';
const PresentationDetail = () => {
  const params = useParams();
  const [presentation, setPresentation] = useState({});
  const [slides, setSlides] = useState([]);
  const [open, setOpen] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [showSlideActions, setShowSlideActions] = useState(false);
  const [position, setPosition] = useState(0);
  const [addTextOpen, setAddTextOpen] = useState(false);
  const [addImageOpen, setAddImageOpen] = useState(false);
  const [addVideoOpen, setAddVideoOpen] = useState(false);
  const [addCodeOpen, setAddCodeOpen] = useState(false);
  const [slideColorOpen, setSlideColorOpen] = useState(false);
  const navigate = useNavigate();

  const fetchStore = async () => {
    const res = await http('/store');
    console.log('presentation detail: ', res);
    if (!res.error) {
      return res.store;
    } else {
      alertStore.getState().openAlert(res.error, 'error');
      return null;
    }
  }

  const updateStore = async (store) => {
    const res = await http('/store', 'PUT', { store });
    if (!res.error) {
      return null;
    } else {
      return res.error;
    }
  }

  const fetchPresentation = useCallback(async () => {
    const store = await fetchStore();
    if (store) {
      const presentations = store.presentations;
      if (presentations && presentations[params.id]) {
        const presentation = presentations[params.id];
        if (presentation && presentation.slides && Object.keys(presentation.slides)) {
          const slideArray = Object.values(presentation.slides);
          setSlides(slideArray);
          // console.log('slideArray: ', slideArray);
          // setSlide(slides[position]);
          setShowSlideActions(true);
        }
        setPresentation(presentation);
      }
    }
  }, [params.id])

  const handleClose = () => {
    setOpen(false);
    fetchPresentation();
  }

  const handleConfirmDialogClose = () => {
    setOpenConfirmDialog(false);
  }

  const handleDeletePresentationConfirm = async () => {
    const store = await fetchStore();
    const presentations = store.presentations;
    if (presentations[params.id]) {
      delete presentations[params.id];
      store.presentations = presentations;
      const storeRes = await updateStore(store);
      if (storeRes) {
        alertStore.getState().openAlert(storeRes, 'error');
      } else {
        alertStore.getState().openAlert('Delete one presentation.', 'success');
        handleConfirmDialogClose();
        navigate('/dashboard');
      }
    }
  }

  const handleEditPresentation = () => {
    setOpen(true);
  }

  const handleAddSlide = async () => {
    const store = await fetchStore();
    if (store) {
      const presentations = store.presentations;
      const id = getUUID();
      const presentationId = params.id;
      if (presentations[presentationId].slides) {
        presentations[presentationId].slides[id] = { id };
      } else {
        presentations[presentationId].slides = {};
        presentations[presentationId].slides[id] = { id };
      }
      store.presentations = presentations;
      const returnErr = await updateStore(store);
      if (!returnErr) {
        alertStore.getState().openAlert('Add one slide.', 'success');
        fetchPresentation();
      } else {
        alertStore.getState().openAlert(returnErr, 'error');
      }
    }
  }

  const showSlideActionsDoms = () => (
    <div>
      <MenuItem onClick={() => handleDeleteSlide(position)}>
        <Tooltip title='Delete Slide'>
          <ListItemIcon sx={{ color: '#fff' }}>
            <CancelPresentationOutlinedIcon fontSize='small' />
          </ListItemIcon>
        </Tooltip>
      </MenuItem>
      <MenuItem onClick={() => setAddTextOpen(true) }>
        <Tooltip title='Add Text'>
          <ListItemIcon sx={{ color: '#fff' }}>
            <FormatSizeOutlinedIcon fontSize='small' />
          </ListItemIcon>
        </Tooltip>
      </MenuItem>
      <MenuItem onClick={() => setAddImageOpen(true) }>
        <Tooltip title='Add Image'>
          <ListItemIcon sx={{ color: '#fff' }}>
            <AddPhotoAlternateOutlinedIcon fontSize='small' />
          </ListItemIcon>
        </Tooltip>
      </MenuItem>
      <MenuItem onClick={() => setAddVideoOpen(true) }>
        <Tooltip title='Add Video'>
          <ListItemIcon sx={{ color: '#fff' }}>
            <VideoCameraBackOutlinedIcon fontSize='small' />
          </ListItemIcon>
        </Tooltip>
      </MenuItem>
      <MenuItem onClick={() => setAddCodeOpen(true) }>
        <Tooltip title='Add Code'>
          <ListItemIcon sx={{ color: '#fff' }}>
            <TerminalOutlinedIcon fontSize='small' />
          </ListItemIcon>
        </Tooltip>
      </MenuItem>
      <MenuItem onClick={() => setSlideColorOpen(true) }>
        <Tooltip title='Change Slide Background Color'>
          <ListItemIcon sx={{ color: '#fff' }}>
            <ContrastOutlinedIcon fontSize='small' />
          </ListItemIcon>
        </Tooltip>
      </MenuItem>
      <MenuItem onClick={() => navigate(`/presentation/${params.id}/slide/${slides[position].id}`) }>
        <Tooltip title='Preview'>
          <ListItemIcon sx={{ color: '#fff' }}>
            <RemoveRedEyeOutlinedIcon fontSize='small' />
          </ListItemIcon>
        </Tooltip>
      </MenuItem>
    </div>
  );

  const handleDeleteSlide = async (position) => {
    const store = await fetchStore();
    if (store) {
      const presentations = store.presentations;
      const pId = params.id;
      if (presentations[pId]) {
        const newSlides = slides;
        if (newSlides.length === 1) {
          alertStore.getState().openAlert('There just be one slide obly', 'warning');
          return;
        }
        newSlides.splice(position, 1);
        setSlides(newSlides);
        if (newSlides.length) {
          const updatingSlides = {};
          for (const slide of newSlides) {
            updatingSlides[slide.id] = slide;
          }
          presentations[pId].slides = updatingSlides;
        }
        store.presentations = presentations;
        const storeRes = await updateStore(store);
        if (storeRes) {
          alertStore.getState().openAlert(storeRes, 'error');
        } else {
          alertStore.getState().openAlert('Delete one slide.', 'success');
          fetchPresentation();
        }
      }
    }
  }

  const handlePreSlide = () => {
    if (position >= 1) {
      const newPos = position - 1;
      setPosition(newPos);
      fetchPresentation();
    }
  }

  const handleNextSlide = () => {
    if (position < slides.length - 1) {
      const newPos = position + 1;
      setPosition(newPos);
      fetchPresentation();
    }
  }

  const handleAddTextClose = () => {
    setAddTextOpen(false);
    fetchPresentation();
  }

  const handleAddImageClose = () => {
    setAddImageOpen(false);
    fetchPresentation();
  }

  const handleAddVideoClose = () => {
    setAddVideoOpen(false);
    fetchPresentation();
  }

  const handleAddCodeClose = () => {
    setAddCodeOpen(false);
    fetchPresentation();
  }

  const handleSlideColorClose = () => {
    setSlideColorOpen(false);
  }

  const handleChangeColor = async (color) => {
    const store = await fetchStore();
    if (store) {
      const presentations = store.presentations;
      const slides = Object.values(presentations[params.id].slides);
      if (slides && slides.length) {
        slides[position].background = color;
        const newSlides = {};
        for (const s of slides) {
          newSlides[s.id] = s;
        }
        presentations[params.id].slides = newSlides;
      }
      store.presentations = presentations;
      const returnRes = await updateStore(store);
      if (!returnRes) {
        alertStore.getState().openAlert('Update slide background theme', 'success');
        fetchPresentation();
      } else {
        alertStore.getState().openAlert(returnRes, 'error');
      }
      handleSlideColorClose();
    }
  }

  const handleChangeFontFamlityFinish = () => {
    fetchPresentation();
  }

  useEffect(() => {
    fetchPresentation();
  }, [showSlideActions, position, fetchPresentation]);

  return (
    <Box>
      <PresentationEdit id={presentation.id} open={open} handleClose={handleClose} />
      <ConfirmDialog title="Delete confirmation" content="Are you sure to delete this presentation ?" open={openConfirmDialog} handleClose={handleConfirmDialogClose} handleConfirm={handleDeletePresentationConfirm} />
      <AddTextDialog open={addTextOpen} handleClose={handleAddTextClose} presentationId={params.id} slideId={slides[position]?.id} />
      <AddImageDialog open={addImageOpen} handleClose={handleAddImageClose} presentationId={params.id} slideId={slides[position]?.id} />
      <AddVideoDialog open={addVideoOpen} handleClose={handleAddVideoClose} presentationId={params.id} slideId={slides[position]?.id} />
      <AddCodeDialog open={addCodeOpen} handleClose={handleAddCodeClose} presentationId={params.id} slideId={slides[position]?.id} />
      <ColorChooserDialog open={slideColorOpen} handleClose={handleSlideColorClose} handleChangeColor={handleChangeColor} />
      <Box>
        <Typography variant='h3' gutterBottom>
          {presentation.name}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '.5rem' }}>
        <Paper sx={{ width: '100%', border: '2px dashed #efefef' }}>
          {
            slides.length > 0 ? (<Slide handleChangeFontFamlityFinish={handleChangeFontFamlityFinish} presentationId={params.id} slide={slides[position]} />) : (<></>)
          }
        </Paper>
        <Paper sx={{ width: 60, maxWidth: '100%', background: '#1976d2' }}>
          <MenuList>
            <MenuItem onClick={() => navigate('/dashboard') }>
              <Tooltip title='Go back'>
                <ListItemIcon sx={{ color: '#fff' }}>
                  <KeyboardBackspaceOutlinedIcon fontSize='small' />
                </ListItemIcon>
              </Tooltip>
            </MenuItem>
            <MenuItem onClick={handleEditPresentation}>
              <Tooltip title='Edit presentation'>
                <ListItemIcon sx={{ color: '#fff' }}>
                  <EditOutlinedIcon fontSize='small' />
                </ListItemIcon>
              </Tooltip>
            </MenuItem>
            <MenuItem onClick={() => setOpenConfirmDialog(true) }>
              <Tooltip title='Delete presentation'>
                <ListItemIcon sx={{ color: '#fff' }}>
                  <DeleteOutlineOutlinedIcon fontSize='small' />
                </ListItemIcon>
              </Tooltip>
            </MenuItem>
            <MenuItem onClick={ handleAddSlide }>
              <Tooltip title='Add Slide'>
                <ListItemIcon sx={{ color: '#fff' }}>
                  <NoteAddOutlinedIcon fontSize='small' />
                </ListItemIcon>
              </Tooltip>
            </MenuItem>
            { showSlideActions ? showSlideActionsDoms() : (<div></div>) }
          </MenuList>
        </Paper>
      </Box>
      <Box sx={{ display: 'flex', mt: 3 }}>
        <Chip sx={{ fontSize: '1em', width: '50px', height: '50px' }} label={slides.length} color="primary" />
        <IconButton onClick={handlePreSlide} disabled={position === 0} size='small' sx={{ ml: '22px' }} variant='outlined' color='primary'>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton onClick={handleNextSlide} disabled={position === slides.length - 1 || slides.length === 0} size='small' sx={{ ml: '22px' }} variant='outlined' color='primary'>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PresentationDetail;
