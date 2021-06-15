import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FlexContainer, PageContainer, ErrorContainer } from '../../styles/styles';
import FavoritesHandiesCard from '../../components/client/FavoritesHandiesCard';
import { useSelector, useDispatch } from 'react-redux';
import { StyledTitle } from '../../styles/styles';
import { useTheme } from '@material-ui/core';

const Favorites = () => {

  const theme = useTheme();
  const user = useSelector(state => state.user.user);
  const userId = user._id;

  const [noFavDisplay, setNoFavDisplay] = useState(false);
  useEffect(() => {
    if (user.favorites.length === 0)
      setNoFavDisplay(true);
  }, []);

  const [handies, setHandies] = useState([]);
  useEffect(() => {
    setHandies(user.favorites)
  }, [user.favorites]);

  const userD = useSelector(state => state.user);

  return (
    <PageContainer>
      <FlexContainer>
        {noFavDisplay && (
          <ErrorContainer>
            <StyledTitle color={theme.palette.common.pageTitle}>{'You have no favorites.'}</StyledTitle>
          </ErrorContainer>)}
        {handies && (
          <StyledOffer>
            {handies.length > 0 && handies.map(handy => (
              <FavoritesHandiesCard handyId={handy._id} key={handy._id} userName={handy.userName} firstName={handy.firstName}
                lastName={handy.lastName} email={handy.email} phone={handy.phone} about={handy.about} image={handy.profileImage} categories={handy.categories} />
            ))}
          </StyledOffer>
        )}

      </FlexContainer>
    </PageContainer>
  );
}

const StyledOffer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default Favorites;