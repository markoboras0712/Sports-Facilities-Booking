import { Paper } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';

interface Props {
  imageUrls?: string[];
}

export const ImageCardsCarousel: React.FC<Props> = ({ imageUrls }) => (
  <Carousel sx={{ height: '250px', width: '400' }}>
    {imageUrls ? (
      imageUrls.map((url, i) => (
        <Paper key={i}>
          <img src={url} width={'100%'} loading="lazy" />
        </Paper>
      ))
    ) : (
      <Paper>
        <img
          src={'https://source.unsplash.com/random'}
          height={'200px'}
          width={'100%'}
        />
      </Paper>
    )}
  </Carousel>
);
