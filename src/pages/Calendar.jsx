import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Add as AddIcon,
  Today as TodayIcon,
  ViewDay as ViewDayIcon,
  ViewWeek as ViewWeekIcon,
  ViewModule as ViewMonthIcon
} from '@mui/icons-material';

// Componentes estilizados
const CalendarContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
  height: 'calc(100vh - 180px)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column'
}));

const CalendarHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3)
}));

const CalendarGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: theme.spacing(0.5),
  flexGrow: 1,
  overflow: 'auto'
}));

const DayCell = styled(Box)(({ theme, isToday, isCurrentMonth, hasEvents }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  minHeight: '100px',
  backgroundColor: isToday 
    ? alpha(theme.palette.primary.main, 0.1) 
    : isCurrentMonth 
      ? theme.palette.background.paper 
      : alpha(theme.palette.background.default, 0.5),
  opacity: isCurrentMonth ? 1 : 0.5,
  position: 'relative',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.05)
  }
}));

const DayNumber = styled(Typography)(({ theme, isToday }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  backgroundColor: isToday ? theme.palette.primary.main : 'transparent',
  color: isToday ? theme.palette.primary.contrastText : theme.palette.text.primary,
  fontWeight: isToday ? 'bold' : 'regular'
}));

const EventChip = styled(Box)(({ theme, priority }) => {
  const colors = {
    high: theme.palette.error.main,
    medium: theme.palette.warning.main,
    low: theme.palette.success.main,
    default: theme.palette.primary.main
  };
  
  return {
    backgroundColor: colors[priority] || colors.default,
    color: '#fff',
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
    fontSize: '0.75rem',
    marginBottom: theme.spacing(0.5),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'pointer'
  };
});

// Função auxiliar para manipulação de datas
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

const getLastDayOfPrevMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

// Dados simulados
const eventData = [
  {
    id: 1,
    title: 'Reunião com equipe de design',
    description: 'Discutir novos layouts e diretrizes de marca',
    startTime: new Date(2025, 3, 18, 14, 0),
    endTime: new Date(2025, 3, 18, 15, 30),
    location: 'Sala de reuniões virtual',
    priority: 'medium'
  },
  {
    id: 2,
    title: 'Call com cliente potencial',
    description: 'Apresentação inicial de serviços',
    startTime: new Date(2025, 3, 18, 16, 30),
    endTime: new Date(2025, 3, 18, 17, 30),
    location: 'Zoom',
    priority: 'high'
  },
  {
    id: 3,
    title: 'Workshop de estratégia',
    description: 'Planejamento para o próximo trimestre',
    startTime: new Date(2025, 3, 19, 10, 0),
    endTime: new Date(2025, 3, 19, 12, 0),
    location: 'Sala de conferências',
    priority: 'high'
  },
  {
    id: 4,
    title: 'Revisão de campanha',
    description: 'Análise de resultados e ajustes',
    startTime: new Date(2025, 3, 20, 9, 0),
    endTime: new Date(2025, 3, 20, 10, 0),
    location: 'Google Meet',
    priority: 'medium'
  },
  {
    id: 5,
    title: 'Almoço com parceiros',
    description: 'Networking e discussão de colaborações',
    startTime: new Date(2025, 3, 21, 12, 30),
    endTime: new Date(2025, 3, 21, 14, 0),
    location: 'Restaurante Central',
    priority: 'low'
  }
];

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [currentView, setCurrentView] = useState('month');
  const [events, setEvents] = useState(eventData);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Estado para novo evento
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    location: '',
    priority: 'medium'
  });
  
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  
  const handleViewChange = (view) => {
    setCurrentView(view);
  };
  
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setOpenDialog(true);
    
    // Resetar formulário
    setNewEvent({
      title: '',
      description: '',
      startTime: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T09:00`,
      endTime: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T10:00`,
      location: '',
      priority: 'medium'
    });
    
    setSelectedEvent(null);
  };
  
  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setOpenDialog(true);
    
    // Preencher formulário com dados do evento
    const startTime = event.startTime.toISOString().slice(0, 16);
    const endTime = event.endTime.toISOString().slice(0, 16);
    
    setNewEvent({
      title: event.title,
      description: event.description,
      startTime: startTime,
      endTime: endTime,
      location: event.location,
      priority: event.priority
    });
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
    setSelectedDate(null);
  };
  
  const handleCreateEvent = () => {
    if (selectedEvent) {
      // Atualizar evento existente
      const updatedEvents = events.map(event => 
        event.id === selectedEvent.id 
          ? { ...event, ...newEvent }
          : event
      );
      setEvents(updatedEvents);
    } else {
      // Criar novo evento
      const newEventWithId = {
        ...newEvent,
        id: events.length + 1,
        startTime: new Date(newEvent.startTime),
        endTime: new Date(newEvent.endTime)
      };
      setEvents([...events, newEventWithId]);
    }
    handleCloseDialog();
  };
  
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      handleCloseDialog();
    }
  };
  
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const renderMonthCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const lastDayOfPrevMonth = getLastDayOfPrevMonth(currentYear, currentMonth);
    
    const days = [];
    
    // Dias do mês anterior
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = lastDayOfPrevMonth - i;
      const date = new Date(currentYear, currentMonth - 1, day);
      days.push(
        <DayCell 
          key={`prev-${day}`} 
          isCurrentMonth={false}
          isToday={false}
          onClick={() => handleDateClick(date)}
        >
          <DayNumber>{day}</DayNumber>
        </DayCell>
      );
    }
    
    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === today.toDateString();
      const dayEvents = events.filter(event => 
        event.startTime.getDate() === day &&
        event.startTime.getMonth() === currentMonth &&
        event.startTime.getFullYear() === currentYear
      );
      
      days.push(
        <DayCell 
          key={day} 
          isCurrentMonth={true}
          isToday={isToday}
          hasEvents={dayEvents.length > 0}
          onClick={() => handleDateClick(date)}
        >
          <DayNumber isToday={isToday}>{day}</DayNumber>
          {dayEvents.map(event => (
            <EventChip 
              key={event.id}
              priority={event.priority}
              onClick={(e) => handleEventClick(event, e)}
            >
              {event.title}
            </EventChip>
          ))}
        </DayCell>
      );
    }
    
    // Dias do próximo mês
    const remainingDays = 42 - days.length; // 6 semanas * 7 dias
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(currentYear, currentMonth + 1, day);
      days.push(
        <DayCell 
          key={`next-${day}`} 
          isCurrentMonth={false}
          isToday={false}
          onClick={() => handleDateClick(date)}
        >
          <DayNumber>{day}</DayNumber>
        </DayCell>
      );
    }
    
    return days;
  };
  
  return (
    <CalendarContainer>
      <CalendarHeader>
        <Box>
          <IconButton onClick={handlePrevMonth}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h5" component="h2" sx={{ display: 'inline-block', mx: 2 }}>
            {currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
          </Typography>
          <IconButton onClick={handleNextMonth}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
        
        <Box>
          <Tooltip title="Dia">
            <IconButton 
              onClick={() => handleViewChange('day')}
              color={currentView === 'day' ? 'primary' : 'default'}
            >
              <ViewDayIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Semana">
            <IconButton 
              onClick={() => handleViewChange('week')}
              color={currentView === 'week' ? 'primary' : 'default'}
            >
              <ViewWeekIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mês">
            <IconButton 
              onClick={() => handleViewChange('month')}
              color={currentView === 'month' ? 'primary' : 'default'}
            >
              <ViewMonthIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Hoje">
            <IconButton onClick={() => setCurrentDate(today)}>
              <TodayIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CalendarHeader>
      
      <CalendarGrid>
        {renderMonthCalendar()}
      </CalendarGrid>
      
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedEvent ? 'Editar Evento' : 'Novo Evento'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título"
                name="title"
                value={newEvent.title}
                onChange={handleEventChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Descrição"
                name="description"
                value={newEvent.description}
                onChange={handleEventChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Início"
                name="startTime"
                type="datetime-local"
                value={newEvent.startTime}
                onChange={handleEventChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Fim"
                name="endTime"
                type="datetime-local"
                value={newEvent.endTime}
                onChange={handleEventChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Local"
                name="location"
                value={newEvent.location}
                onChange={handleEventChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Prioridade</InputLabel>
                <Select
                  name="priority"
                  value={newEvent.priority}
                  onChange={handleEventChange}
                  label="Prioridade"
                >
                  <MenuItem value="high">Alta</MenuItem>
                  <MenuItem value="medium">Média</MenuItem>
                  <MenuItem value="low">Baixa</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {selectedEvent && (
            <Button onClick={handleDeleteEvent} color="error">
              Excluir
            </Button>
          )}
          <Button onClick={handleCloseDialog}>
            Cancelar
          </Button>
          <Button onClick={handleCreateEvent} variant="contained" color="primary">
            {selectedEvent ? 'Salvar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>
    </CalendarContainer>
  );
};

export default Calendar;