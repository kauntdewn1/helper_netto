import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Tabs,
  Tab,
  Button,
  IconButton,
  Card,
  CardContent,
  Chip,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Checkbox,
  Tooltip,
  Menu,
  Alert
} from '@mui/material';
import { 
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Flag as FlagIcon,
  Today as TodayIcon,
  AccessTime as AccessTimeIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Componentes estilizados
const TasksContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
  height: 'calc(100vh - 180px)',
  overflow: 'auto'
}));

const TaskItem = styled(ListItem)(({ theme, completed }) => ({
  backgroundColor: completed ? theme.palette.action.hover : 'transparent',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}));

const PriorityChip = styled(Chip)(({ theme, priority }) => ({
  backgroundColor: 
    priority === 'high' ? theme.palette.error.main :
    priority === 'medium' ? theme.palette.warning.main :
    theme.palette.success.main,
  color: theme.palette.common.white,
  '& .MuiChip-label': {
    color: theme.palette.common.white
  }
}));

// Dados simulados
const taskData = [
  { 
    id: 1, 
    title: 'Revisar estratégia de marketing', 
    description: 'Analisar resultados da última campanha e ajustar a estratégia para o próximo trimestre',
    status: 'pending', 
    priority: 'high', 
    dueDate: '2025-04-18',
    category: 'marketing',
    completed: false
  },
  { 
    id: 2, 
    title: 'Preparar apresentação para cliente', 
    description: 'Criar slides para apresentação do novo projeto para o cliente XYZ',
    status: 'in_progress', 
    priority: 'medium', 
    dueDate: '2025-04-19',
    category: 'client',
    completed: false
  },
  { 
    id: 3, 
    title: 'Analisar métricas da campanha', 
    description: 'Compilar dados de desempenho da campanha de redes sociais',
    status: 'pending', 
    priority: 'low', 
    dueDate: '2025-04-20',
    category: 'analytics',
    completed: false
  },
  { 
    id: 4, 
    title: 'Reunião com equipe de design', 
    description: 'Discutir novos layouts e diretrizes de marca',
    status: 'completed', 
    priority: 'medium', 
    dueDate: '2025-04-17',
    category: 'meeting',
    completed: true
  },
  { 
    id: 5, 
    title: 'Atualizar site da empresa', 
    description: 'Adicionar novos casos de sucesso e atualizar seção de serviços',
    status: 'in_progress', 
    priority: 'high', 
    dueDate: '2025-04-21',
    category: 'website',
    completed: false
  },
];

// Componente de prioridade
const PriorityFlag = ({ priority }) => {
  const colors = {
    high: 'error',
    medium: 'warning',
    low: 'success'
  };
  
  return (
    <Tooltip title={`Prioridade ${priority}`}>
      <FlagIcon color={colors[priority]} fontSize="small" />
    </Tooltip>
  );
};

const Tasks = () => {
  const [tasks, setTasks] = useState(taskData);
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  
  // Estado para nova tarefa
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    category: 'work'
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Resetar formulário
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      category: 'work'
    });
  };
  
  const handleCreateTask = () => {
    const task = {
      id: tasks.length + 1,
      ...newTask,
      status: 'pending',
      completed: false
    };
    
    setTasks([...tasks, task]);
    handleCloseDialog();
  };
  
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value
    });
  };
  
  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, status: !task.completed ? 'completed' : 'pending' } 
        : task
    ));
  };
  
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };
  
  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };
  
  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };
  
  const handleSortClose = () => {
    setSortAnchorEl(null);
  };
  
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    handleFilterClose();
  };
  
  const handlePriorityFilter = (priority) => {
    setSelectedPriority(priority);
    handleFilterClose();
  };
  
  const handleSort = (sortBy) => {
    let sortedTasks = [...tasks];
    
    if (sortBy === 'dueDate') {
      sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      sortedTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy === 'title') {
      sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setTasks(sortedTasks);
    handleSortClose();
  };
  
  // Filtrar tarefas
  const filteredTasks = tasks.filter(task => {
    // Filtro por tab
    if (tabValue === 0 && task.completed) return false;
    if (tabValue === 1 && !task.completed) return false;
    
    // Filtro por categoria
    if (selectedCategory !== 'all' && task.category !== selectedCategory) return false;
    
    // Filtro por prioridade
    if (selectedPriority !== 'all' && task.priority !== selectedPriority) return false;
    
    return true;
  });

  return (
    <Box sx={{ flexGrow: 1, py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Tarefas
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Nova Tarefa
        </Button>
      </Box>
      
      <TasksContainer>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="task tabs">
              <Tab label="Pendentes" />
              <Tab label="Concluídas" />
            </Tabs>
            
            <Box>
              <Tooltip title="Filtrar">
                <IconButton onClick={handleFilterClick}>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Ordenar">
                <IconButton onClick={handleSortClick}>
                  <SortIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
        
        <TasksList>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <React.Fragment key={task.id}>
                <ListItem 
                  sx={{ 
                    py: 2,
                    backgroundColor: task.completed ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
                    opacity: task.completed ? 0.7 : 1
                  }}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id)}
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<CheckCircleIcon color="primary" />}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          textDecoration: task.completed ? 'line-through' : 'none',
                          fontWeight: task.priority === 'high' ? 'medium' : 'regular'
                        }}
                      >
                        {task.title}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          {task.description}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip 
                            label={task.category} 
                            size="small" 
                            sx={{ 
                              backgroundColor: 'background.default',
                              borderRadius: 1
                            }} 
                          />
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TodayIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                            <Typography variant="caption" color="text.secondary">
                              {task.dueDate}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PriorityFlag priority={task.priority} />
                      <IconButton edge="end" aria-label="edit" sx={{ ml: 1 }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        edge="end" 
                        aria-label="delete" 
                        onClick={() => handleDeleteTask(task.id)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="body1" color="text.secondary">
                {tabValue === 0 ? 'Nenhuma tarefa pendente' : 'Nenhuma tarefa concluída'}
              </Typography>
            </Box>
          )}
        </TasksList>
      </TasksContainer>
      
      {/* Dialog para criar nova tarefa */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Nova Tarefa</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Título"
            type="text"
            fullWidth
            variant="outlined"
            value={newTask.title}
            onChange={handleTaskChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Descrição"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={newTask.description}
            onChange={handleTaskChange}
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel>Prioridade</InputLabel>
                <Select
                  name="priority"
                  value={newTask.priority}
                  onChange={handleTaskChange}
                  label="Prioridade"
                >
                  <MenuItem value="low">Baixa</MenuItem>
                  <MenuItem value="medium">Média</MenuItem>
                  <MenuItem value="high">Alta</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel>Categoria</InputLabel>
                <Select
                  name="category"
                  value={newTask.category}
                  onChange={handleTaskChange}
                  label="Categoria"
                >
                  <MenuItem value="work">Trabalho</MenuItem>
                  <MenuItem value="marketing">Marketing</MenuItem>
                  <MenuItem value="client">Cliente</MenuItem>
                  <MenuItem value="meeting">Reunião</MenuItem>
                  <MenuItem value="website">Website</MenuItem>
                  <MenuItem value="analytics">Analytics</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <TextField
            margin="dense"
            name="dueDate"
            label="Data de Vencimento"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={newTask.dueDate}
            onChange={handleTaskChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            onClick={handleCreateTask} 
            variant="contained" 
            color="primary"
            disabled={!newTask.title}
          >
            Criar
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Menu de filtros */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
      >
        <Typography variant="subtitle2" sx={{ px: 2, py: 1 }}>
          Categoria
        </Typography>
        <MenuItem onClick={() => handleCategoryFilter('all')} selected={selectedCategory === 'all'}>
          Todas
        </MenuItem>
        <MenuItem onClick={() => handleCategoryFilter('work')} selected={selectedCategory === 'work'}>
          Trabalho
        </MenuItem>
        <MenuItem onClick={() => handleCategoryFilter('marketing')} selected={selectedCategory === 'marketing'}>
          Marketing
        </MenuItem>
        <MenuItem onClick={() => handleCategoryFilter('client')} selected={selectedCategory === 'client'}>
          Cliente
        </MenuItem>
        <MenuItem onClick={() => handleCategoryFilter('meeting')} selected={selectedCategory === 'meeting'}>
          Reunião
        </MenuItem>
        <Divider />
        <Typography variant="subtitle2" sx={{ px: 2, py: 1 }}>
          Prioridade
        </Typography>
        <MenuItem onClick={() => handlePriorityFilter('all')} selected={selectedPriority === 'all'}>
          Todas
        </MenuItem>
        <MenuItem onClick={() => handlePriorityFilter('high')} selected={selectedPriority === 'high'}>
          Alta
        </MenuItem>
        <MenuItem onClick={() => handlePriorityFilter('medium')} selected={selectedPriority === 'medium'}>
          Média
        </MenuItem>
        <MenuItem onClick={() => handlePriorityFilter('low')} selected={selectedPriority === 'low'}>
          Baixa
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Tasks;