import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Box, 
  Divider, 
  Typography, 
  IconButton,
  Avatar
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  Chat as ChatIcon,
  Task as TaskIcon,
  CalendarMonth as CalendarIcon,
  ContentPaste as ContentIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 260;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Chat com IA', icon: <ChatIcon />, path: '/chat' },
  { text: 'Tarefas', icon: <TaskIcon />, path: '/tasks' },
  { text: 'Calendário', icon: <CalendarIcon />, path: '/calendar' },
  { text: 'Geração de Conteúdo', icon: <ContentIcon />, path: '/content' },
  { text: 'Configurações', icon: <SettingsIcon />, path: '/settings' },
];

const Sidebar = ({ open, onClose, onLogout, variant = 'permanent' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigation = (path) => {
    navigate(path);
    if (variant === 'temporary') {
      onClose();
    }
  };

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            FlowOFF IA
          </Typography>
        </Box>
        {variant === 'temporary' && (
          <IconButton onClick={onClose}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>
      
      <Divider />
      
      <List sx={{ flexGrow: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            selected={location.pathname === item.path}
            sx={{
              mb: 1,
              mx: 1,
              borderRadius: 1,
              '&.Mui-selected': {
                backgroundColor: 'rgba(255, 0, 102, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 0, 102, 0.2)',
                },
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            <ListItemIcon sx={{ 
              color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
              minWidth: 40
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ 
                fontWeight: location.pathname === item.path ? 'medium' : 'regular',
                color: location.pathname === item.path ? 'primary.main' : 'text.primary'
              }}
            />
          </ListItem>
        ))}
      </List>
      
      <Divider />
      
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>NM</Avatar>
          <Box>
            <Typography variant="subtitle2">Netto Mello</Typography>
            <Typography variant="body2" color="text.secondary">CEO & Head</Typography>
          </Box>
        </Box>
        
        <ListItem 
          button 
          onClick={onLogout}
          sx={{
            borderRadius: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 51, 51, 0.1)',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'error.main', minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Sair" 
            primaryTypographyProps={{ color: 'error.main' }}
          />
        </ListItem>
      </Box>
    </>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {content}
    </Drawer>
  );
};

export default Sidebar;
