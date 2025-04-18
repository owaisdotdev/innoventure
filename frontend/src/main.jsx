import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';  
import { store } from '@/redux/store';       
import ThemeProvider from './utils/ThemeContext';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import MyProvider from './Providers/Web3Provider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>             
      <Router>
        <ThemeProvider>
          <MyProvider>
            <App />
          </MyProvider>

        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
