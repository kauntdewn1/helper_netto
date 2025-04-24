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
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  PersonAdd as PersonAddIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Componentes estilizados
const RegisterContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
  maxWidth: '600px',
  width: '100%'
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(4)
}));

const steps = ['Informações Pessoais', 'Credenciais', 'Preferências'];

const Register = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Formulário
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    password: '',
    confirmPassword: '',
    notifications: true,
    marketingEmails: false
  });
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleNext = () => {
    if (activeStep === 0) {
      // Validar primeiro passo
      if (!formData.firstName || !formData.lastName || !formData.email) {
        setError('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Por favor, insira um email válido.');
        return;
      }
    } else if (activeStep === 1) {
      // Validar segundo passo
      if (!formData.password || !formData.confirmPassword) {
        setError('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      // Validar senha
      if (formData.password.length < 8) {
        setError('A senha deve ter pelo menos 8 caracteres.');
        return;
      }
      // Validar confirmação de senha
      if (formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem.');
        return;
      }
    }
    
    setError('');
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setError('');
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulação de registro
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 2000);
  };
  
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="firstName"
                label="Nome"
                name="firstName"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Sobrenome"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="phone"
                label="Telefone"
                name="phone"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="company"
                label="Empresa"
                name="company"
                autoComplete="organization"
                value={formData.company}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="position"
                label="Cargo"
                name="position"
                autoComplete="organization-title"
                value={formData.position}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirmar Senha"
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                A senha deve ter pelo menos 8 caracteres e incluir letras, números e caracteres especiais.
              </Typography>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Termos e Condições
              </Typography>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  maxHeight: '200px', 
                  overflow: 'auto',
                  mb: 2
                }}
              >
                <Typography variant="body2">
                  Ao criar uma conta na IA Assistente FlowOFF, você concorda com nossos Termos de Serviço e Política de Privacidade. Nós respeitamos sua privacidade e protegemos seus dados pessoais de acordo com as leis aplicáveis.
                  
                  A IA Assistente FlowOFF é uma ferramenta projetada para auxiliar em tarefas de gestão, comunicação e geração de conteúdo. Ao utilizar nossos serviços, você concorda em não usar a plataforma para fins ilegais ou prejudiciais.
                  
                  Você é responsável por manter a confidencialidade de sua senha e por todas as atividades que ocorrem em sua conta. Notifique-nos imediatamente sobre qualquer uso não autorizado de sua conta.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Ao clicar em "Registrar", você concorda com nossos Termos de Serviço e Política de Privacidade.
              </Typography>
            </Grid>
          </Grid>
        );
      default:
        return 'Passo desconhecido';
    }
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
      <RegisterContainer>
        <LogoContainer>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            FlowOFF IA
          </Typography>
        </LogoContainer>
        
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Criar Conta
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Registre-se para acessar a IA Assistente FlowOFF
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          {renderStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
            >
              Voltar
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                startIcon={<PersonAddIcon />}
              >
                {loading ? 'Registrando...' : 'Registrar'}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                endIcon={<ArrowForwardIcon />}
              >
                Próximo
              </Button>
            )}
          </Box>
        </form>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            Já tem uma conta?{' '}
            <Link href="/login" variant="body2">
              Entrar
            </Link>
          </Typography>
        </Box>
      </RegisterContainer>
    </Box>
  );
};

export default Register;
