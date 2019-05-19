import svgServiceCook from './assets/images/service_cook.svg';
import svgServicePlumber from './assets/images/service_plumber.svg';
import svgServiceElectrician from './assets/images/service_electrician.svg';
import svgServiceHousekeeper from './assets/images/service_housekeeper.svg';
import svgServiceGardener from './assets/images/service_gardener.svg';


export const LOCATION_UNDEFINED = {
  lat: undefined,
  lng: undefined
};

export const MAP_INITIAL_POSITION = {
  lat: 53.908316,
  lng: 27.574650
};


export const TASK_SERVICES =
  [
    {
      _id: 'Electrician',
      title: 'Electrician',
      image: svgServiceElectrician,
      types: [
        {
          _id: 'Electrician1',
          title: 'Change light bulb'
        },
        {
          _id: 'Electrician2',
          title: 'Fix electrical wiring'
        }
      ]
    },
    {
      _id: 'Plumber',
      title: 'Plumber',
      image: svgServicePlumber,
      types: [
        {
          _id: 'Plumber1',
          title: 'Unblock a toilet'
        },
        {
          _id: 'Plumber2',
          title: 'Unblock a sink'
        },
        {
          _id: 'Plumber3',
          title: 'Fix a water leak'
        },
        {
          _id: 'Plumber4',
          title: 'Install a sink'
        },
        {
          _id: 'Plumber5',
          title: 'Install a shower'
        },
        {
          _id: 'Plumber6',
          title: 'Install a toilet'
        }
      ]
    },
    {
      _id: 'Gardener',
      title: 'Gardener',
      image: svgServiceGardener,
      types: [
        {
          _id: 'Gardener1',
          title: 'Mow the lawn'
        },
        {
          _id: 'Gardener2',
          title: 'Water flowers'
        },
      ]
    },
    {
      _id: 'Housekeeper',
      title: 'Housekeeper',
      image: svgServiceHousekeeper,
      types: [
        {
          _id: 'Housekeeper1',
          title: 'Vacuum the floor'
        },
        {
          _id: 'Housekeeper2',
          title: 'Throw out the trash'
        },
      ]
    },
    {
      _id: 'Cook',
      title: 'Cook',
      image: svgServiceCook,
      types: [
        {
          _id: 'Cook1',
          title: 'Cook cake'
        },
        {
          _id: 'Cook2',
          title: 'Cook lasagna'
        },
      ]
    }
  ];
