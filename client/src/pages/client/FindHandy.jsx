import React, { useEffect, useState } from "react";
import { FlexContainer, PageContainer, StyledDescription } from "../../styles/styles";
import ServiceCategoryList from "../../components/client/ServiceCategoryList";
import { useHistory } from "react-router-dom";
import { loadAllCategories } from "../../redux/actions/categoriesActions";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useTheme } from "@material-ui/core";
import ProvidersList from '../../components/client/ProvidersList';

const FindHandy = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllCategories());
  }, [dispatch]);

  const theme = useTheme();
  const history = useHistory();
  const allCategories = useSelector((state) => state.categories.allCategories);
  const [chosenCategory, setChosenCategory] = useState(null)

  const handleCategoryClick = (category) => {
    setChosenCategory(category);
  };

  return (
    <PageContainer>
      <FlexContainer>
        <DescriptionContainer>
          <StyledDescription color={theme.palette.common.pageTitle}>
            {`Looking for something specific?`}
          </StyledDescription>
          <StyledDescription color={theme.palette.common.pageTitle}>
            {`Check out our categories!`}
          </StyledDescription>
        </DescriptionContainer>
        <ServiceCategoryList
          categories={allCategories}
          onCategoryClick={handleCategoryClick}
        />
        {chosenCategory && (
          <ProvidersList categoryId={chosenCategory._id} />
        )}
      </FlexContainer>
    </PageContainer>
  );
};

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  margin: 1rem 0;
`;



export default FindHandy;
