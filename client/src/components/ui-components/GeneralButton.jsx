import React from 'react';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
import styled from 'styled-components';

const GeneralButton = ({ Icon, label, style, onClick }) => {
  const theme = useTheme();

  const handleClick = () => {
    onClick();
  }

  return (
    <StyledButton
      variant="outlined"
      color="primary"
      theme={theme}
      startIcon={<Icon />}
      style={style}
      onClick={handleClick}
    >
      {label}
    </StyledButton>
  );
}

const StyledButton = styled(Button)`
  margin: ${props => props.theme.spacing(1)};
  border-radius: 2rem;
`;

export default GeneralButton;
