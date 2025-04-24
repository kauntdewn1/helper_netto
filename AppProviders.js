import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MessageProvider } from './contexts/MessageContext';
import { TaskProvider } from './contexts/TaskContext';
import { EventProvider } from './contexts/EventContext';
import { ContentProvider } from './contexts/ContentContext';
import { RealTimeProvider } from './contexts/RealTimeContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import App from './App';

const AppProviders = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <RealTimeProvider>
            <MessageProvider>
              <TaskProvider>
                <EventProvider>
                  <ContentProvider>
                    <App />
                  </ContentProvider>
                </EventProvider>
              </TaskProvider>
            </MessageProvider>
          </RealTimeProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default AppProviders;
