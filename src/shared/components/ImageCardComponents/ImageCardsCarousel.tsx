import { Paper } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { useDeviceSizes } from 'shared/hooks';

interface Props {
  imageUrls?: string[];
}

export const ImageCardsCarousel: React.FC<Props> = ({ imageUrls }) => {
  const { mobile } = useDeviceSizes();
  return (
    <Carousel
      height={'300px'}
      sx={{
        width: '100%',
        height: '300px',
        maxHeight: '300px',
      }}
    >
      {imageUrls ? (
        imageUrls.map((url, i) => (
          <Paper key={i}>
            <img
              src={url}
              width={'100%'}
              height={mobile ? '400px' : '100%'}
              loading="lazy"
            />
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
};
