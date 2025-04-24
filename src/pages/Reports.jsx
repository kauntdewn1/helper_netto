import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AttachMoney as AttachMoneyIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Componentes estilizados
const ReportsContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
  height: 'calc(100vh - 180px)',
  overflow: 'auto'
}));

const MetricCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '& .MuiCardContent-root': {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(1)
}));

const MetricChange = styled(Box)(({ theme, positive }) => ({
  display: 'flex',
  alignItems: 'center',
  color: positive ? theme.palette.success.main : theme.palette.error.main,
  '& .MuiSvgIcon-root': {
    fontSize: '1rem',
    marginRight: theme.spacing(0.5)
  }
}));

const Reports = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(false);
  
  const metrics = [
    {
      title: 'Receita Total',
      value: 'R$ 150.000',
      change: '+15%',
      positive: true,
      icon: <AttachMoneyIcon color="primary" />
    },
    {
      title: 'Novos Clientes',
      value: '250',
      change: '+8%',
      positive: true,
      icon: <PeopleIcon color="primary" />
    },
    {
      title: 'Taxa de Conversão',
      value: '3.2%',
      change: '-0.5%',
      positive: false,
      icon: <ShoppingCartIcon color="primary" />
    },
    {
      title: 'Visitas',
      value: '45.000',
      change: '+12%',
      positive: true,
      icon: <VisibilityIcon color="primary" />
    }
  ];
  
  const topProducts = [
    { name: 'Produto A', sales: 1200, revenue: 'R$ 60.000' },
    { name: 'Produto B', sales: 800, revenue: 'R$ 40.000' },
    { name: 'Produto C', sales: 600, revenue: 'R$ 30.000' },
    { name: 'Produto D', sales: 400, revenue: 'R$ 20.000' },
    { name: 'Produto E', sales: 200, revenue: 'R$ 10.000' }
  ];
  
  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
    setLoading(true);
    // Simular carregamento de dados
    setTimeout(() => setLoading(false), 1000);
  };
  
  const handleRefresh = () => {
    setLoading(true);
    // Simular atualização de dados
    setTimeout(() => setLoading(false), 1000);
  };
  
  const handleDownload = () => {
    // Implementar lógica de download do relatório
    console.log('Downloading report...');
  };
  
  return (
    <Box sx={{ flexGrow: 1, py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Relatórios
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small">
            <InputLabel>Período</InputLabel>
            <Select
              value={timeRange}
              onChange={handleTimeRangeChange}
              label="Período"
            >
              <MenuItem value="week">Última Semana</MenuItem>
              <MenuItem value="month">Último Mês</MenuItem>
              <MenuItem value="quarter">Último Trimestre</MenuItem>
              <MenuItem value="year">Último Ano</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={loading}
          >
            Atualizar
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
          >
            Exportar
          </Button>
        </Box>
      </Box>
      
      {loading && <LinearProgress sx={{ mb: 3 }} />}
      
      <ReportsContainer>
        <Grid container spacing={3}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MetricCard>
                <CardHeader
                  avatar={metric.icon}
                  title={metric.title}
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <MetricValue>{metric.value}</MetricValue>
                  <MetricChange positive={metric.positive}>
                    {metric.positive ? <TrendingUpIcon /> : <TrendingDownIcon />}
                    <Typography variant="body2">
                      {metric.change}
                    </Typography>
                  </MetricChange>
                </CardContent>
              </MetricCard>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Produtos Mais Vendidos
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Produto</TableCell>
                  <TableCell align="right">Vendas</TableCell>
                  <TableCell align="right">Receita</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topProducts.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell align="right">{product.sales}</TableCell>
                    <TableCell align="right">{product.revenue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </ReportsContainer>
    </Box>
  );
};

export default Reports; 