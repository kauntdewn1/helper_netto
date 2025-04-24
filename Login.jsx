import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  TextField,
  Button,
  Link,
  Grid,
  Divider,
  InputAdornment,
  IconButton,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Login as LoginIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Componentes estilizados
const LoginContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
  maxWidth: '450px',
  width: '100%'
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(4)
}));

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulação de login
    setTimeout(() => {
      if (email === 'netto@flowoff.xyz' && password === 'senha123') {
        onLogin();
        navigate('/');
      } else {
        setError('Email ou senha inválidos. Tente novamente.');
      }
      setLoading(false);
    }, 1500);
  };
  
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
      <LoginContainer>
        <LogoContainer>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            FlowOFF IA
          </Typography>
        </LogoContainer>
        
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Entrar
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Acesse sua conta para continuar
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ mb: 3 }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            startIcon={<LoginIcon />}
            sx={{ mb: 2 }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
          
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Link href="#" variant="body2">
              Esqueceu sua senha?
            </Link>
          </Box>
          
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              OU
            </Typography>
          </Divider>
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Não tem uma conta?{' '}
              <Link href="/register" variant="body2">
                Registre-se
              </Link>
            </Typography>
          </Box>
        </form>
      </LoginContainer>
    </Box>
  );
};

export default Login;
