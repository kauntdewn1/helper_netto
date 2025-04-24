import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Tabs,
  Tab,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Sync as SyncIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  Check as CheckIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Telegram as TelegramIcon,
  WhatsApp as WhatsAppIcon,
  Google as GoogleIcon,
  Save as SaveIcon
} from '@mui/icons-material';

// Componentes estilizados
const SettingsContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
  height: 'calc(100vh - 180px)',
  overflow: 'auto'
}));

const IntegrationCard = styled(Card)(({ theme, connected }) => ({
  backgroundColor: connected ? alpha(theme.palette.success.main, 0.1) : theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: connected ? `1px solid ${theme.palette.success.main}` : `1px solid ${theme.palette.divider}`,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)'
  }
}));

// Função auxiliar para alpha
const alpha = (color, opacity) => {
  return color + opacity.toString(16).padStart(2, '0');
};

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      taskReminders: true,
      eventReminders: true,
      marketingUpdates: false
    },
    privacy: {
      shareData: false,
      allowAnalytics: true
    },
    appearance: {
      darkMode: true,
      compactView: false
    },
    integrations: {
      telegram: true,
      whatsapp: true,
      googleCalendar: true,
      notion: false
    }
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleSettingChange = (category, setting) => (event) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: event.target.checked
      }
    });
  };
  
  const handleSaveSettings = () => {
    // Simulação de salvamento
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };
  
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  return (
    <Box sx={{ flexGrow: 1, py: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Configurações
      </Typography>
      
      <SettingsContainer>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="settings tabs">
            <Tab icon={<PersonIcon />} label="Perfil" />
            <Tab icon={<NotificationsIcon />} label="Notificações" />
            <Tab icon={<SecurityIcon />} label="Privacidade" />
            <Tab icon={<SyncIcon />} label="Integrações" />
            <Tab icon={<PaletteIcon />} label="Aparência" />
          </Tabs>
        </Box>
        
        {saveSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Configurações salvas com sucesso!
          </Alert>
        )}
        
        {/* Perfil */}
        {tabValue === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    mb: 2,
                    bgcolor: 'primary.main',
                    fontSize: '3rem'
                  }}
                >
                  NM
                </Avatar>
                <Button variant="outlined" size="small">
                  Alterar foto
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Informações Pessoais
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nome"
                    variant="outlined"
                    defaultValue="Netto"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Sobrenome"
                    variant="outlined"
                    defaultValue="Mello"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    defaultValue="netto@flowoff.xyz"
                    type="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Telefone"
                    variant="outlined"
                    defaultValue="+55 (11) 99999-9999"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cargo"
                    variant="outlined"
                    defaultValue="CEO & Head"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Empresa"
                    variant="outlined"
                    defaultValue="FlowOFF"
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Alterar Senha
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Senha Atual"
                      variant="outlined"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nova Senha"
                      variant="outlined"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Confirmar Nova Senha"
                      variant="outlined"
                      type="password"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveSettings}
                >
                  Salvar Alterações
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
        
        {/* Notificações */}
        {tabValue === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Canais de Notificação
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Notificações por Email" 
                    secondary="Receba atualizações importantes por email"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.email}
                      onChange={handleSettingChange('notifications', 'email')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Notificações Push" 
                    secondary="Receba notificações no navegador"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.push}
                      onChange={handleSettingChange('notifications', 'push')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Notificações por SMS" 
                    secondary="Receba alertas importantes por SMS"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.sms}
                      onChange={handleSettingChange('notifications', 'sms')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Tipos de Notificação
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Lembretes de Tarefas" 
                    secondary="Receba lembretes sobre tarefas próximas do prazo"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.taskReminders}
                      onChange={handleSettingChange('notifications', 'taskReminders')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Lembretes de Eventos" 
                    secondary="Receba lembretes sobre eventos agendados"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.eventReminders}
                      onChange={handleSettingChange('notifications', 'eventReminders')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Atualizações de Marketing" 
                    secondary="Receba novidades sobre produtos e serviços"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.marketingUpdates}
                      onChange={handleSettingChange('notifications', 'marketingUpdates')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveSettings}
                >
                  Salvar Alterações
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
        
        {/* Privacidade */}
        {tabValue === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Configurações de Privacidade
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Compartilhamento de Dados" 
                    secondary="Permitir compartilhamento de dados anônimos para melhorar o serviço"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.privacy.shareData}
                      onChange={handleSettingChange('privacy', 'shareData')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Analytics" 
                    secondary="Permitir coleta de dados de uso para análise"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.privacy.allowAnalytics}
                      onChange={handleSettingChange('privacy', 'allowAnalytics')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Gerenciamento de Conta
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <DeleteIcon color="error" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Excluir Conta" 
                    secondary="Excluir permanentemente sua conta e todos os dados associados"
                    primaryTypographyProps={{ color: 'error' }}
                  />
                  <ListItemSecondaryAction>
                    <Button 
                      variant="outlined" 
                      color="error"
                      size="small"
                      onClick={handleOpenDialog}
                    >
                      Excluir
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveSettings}
                >
     
(Content truncated due to size limit. Use line ranges to read in chunks)