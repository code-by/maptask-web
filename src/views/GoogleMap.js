import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import {
  compose,
  withHandlers,
  withStateHandlers,
  lifecycle
} from 'recompose';

import svgMarker from '../assets/images/mapmarker.svg';

import { setMapAddress } from '../redux/actions';
import { getTaskById } from '../selectors';

import { LOCATION_UNDEFINED, MAP_INITIAL_POSITION } from '../constants';
import { GOOGLE_MAP_API_KEY } from '../Config';


const MarkerImage = () =>
  <div
    className="MapMarker"
  >
    <img
      src={svgMarker} alt="" width={53} height={67}
    />
  </div>
;

// TODO:
// center map to location from selected task

const GoogleMap = ({
  onMapClick,
  mapCenter,
  markerCoordinates,
}) => (
  <div style={{ width: '100%', height: 'inherit' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }}
      defaultCenter={MAP_INITIAL_POSITION}
      location={mapCenter}
      defaultZoom={16}
      options={{
        disableDefaultUI: true,
      }}
      onClick={onMapClick}
    >
      {
        markerCoordinates.lng && (
          <MarkerImage
            {...markerCoordinates}
            anchor={{ x: 25, y: 25 }}
          />
        )
      }
    </GoogleMapReact>
  </div>
);


GoogleMap.propTypes = {
  onMapClick: PropTypes.func.isRequired,
  markerCoordinates: PropTypes.objectOf(PropTypes.any).isRequired,
};


const mapStateToProps = (state) => ({
  editMode: state.editMode,
  tasks: state.tasks,
  selectedTaskId: state.selectedTaskId,
});

const mapDispatchToProps = ({
  setMapAddressAction: setMapAddress
});


const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(
    () => ({
      markerCoordinates: LOCATION_UNDEFINED,
      mapCenter: MAP_INITIAL_POSITION,
      updaterId: undefined,
    }),
    {
      setMarkerCoordinates: () => (markerCoordinates) => ({ markerCoordinates }),
      setCoordinatesExternal: () => (id, markerCoordinates) => ({
        updaterId: id,
        markerCoordinates,
        mapCenter: markerCoordinates
      }),
    }
  ),
  withHandlers({
    onMapClick: ({ setMapAddressAction, setMarkerCoordinates, editMode }) => ({ lat, lng }) => {
      if (editMode) {
        const geocoder = new window.google.maps.Geocoder();
        const markerCoordinates = { lat, lng };
        setMarkerCoordinates(markerCoordinates);
        geocoder.geocode({'location': markerCoordinates}, function (results, status) {
          if (status === 'OK') {
            if (results.length > 0 && results[0].formatted_address) {
              setMapAddressAction({
                address: results[0].formatted_address,
                lat,
                lng
              })
            } else {
              console.log('Geolocation didn\'t find any address for selected location');
            }
          } else {
            console.log('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
    },
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (nextProps) {
        if (nextProps.selectedTaskId !== this.props.updaterId) {
          const selectedTask = getTaskById(this.props.tasks, nextProps.selectedTaskId);
          if (selectedTask && selectedTask._id) {
            this.props.setCoordinatesExternal(nextProps.selectedTaskId, selectedTask.location);
          }
        }
      }
    }
  }),
);


export default enhancer(GoogleMap);
