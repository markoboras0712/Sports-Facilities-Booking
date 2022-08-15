/* eslint-disable @typescript-eslint/ban-types */
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import PoolIcon from '@mui/icons-material/Pool';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';

export interface Sport {
  name: string;
  SportIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
}

export const suggestedSports: Sport[] = [
  {
    name: 'Football',
    SportIcon: SportsSoccerIcon,
  },
  {
    name: 'Fitness',
    SportIcon: FitnessCenterIcon,
  },
  {
    name: 'Basketball',
    SportIcon: SportsBasketballIcon,
  },
  {
    name: 'Swimming',
    SportIcon: PoolIcon,
  },
  {
    name: 'Tennis',
    SportIcon: SportsTennisIcon,
  },
];
