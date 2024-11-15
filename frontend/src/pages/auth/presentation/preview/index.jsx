import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  IconButton
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { http } from '../../../../util/http';
import alertStore from '../../../../store/alert';
import SlidePreview from '../../../../components/Presentation/Slide/Preview';
const PresentationPreview = () => {
  const [slides, setSlides] = useState([]);
  const [position, setPosition] = useState(0);
  const { presentationId } = useParams();
  const navigate = useNavigate();

  const fetchStore = async () => {
    const res = await http('/store');
    if (!res.error) {
      return res.store;
    } else {
      alertStore.getState().openAlert(res.error, 'error');
      return null;
    }
  }

  const fetchSlide = useCallback(async () => {
    const store = await fetchStore();
    if (store) {
      const presentations = store.presentations;
      const presentation = presentations[presentationId];
      const slideArray = Object.values(presentation.slides);
      setSlides(slideArray);
    }
  }, [presentationId]);

  const handlePre = () => {
    if (position >= 1) {
      // fetchSlide();
      const newPos = position - 1;
      setPosition(newPos);
      const slide = slides[newPos];
      // console.log('slide....: ', slide);
      navigate(`/presentation/${presentationId}/slide/${slide.id}`);
    }
  }

  const handleNext = () => {
    if (position < slides.length - 1) {
      // fetchSlide();
      const newPos = position + 1;
      setPosition(newPos);
      const slide = slides[newPos];
      navigate(`/presentation/${presentationId}/slide/${slide.id}`);
    }
  }

  useEffect(() => {
    fetchSlide();
  }, [fetchSlide]);

  return (
    <Box>
      <Paper sx={{ width: '100%', height: '80vh' }}>
        {
          slides.length > 0 ? (<SlidePreview slide={slides[position]} />) : (<></>)
        }
      </Paper>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <IconButton onClick={handlePre} disabled={position === 0} variant='outlined' color='primary' size='small'><ArrowBackIosIcon /></IconButton>
        <IconButton onClick={handleNext} disabled={slides.length === 0 || position === slides.length - 1} variant='outlined' color='primary' size='small'><ArrowForwardIosIcon /></IconButton>
      </Box>
    </Box>
  );
};

export default PresentationPreview;
