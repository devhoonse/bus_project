import React from 'react';
import { connect } from 'react-redux';

import Home from '../components/Home';
import { getArrival } from '../redux/home';


const { useEffect } = React;


const HomeContainerSkeleton = ({ arrival, loadingArrival, getArrival }) => {

  useEffect(() => {
    const fn = async () => {
      try {
        await getArrival({ station_id: 'station_id_hardcoded', bus_id: 'bus_id_hardcoded'});
      } catch (error) {
        console.log(error);
      }
    };
    fn();

  }, [getArrival]);

  return (
    <Home arrival={arrival}
          loadingArrival={loadingArrival}
    />
  );
};


const makeContainer = connect(
  ({ home, loading }) => ({
    arrival: home.arrival,
    loadingArrival: loading['home/GET_ARRIVAL'],
  }),
  {
    getArrival,
  }
);
const HomeContainer = makeContainer(HomeContainerSkeleton);

export default HomeContainer;