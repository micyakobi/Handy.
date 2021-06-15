

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, Data } from '@react-google-maps/api';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FcSynchronize } from "react-icons/fc";
import compass from '../styles/compass.png';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserDetails } from '../redux/actions/usersActions';
import { useTheme } from '@material-ui/core/styles';
import Timer from './Timer';


const REACT_APP_GOOGLE_MAPS_API_KEY = "AIzaSyCQURpIzqLFm6Y-LJqXZ00cFh7CWo5ez18"

//----------------------------------------------------------

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
}

//----------------------------------------------------------

const GoogleMaps = ({ taskId, taskDetails, clientDetails, providerId }) => {

  const theme = useTheme();
  const dispatch = useDispatch();
  const providerDetails = useSelector(state => state.user.userDetails);
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    if (providerId != undefined) {
      dispatch(loadUserDetails(providerId));
    }
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const onMapClick = useCallback(
    () => {
      setMarkers(() => [{
        lat: Number(clientDetails.locationLat),
        lng: Number(clientDetails.locationLong),
        userName: clientDetails.userName,
        fullName: "Client: " + clientDetails.firstName + " " + clientDetails.lastName,
        time: Date()
      },
      {
        lat: Number(providerDetails.data.locationLat),
        lng: Number(providerDetails.data.locationLong),
        userName: providerDetails.data.userName,
        fullName: "Provider: " + providerDetails.data.firstName + " " + providerDetails.data.lastName,
        time: Date()
      }
      ])
    }, [providerDetails]);



  const mapRef = useRef();
  const onMapLoad = useCallback(
    (map) => {
      mapRef.current = map;
    },
    []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(9);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  const center = {
    lat: Number(user.locationLat),
    lng: Number(user.locationLong)
    // lat: (Number(clientDetails.locationLat)+Number(providerDetails.data.locationLat))/2,
    // lng: (Number(clientDetails.locationLong)+Number(providerDetails.data.locationLong))/2
  };


  //----------------------------------------------------------

  return (
    <div>

      {providerDetails && taskDetails && (
        <>
          {/* <Locate panTo={panTo} /> */}

          {providerDetails.data && clientDetails && (
            <>
              <StyledLocate >
                <Timer
                  taskId={taskId}
                  mapTime={taskDetails.mapTime}
                  providerId={providerDetails.data._id}
                  price={taskDetails.winningOffer.priceByid}
                  isReviewAvailable={clientDetails._id === user._id}
                  sourceLat={clientDetails.locationLat} sourceLong={clientDetails.locationLong}
                  destLat={providerDetails.data.locationLat} destLong={providerDetails.data.locationLong}
                />
              </StyledLocate>

              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={center}
                options={options}
                onLoad={onMapClick}
              >
                {markers.map(marker =>
                  <>
                    <Marker
                      draggable={true}
                      key={marker.time.toISOString}
                      position={{ lat: marker.lat, lng: marker.lng }}
                      icon={{
                        url: { FcSynchronize },
                        scaledSize: new window.google.maps.Size(30, 30),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                      }}
                      onClick={() => {
                        setSelected(marker);
                      }}

                    />

                    {selected ? (<InfoWindow position={{ lat: marker.lat, lng: marker.lng }}
                      onCloseClick={() => {
                        setSelected(null);
                      }}
                    >

                      <div>
                        <h2>{marker.userName}</h2>
                        <h2>{marker.fullName}</h2>
                      </div>

                    </InfoWindow>) : null}
                  </>
                )}
              </GoogleMap>
            </>
          )}
        </>
      )}
    </div>
  )
}

//--------------------------------------------------------

function Locate({ panTo }) {

  return (
    <StyledLocate
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null,
        );
      }}
    >
      <img src={compass} alt="compass" />
    </StyledLocate>
  );
}

//--------------------------------------------------------

const StyledLocate = styled(motion.button)`
  position: absolute;
  top: 5rem;//1
  left: 0.5rem;
  background: none;
  border: none;
  z-index: 10;

  img {
  width: 30px;
  cursor: pointer;
  }
  `


const StyledTitle = styled(motion.h2)`
  position:absolute;
  top:6rem;
  left:1rem;
  z-index:10;
  margin:0;
  padding:0;
  color: #00A1D6;
`;

const StyledP = styled(motion.h4)`
  position:absolute;
  top:8rem;
  left:1rem;
  z-index:10;
  margin:0;
  padding:0;
  color: #00A1D6;
`

export default GoogleMaps;

//---------------------------------------------------------

// import React from 'react';
// import {
//     withScriptjs,
//     withGoogleMap,
//     GoogleMap,
//     Marker,
//   } from "react-google-maps";


// const GoogleMaps = () => {

//     const MapWithAMarker = withScriptjs(withGoogleMap(props =>
//         <GoogleMap
//           defaultZoom={8}
//           defaultCenter={{ lat: -34.397, lng: 150.644 }}
//         >
//           <Marker
//             position={{ lat: -34.397, lng: 150.644 }}
//           />
//         </GoogleMap>
//       ));


//     return (
//         <MapWithAMarker
//         googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCQURpIzqLFm6Y-LJqXZ00cFh7CWo5ez18&v=3.exp&libraries=geometry,drawing,places"
//         loadingElement={<div style={{ height: `100%` }} />}
//         containerElement={<div style={{ height: `400px` }} />}
//         mapElement={<div style={{ height: `100%` }} />}
//       />
//     )
// }


// export default GoogleMaps