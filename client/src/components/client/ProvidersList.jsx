import React, { useState, useEffect } from 'react';
import { FlexContainer } from '../../styles/styles';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { getProvidersByCategoryId } from '../../api/users';
import ProfileCard from './../../components/client/ProfileCard'
import { hideLoader, showLoader } from '../../redux/actions/appStatusActions';

const ProvidersList = ({ categoryId }) => {

  const [Providers, setProviders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setProviders([]);
    dispatch(showLoader());
    axios.get(getProvidersByCategoryId(categoryId)).then(resp => setProviders(resp.data))
    dispatch(hideLoader());
  }, [categoryId]);

  return (
    <FlexContainer>
      <StyledGrid>
        {Providers.length > 0 && (
          Providers.map(provider => (
            <ProfileCard key={provider._id} provider={provider} />
          ))
        )}
      </StyledGrid>
    </FlexContainer>

  );
}

const StyledGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

`;

export default ProvidersList;