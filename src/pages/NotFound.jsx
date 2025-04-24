import React from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Container,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';

// Componentes estilizados
const NotFoundContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
  textAlign: 'center',
  maxWidth: '600px',
  width: '100%'
}));

const ErrorCode = styled(Typography)(({ theme }) => ({
  fontSize: '8rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  lineHeight: 1
}));

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: 'background.default',
        p: 2
      }}
    >
      <NotFoundContainer>
        <ErrorCode variant="h1">
          404
        </ErrorCode>
        <Typography variant="h4" component="h1" gutterBottom>
          Página Não Encontrada
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Ops! A página que você está procurando não existe ou foi movida.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Voltar para o Início
        </Button>
      </NotFoundContainer>
    </Box>
  );
};

export default NotFound;
