import { useNavigate } from 'react-router-dom';
import { 
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip
} from '@mui/material';
function Presentation ({ presentation }) {
  const navigate = useNavigate();
  return (
    <>
      <Card onClick={() => navigate(`/presentation/${presentation.id}`) } sx={{ width: '300px', height: '150px', display: 'flex', cursor: 'pointer' }}>
        <CardMedia>
          <img style={{ width: '150px', height: '150px' }} src={presentation.thumbnail ? presentation.thumbnail : '/assets/imgs/default-presentation-bg.jpg'} />
        </CardMedia>
        <Box>
          <CardContent>
            <Typography gutterBottom variant='h7' component='div'>
              {presentation.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'none' }}
            >
              {presentation.description}
            </Typography>
            <Box>
              <Chip label={`Slides: ${presentation.slides ? Object.keys(presentation.slides).length : 0}`} size='small' color='primary' />
            </Box>
          </CardContent>
        </Box>
      </Card>
    </>
  );
}

export default Presentation;
