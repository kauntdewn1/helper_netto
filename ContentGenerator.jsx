import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Divider,
  Chip,
  IconButton,
  Tabs,
  Tab,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ContentCopy as ContentCopyIcon,
  Download as DownloadIcon,
  Send as SendIcon,
  Refresh as RefreshIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Article as ArticleIcon
} from '@mui/icons-material';

// Componentes estilizados
const ContentContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
  height: 'calc(100vh - 180px)',
  overflow: 'auto'
}));

const PlatformCard = styled(Card)(({ theme, selected }) => ({
  backgroundColor: selected ? alpha(theme.palette.primary.main, 0.1) : theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  border: selected ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)'
  }
}));

const ContentPreview = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  minHeight: '200px'
}));

// Função auxiliar para alpha
const alpha = (color, opacity) => {
  return color + opacity.toString(16).padStart(2, '0');
};

// Dados simulados
const platformOptions = [
  { id: 'instagram', name: 'Instagram', icon: <InstagramIcon /> },
  { id: 'facebook', name: 'Facebook', icon: <FacebookIcon /> },
  { id: 'twitter', name: 'Twitter', icon: <TwitterIcon /> },
  { id: 'linkedin', name: 'LinkedIn', icon: <LinkedInIcon /> },
  { id: 'email', name: 'Email', icon: <EmailIcon /> },
  { id: 'blog', name: 'Blog', icon: <ArticleIcon /> }
];

const contentTypeOptions = [
  { id: 'post', name: 'Post' },
  { id: 'story', name: 'Story' },
  { id: 'ad', name: 'Anúncio' },
  { id: 'newsletter', name: 'Newsletter' },
  { id: 'article', name: 'Artigo' }
];

const toneOptions = [
  { id: 'professional', name: 'Profissional' },
  { id: 'casual', name: 'Casual' },
  { id: 'enthusiastic', name: 'Entusiasmado' },
  { id: 'informative', name: 'Informativo' },
  { id: 'persuasive', name: 'Persuasivo' }
];

// Conteúdo gerado simulado
const generatedContent = {
  instagram: {
    post: "🚀 Transforme sua presença digital com estratégias que realmente funcionam! A FlowOFF combina abordagens tradicionais com inovações Web3 para resultados extraordinários. Nosso método Flow 360 integra múltiplos canais para maximizar seu alcance e engajamento. Quer saber como podemos impulsionar sua marca? Link na bio! #MarketingDigital #Web3 #Estratégia #FlowOFF",
    story: "Deslize para cima e descubra como a FlowOFF está revolucionando o marketing digital com nossa abordagem Flow 360! ✨ Resultados reais. Estratégias inovadoras. Crescimento sustentável."
  },
  facebook: {
    post: "Sua estratégia digital está gerando os resultados que você espera?\n\nNa FlowOFF, combinamos técnicas comprovadas de marketing com as mais recentes inovações em Web3 para criar campanhas verdadeiramente eficazes.\n\nNosso método exclusivo Flow 360 integra múltiplos canais digitais em uma estratégia coesa, maximizando seu alcance e conversão.\n\nQuer saber como podemos transformar sua presença digital? Entre em contato hoje mesmo para uma consulta gratuita!",
    ad: "TRANSFORME SUA PRESENÇA DIGITAL | Estratégias personalizadas que geram resultados reais. A FlowOFF combina marketing tradicional com Web3 para impulsionar seu negócio. Clique e saiba mais!"
  }
};

const ContentGenerator = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [contentType, setContentType] = useState('post');
  const [tone, setTone] = useState('professional');
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [contentLength, setContentLength] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [tabValue, setTabValue] = useState(0);
  
  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
    // Resetar tipo de conteúdo se não estiver disponível para a plataforma
    if (platform === 'twitter' && contentType === 'article') {
      setContentType('post');
    }
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleGenerateContent = () => {
    setIsGenerating(true);
    
    // Simular geração de conteúdo
    setTimeout(() => {
      // Verificar se temos conteúdo simulado para esta combinação
      if (generatedContent[selectedPlatform] && generatedContent[selectedPlatform][contentType]) {
        setGeneratedText(generatedContent[selectedPlatform][contentType]);
      } else {
        // Conteúdo genérico simulado
        setGeneratedText(`Conteúdo ${contentType} para ${selectedPlatform} sobre ${topic || 'marketing digital'}.\n\nEste é um exemplo de conteúdo gerado automaticamente com tom ${tone} para o público ${targetAudience || 'geral'}.\n\nPalavras-chave: ${keywords || 'marketing, digital, estratégia, web3'}`);
      }
      
      setIsGenerating(false);
    }, 2000);
  };
  
  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedText);
    // Aqui você poderia adicionar uma notificação de sucesso
  };
  
  const handleDownloadContent = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `conteudo_${selectedPlatform}_${contentType}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  return (
    <Box sx={{ flexGrow: 1, py: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Geração de Conteúdo
      </Typography>
      
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="content generator tabs" sx={{ mb: 3 }}>
        <Tab label="Gerar Conteúdo" />
        <Tab label="Histórico" />
      </Tabs>
      
      {tabValue === 0 && (
        <ContentContainer>
          <Grid container spacing={3}>
            {/* Seleção de plataforma */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Plataforma
              </Typography>
              <Grid container spacing={2}>
                {platformOptions.map((platform) => (
                  <Grid item xs={6} sm={4} md={2} key={platform.id}>
                    <PlatformCard 
                      selected={selectedPlatform === platform.id}
                      onClick={() => handlePlatformSelect(platform.id)}
                    >
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <Box sx={{ fontSize: 40, mb: 1 }}>
                          {platform.icon}
                        </Box>
                        <Typography variant="subtitle1">
                          {platform.name}
                        </Typography>
                      </CardContent>
                    </PlatformCard>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            
            {/* Configurações de conteúdo */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Configurações
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Tipo de Conteúdo</InputLabel>
                    <Select
                      value={contentType}
                      onChange={(e) => setContentType(e.target.value)}
                      label="Tipo de Conteúdo"
                    >
                      {contentTypeOptions.map((type) => (
                        <MenuItem 
                          key={type.id} 
                          value={type.id}
                          disabled={
                            (selectedPlatform === 'twitter' && type.id === 'article') ||
                            (selectedPlatform === 'instagram' && type.id === 'newsletter')
                          }
                        >
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Tom</InputLabel>
                    <Select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      label="Tom"
                    >
                      {toneOptions.map((tone) => (
                        <MenuItem key={tone.id} value={tone.id}>
                          {tone.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tópico/Assunto"
                    variant="outlined"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Ex: Lançamento de novo serviço, Dicas de marketing, etc."
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Palavras-chave"
                    variant="outlined"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="Ex: marketing digital, web3, estratégia, etc."
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Público-alvo"
                    variant="outlined"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="Ex: Empreendedores, Profissionais de marketing, etc."
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Tamanho do Conteúdo</InputLabel>
                    <Select
                      value={contentLength}
                      onChange={(e) => setContentLength(e.target.value)}
                      label="Tamanho do Conteúdo"
                    >
                      <MenuItem value="short">Curto</MenuItem>
                      <MenuItem value="medium">Médio</MenuItem>
                      <MenuItem value="long">Longo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : <RefreshIcon />}
                    onClick={handleGenerateContent}
                    disabled={isGenerating}
                  >
                    {isGenerating ? 'Gerando...' : 'Gerar Conteúdo'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            
            {/* Visualização do conteúdo */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Conteúdo Gerado
                </Typography>
                <Box>
                  <IconButton 
                    color="primary" 
                    onClick={handleCopyContent}
                    disabled={!generatedText}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                  <IconButton 
                    color="primary" 
                    onClick={handleDownloadContent}
                    disabled={!generatedText}
                  >
                    <DownloadIcon />
                  </IconButton>
                </Box>
              </Box>
              <ContentPreview>
                {generatedText ? (
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {generatedText}
                  </Typography>
                ) : (
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100%',
                    minHeight: '200px',
                    color: 'text.secondary'
                  }}>
                    <Typography variant="body1">
                      Configure as opções e clique em "Gerar Conteúdo" para ver o resultado aqui
                    </Typography>
                  </Box>
                )}
              </ContentPreview>
              
              {generatedText && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Hashtags Sugeridas
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip label="#MarketingDigital" color="primary" variant="outlined" />
                    <Chip label="#FlowOFF" color="primary" variant="outlined" />
                    <Chip label="#Web3" color="primary" variant="outlined" />
                    <Chip label="#Estratégia" color="primary" variant="outlined" />
                    <Chip label="#Flow360" color="primary" variant="outlined" />
                    <Chip label="#Inovação" color="primary" variant="outlined" />
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<SendIcon />}
                      sx={{ mr: 1 }}
                    >
                      Agendar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SendIcon />}
                    >
                      Publicar
                    </Button>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </ContentContainer>
      )}
      
      {tabValue === 1 && (
        <ContentContainer>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography variant="body1" color="text.secondary">
              O histórico de conteúdos gerados será exibido aqui
            </Typography>
          </Box>
        </ContentContainer>
      )}
    </Box>
  );
};

export default ContentGenerator;
