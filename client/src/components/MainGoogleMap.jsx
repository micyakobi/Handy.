import React, { useState, useRef, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import { motion } from 'framer-motion';
import compass from '../styles/compass.png';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllUsers } from '../redux/actions/usersActions';
import hi from '../styles/hi.png';
import useSupercluster from "use-supercluster";


const REACT_APP_GOOGLE_MAPS_API_KEY = "AIzaSyCQURpIzqLFm6Y-LJqXZ00cFh7CWo5ez18";
const Marker = ({ children }) => children;

const MainGoogleMAp = () => {

  const dispatch = useDispatch();
  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    dispatch(loadAllUsers());
  }, [])

  const users = useSelector(state => state.user.allUsers);
  const [usersS, setusersS] = useState([])
  useEffect(() => {
    if (users != undefined)
      setusersS(users)
  }, [users])

  const points = usersS.map(user => ({
    type: "Feature",
    properties: { cluster: false, crimeId: user._id },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(user.locationLong),
        parseFloat(user.locationLat)
      ]
    }
  }));


  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {users != undefined && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={{ lat: 32.085300, lng: 34.781769 }}
          defaultZoom={8}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
          }}
          onChange={({ zoom, bounds }) => {
            setZoom(zoom);
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat
            ]);
          }}
        >
          { clusters.map(cluster => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const {
              cluster: isCluster,
              point_count: pointCount
            } = cluster.properties;

            if (isCluster) {
              return (
                <Marker
                  key={`cluster-${cluster.id}`}
                  lat={latitude}
                  lng={longitude}
                >
                  <StyledDiv
                    style={{
                      width: `${10 + (pointCount / points.length) * 80}px`,
                      height: `${10 + (pointCount / points.length) * 80}px`
                    }}
                    onClick={() => {
                      const expansionZoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        15
                      );
                      mapRef.current.setZoom(expansionZoom);
                      mapRef.current.panTo({ lat: latitude, lng: longitude });
                    }}
                  >
                    {pointCount}
                  </StyledDiv>
                </Marker>
              );
            }

            return (
              <Marker
                key={`crime-${cluster.properties.crimeId}`}
                lat={latitude}
                lng={longitude}
              >
                <StyledButton className="crime-marker">
                  <img src={hi} alt="crime doesn't pay" />
                </StyledButton>
              </Marker>
            );
          })}
        </GoogleMapReact>
      )}
    </div>
  );
}

const StyledButton = styled(motion.button)`
  position: absolute;
  top: 7rem;//1
  right: 1rem;
  background: none;
  border: none;
  z-index: 10;

  img {
  width: 30px;
  cursor: pointer;
  }

`

const StyledDiv = styled(motion.div)`
      color: #fff;
  background: #1978c8;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`


export default MainGoogleMAp;