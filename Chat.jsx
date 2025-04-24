import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  TextField, 
  IconButton, 
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Card,
  CardContent,
  Button,
  Fab,
  CircularProgress
} from '@mui/material';
import { 
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Mic as MicIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Componentes estilizados
const ChatContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 180px)',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
  overflow: 'hidden'
}));

const MessageList = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  padding: theme.spacing(2),
}));

const MessageInputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
}));

const ConversationList = styled(List)(({ theme }) => ({
  padding: 0,
  height: 'calc(100vh - 180px)',
  overflow: 'auto',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
}));

// Mensagem enviada pelo usuário
const UserMessage = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(2),
}));

const UserMessageContent = styled(Box)(({ theme }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1.5),
  borderRadius: '18px 18px 4px 18px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

// Mensagem recebida da IA
const AIMessage = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  marginBottom: theme.spacing(2),
}));

const AIMessageContent = styled(Box)(({ theme }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1.5),
  borderRadius: '18px 18px 18px 4px',
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
}));

// Dados simulados
const conversations = [
  { id: 1, name: 'IA Assistente', lastMessage: 'Como posso ajudar hoje?', time: '10:30', unread: 2 },
  { id: 2, name: 'Projeto Marketing', lastMessage: 'Análise de campanha concluída', time: 'Ontem', unread: 0 },
  { id: 3, name: 'Planejamento Q2', lastMessage: 'Metas definidas para o próximo trimestre', time: 'Seg', unread: 0 },
  { id: 4, name: 'Equipe Design', lastMessage: 'Novos layouts aprovados', time: '23/03', unread: 0 },
  { id: 5, name: 'Suporte Técnico', lastMessage: 'Problema resolvido', time: '15/03', unread: 0 },
];

const messages = [
  { id: 1, sender: 'user', content: 'Olá, preciso organizar minha agenda para a próxima semana', time: '10:25' },
  { id: 2, sender: 'ai', content: 'Olá Netto! Claro, posso ajudar com isso. Você tem alguma prioridade específica ou eventos já confirmados que devo considerar?', time: '10:26' },
  { id: 3, sender: 'user', content: 'Sim, tenho uma reunião importante na terça às 14h com a equipe de marketing e preciso preparar uma apresentação antes', time: '10:27' },
  { id: 4, sender: 'ai', content: 'Entendi. Vou reservar a reunião na terça às 14h e também vou adicionar um bloco de 2 horas na terça pela manhã para você preparar a apresentação. Algo mais que devo incluir?', time: '10:28' },
  { id: 5, sender: 'user', content: 'Preciso também revisar os resultados da última campanha e preparar um relatório até quinta-feira', time: '10:29' },
  { id: 6, sender: 'ai', content: 'Certo. Adicionei essas tarefas à sua agenda. Reservei quarta-feira das 9h às 12h para revisão dos resultados da campanha e das 14h às 17h para preparação do relatório. Isso parece adequado para você?', time: '10:30' },
];

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState(messages);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    
    // Adiciona mensagem do usuário
    const newUserMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      content: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages([...chatMessages, newUserMessage]);
    setMessageInput('');
    
    // Simula resposta da IA
    setIsTyping(true);
    setTimeout(() => {
      const newAIMessage = {
        id: chatMessages.length + 2,
        sender: 'ai',
        content: 'Estou processando sua solicitação. Vou te ajudar com isso em um momento.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, newAIMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ flexGrow: 1, py: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Chat com IA
      </Typography>
      
      <Grid container spacing={3}>
        {/* Lista de conversas */}
        <Grid item xs={12} md={4} lg={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Conversas</Typography>
            <Fab 
              color="primary" 
              size="small" 
              aria-label="nova conversa"
            >
              <AddIcon />
            </Fab>
          </Box>
          
          <ConversationList>
            {conversations.map((conversation) => (
              <React.Fragment key={conversation.id}>
                <ListItem 
                  button 
                  selected={selectedConversation === conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  sx={{
                    px: 2,
                    py: 1.5,
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(255, 0, 102, 0.1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 0, 102, 0.2)',
                      },
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar 
                      sx={{ 
                        bgcolor: conversation.id === 1 ? 'primary.main' : 'grey.700',
                        width: 48,
                        height: 48
                      }}
                    >
                      {conversation.name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: conversation.unread > 0 ? 'bold' : 'regular',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        {conversation.name}
                        <Typography variant="caption" color="text.secondary">
                          {conversation.time}
                        </Typography>
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '180px',
                            fontWeight: conversation.unread > 0 ? 'medium' : 'regular'
                          }}
                        >
                          {conversation.lastMessage}
                        </Typography>
                        {conversation.unread > 0 && (
                          <Box 
                            sx={{ 
                              bgcolor: 'primary.main', 
                              color: 'white', 
                              borderRadius: '50%', 
                              width: 20, 
                              height: 20, 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              ml: 1,
                              fontSize: '0.75rem'
                            }}
                          >
                            {conversation.unread}
                          </Box>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </ConversationList>
        </Grid>
        
        {/* Chat principal */}
        <Grid item xs={12} md={8} lg={9}>
          <ChatContainer>
            {/* Cabeçalho do chat */}
            <Box sx={{ 
              p: 2, 
              borderBottom: 1, 
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  {conversations.find(c => c.id === selectedConversation)?.name.charAt(0)}
                </Avatar>
                <Typography variant="h6">
                  {conversations.find(c => c.id === selectedConversation)?.name}
                </Typography>
              </Box>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box>
            
            {/* Lista de mensagens */}
            <MessageList>
              {chatMessages.map((message) => (
                message.sender === 'user' ? (
                  <UserMessage key={message.id}>
                    <UserMessageContent>
                      <Typography variant="body1">{message.content}</Typography>
                      <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}>
                        {message.time}
                      </Typography>
                    </UserMessageContent>
                  </UserMessage>
                ) : (
                  <AIMessage key={message.id}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 1, alignSelf: 'flex-start' }}>
                      A
                    </Avatar>
                    <AIMessageContent>
                      <Typography variant="body1">{message.content}</Typography>
                      <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', mt: 0.5 }}>
                        {message.time}
                      </Typography>
                    </AIMessageContent>
                  </AIMessage>
                )
              ))}
              
              {isTyping && (
                <AIMessage>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 1, alignSelf: 'flex-start' }}>
                    A
                  </Avatar>
                  <AIMessageContent sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                    <CircularProgress size={20} thickness={5} sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      IA está digitando...
                    </Typography>
                  </AIMessageContent>
                </AIMessage>
              )}
            </MessageList>
            
            {/* Input de mensagem */}
            <MessageInputContainer>
              <IconButton sx={{ mr: 1 }}>
                <AttachFileIcon />
              </IconButton>
              <TextField
                fullWidth
                placeholder="Digite sua mensagem..."
                variant="outlined"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                multiline
                maxRows={4}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 4,
                  }
                }}
              />
              <IconButton sx={{ ml: 1 }}>
                <MicIcon />
              </IconButton>
              <IconButton 
                color="primary" 
                sx={{ ml: 1 }}
                onClick={handleSendMessage}
                disabled={messageInput.trim() === ''}
              >
                <SendIcon />
              </IconButton>
            </MessageInputContainer>
          </ChatContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
