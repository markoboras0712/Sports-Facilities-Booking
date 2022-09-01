type FacilityType = 'Indoor' | 'Outdoor';

export interface PopularSport {
  image: string;
  name: string;
  address: string;
  facilityType: FacilityType;
  price: number;
}

export const popularCards: PopularSport[] = [
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/Srednjo%C5%A1kolsko_igrali%C5%A1te.jpg',
    name: 'Sokol Centar',
    address: 'Ul. Kralja Zvonimira 5',
    facilityType: 'Indoor',
    price: 300,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/Srednjo%C5%A1kolsko_igrali%C5%A1te.jpg',
    name: 'Dvorana Gradski vrt',
    address: 'Ul. Kneza Trpimira 23',
    facilityType: 'Indoor',
    price: 200,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/Srednjo%C5%A1kolsko_igrali%C5%A1te.jpg',
    name: 'Sportska dvorana Jug',
    address: 'Ul. Kralja Petra Svačića 6',
    facilityType: 'Indoor',
    price: 180,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/Srednjo%C5%A1kolsko_igrali%C5%A1te.jpg',
    name: 'Srednjoškolsko igralište',
    address: 'Istarska ulica',
    facilityType: 'Outdoor',
    price: 0,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/Srednjo%C5%A1kolsko_igrali%C5%A1te.jpg',
    name: 'Dvorana Gradski vrt',
    address: 'Ul. Kneza Trpimira 23',
    facilityType: 'Indoor',
    price: 200,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/Srednjo%C5%A1kolsko_igrali%C5%A1te.jpg',
    name: 'Sportska dvorana Jug',
    address: 'Ul. Kralja Petra Svačića 6',
    facilityType: 'Indoor',
    price: 180,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/Srednjo%C5%A1kolsko_igrali%C5%A1te.jpg',
    name: 'Srednjoškolsko igralište',
    address: 'Istarska ulica',
    facilityType: 'Outdoor',
    price: 0,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/Srednjo%C5%A1kolsko_igrali%C5%A1te.jpg',
    name: 'Dvorana Gradski vrt',
    address: 'Ul. Kneza Trpimira 23',
    facilityType: 'Indoor',
    price: 200,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/Srednjo%C5%A1kolsko_igrali%C5%A1te.jpg',
    name: 'Sportska dvorana Jug',
    address: 'Ul. Kralja Petra Svačića 6',
    facilityType: 'Indoor',
    price: 180,
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/Srednjo%C5%A1kolsko_igrali%C5%A1te.jpg',
    name: 'Srednjoškolsko igralište',
    address: 'Istarska ulica',
    facilityType: 'Outdoor',
    price: 0,
  },
];
