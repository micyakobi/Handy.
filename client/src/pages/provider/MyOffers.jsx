import React, { useState, useEffect } from "react";
import { FlexContainer, ErrorContainer, PageContainer } from "../../styles/styles";
import styled from "styled-components";
import { motion } from "framer-motion";
import { StyledLink } from "../../styles/styles";
import MyOffersOfferCard from "../../components/provider/MyOffersOfferCard";
import { useSelector, useDispatch } from "react-redux";
import { loadMyOffers } from "../../redux/actions/offersActions";
import { StyledTitle } from "../../styles/styles";
import { useTheme } from "@material-ui/core";

const MyOffers = () => {
  const theme = useTheme();
  const myOffers = useSelector((state) => state.offers.myOffers);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.appStatus.showLoader);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    if (user._id != undefined) {
    async function doSomething() {
    dispatch(loadMyOffers(user._id));
    }
    doSomething();
  }
  }, [user.offers]);

  useEffect(()=>{
    setOffers(myOffers);
  },[myOffers]);

  return (
    <PageContainer>
      <FlexContainer>
        {offers && offers.length > 0 && !isLoading && (
          <StyledOffer>
            {offers.length > 0 &&
              offers.map((offer) => (
                <StyledLink key={offer._id} to={`/TaskDetails/${offer.task._id}`}>
                  <MyOffersOfferCard offer={offer} />
                </StyledLink>
              ))}
          </StyledOffer>
        )}
        {offers && !offers.length && !isLoading && (
          <ErrorContainer>
            <StyledTitle color={theme.palette.common.pageTitle}>{'You have no offers.'}</StyledTitle>
          </ErrorContainer>
        )}
      </FlexContainer>
    </PageContainer>
  );
};

const StyledOffer = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

`;

export default MyOffers;
