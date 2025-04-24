import React from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Avatar,
  Chip
} from '@mui/material';
import { 
  Task as TaskIcon,
  Event as EventIcon,
  Message as MessageIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Componente de gráfico estilizado (simulado)
const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: 240,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
}));

// Dados simulados
const upcomingTasks = [
  { id: 1, title: 'Revisar estratégia de marketing', priority: 'high', dueDate: '2025-04-18' },
  { id: 2, title: 'Preparar apresentação para cliente', priority: 'medium', dueDate: '2025-04-19' },
  { id: 3, title: 'Analisar métricas da campanha', priority: 'low', dueDate: '2025-04-20' },
];

const upcomingEvents = [
  { id: 1, title: 'Reunião com equipe de design', time: '14:00', date: '2025-04-18' },
  { id: 2, title: 'Call com cliente potencial', time: '16:30', date: '2025-04-18' },
  { id: 3, title: 'Workshop de estratégia', time: '10:00', date: '2025-04-19' },
];

const recentMessages = [
  { id: 1, sender: 'João Silva', content: 'Precisamos revisar os números da última campanha', time: '10:23', unread: true },
  { id: 2, sender: 'Maria Oliveira', content: 'Enviei os materiais que você solicitou', time: '09:45', unread: false },
  { id: 3, sender: 'Carlos Mendes', content: 'Podemos marcar uma reunião para amanhã?', time: 'Ontem', unread: true },
];

const notifications = [
  { id: 1, content: 'Reunião em 30 minutos', type: 'event' },
  { id: 2, content: 'Prazo da tarefa "Revisar estratégia" amanhã', type: 'task' },
  { id: 3, content: '3 mensagens não lidas', type: 'message' },
];

// Componente de prioridade
const PriorityChip = ({ priority }) => {
  const colors = {
    high: 'error',
    medium: 'warning',
    low: 'success'
  };
  
  return (
    <Chip 
      label={priority.charAt(0).toUpperCase() + priority.slice(1)} 
      color={colors[priority]} 
      size="small" 
      variant="outlined"
    />
  );
};

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, py: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Resumo de estatísticas */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
                  borderLeft: '4px solid',
                  borderColor: 'primary.main'
                }}
              >
                <Typography variant="h6" color="text.secondary">Tarefas</Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', my: 1 }}>12</Typography>
                <Typography variant="body2" color="text.secondary">5 pendentes</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
                  borderLeft: '4px solid',
                  borderColor: 'secondary.main'
                }}
              >
                <Typography variant="h6" color="text.secondary">Eventos</Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', my: 1 }}>8</Typography>
                <Typography variant="body2" color="text.secondary">3 hoje</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
                  borderLeft: '4px solid',
                  borderColor: 'info.main'
                }}
              >
                <Typography variant="h6" color="text.secondary">Mensagens</Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', my: 1 }}>24</Typography>
                <Typography variant="body2" color="text.secondary">5 não lidas</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
                  borderLeft: '4px solid',
                  borderColor: 'success.main'
                }}
              >
                <Typography variant="h6" color="text.secondary">Conteúdos</Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', my: 1 }}>7</Typography>
                <Typography variant="body2" color="text.secondary">2 rascunhos</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        
        {/* Notificações */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)' }}>
            <CardHeader 
              title="Notificações" 
              titleTypographyProps={{ variant: 'h6' }}
              avatar={<NotificationsIcon color="primary" />}
              action={
                <Button size="small" color="primary">
                  Ver todas
                </Button>
              }
            />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <List>
                {notifications.map((notification) => (
                  <ListItem key={notification.id} divider>
                    <ListItemIcon>
                      {notification.type === 'event' && <EventIcon color="secondary" />}
                      {notification.type === 'task' && <TaskIcon color="primary" />}
                      {notification.type === 'message' && <MessageIcon color="info" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary={notification.content}
                      secondary="Agora mesmo"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Gráfico de atividade */}
        <Grid item xs={12} md={8}>
          <ChartContainer>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Atividade Recente</Typography>
              <TrendingUpIcon color="primary" />
            </Box>
            <Box sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'text.secondary'
            }}>
              <Typography variant="body1">
                Gráfico de atividade seria exibido aqui
              </Typography>
            </Box>
          </ChartContainer>
        </Grid>
        
        {/* Próximas tarefas */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)' }}>
            <CardHeader 
              title="Próximas Tarefas" 
              titleTypographyProps={{ variant: 'h6' }}
              avatar={<TaskIcon color="primary" />}
              action={
                <Button size="small" color="primary">
                  Ver todas
                </Button>
              }
            />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <List>
                {upcomingTasks.map((task) => (
                  <ListItem key={task.id} divider>
                    <ListItemText 
                      primary={task.title}
                      secondary={`Vencimento: ${task.dueDate}`}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                    <PriorityChip priority={task.priority} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Próximos eventos */}
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ height: '100%', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)' }}>
            <CardHeader 
              title="Próximos Eventos" 
              titleTypographyProps={{ variant: 'h6' }}
              avatar={<EventIcon color="secondary" />}
              action={
                <Button size="small" color="primary">
                  Ver todos
                </Button>
              }
            />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <List>
                {upcomingEvents.map((event) => (
                  <ListItem key={event.id} divider>
                    <ListItemText 
                      primary={event.title}
                      secondary={`${event.date} às ${event.time}`}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Mensagens recentes */}
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ height: '100%', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)' }}>
            <CardHeader 
              title="Mensagens Recentes" 
              titleTypographyProps={{ variant: 'h6' }}
              avatar={<MessageIcon color="info" />}
              action={
                <Button size="small" color="primary">
                  Ver todas
                </Button>
              }
            />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <List>
                {recentMessages.map((message) => (
                  <ListItem key={message.id} divider>
                    <Avatar sx={{ mr: 2, width: 32, height: 32, bgcolor: message.unread ? 'primary.main' : 'grey.500' }}>
                      {message.sender.charAt(0)}
                    </Avatar>
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2">{message.sender}</Typography>
                          <Typography variant="caption" color="text.secondary">{message.time}</Typography>
                        </Box>
                      }
                      secondary={
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontWeight: message.unread ? 'medium' : 'regular'
                          }}
                        >
                          {message.content}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
