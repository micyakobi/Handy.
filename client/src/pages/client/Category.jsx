import React, { useState, useEffect } from 'react';
import { FlexContainer, PageContainer } from '../../styles/styles';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { getProvidersByCategoryId } from '../../api/users';
import ProfileCard from './../../components/client/ProfileCard'

const Category = () => {

  const location = useLocation();
  const categoryId = decodeURI(location.pathname.split('/')[2]);
  const [Providers, setProviders] = useState([]);

  useEffect(() => {
    if (categoryId != undefined) {
      axios.get(getProvidersByCategoryId(categoryId)).then(resp => setProviders(resp.data))
    }
  }, []);

  return (
    <PageContainer>
      <FlexContainer>
        <StyledGrid>
          {Providers.length > 0 && (
            Providers.map(Providers => (
              <ProfileCard provider={Providers} />
            ))
          )}
        </StyledGrid>
      </FlexContainer>
    </PageContainer>

  );
}

const StyledGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

`;

export default Category;