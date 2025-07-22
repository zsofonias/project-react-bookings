import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import { seedLocalDatabase } from '@/api/data/seed';
import ThemeProvider from '@/components/ThemeProvider';

import Router from './Router';
import { store } from './state/store';

import './index.css';

// DO NOT REMOVE: Seeds the local storage database with data
seedLocalDatabase();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <ReduxProvider store={store}>
      <Router />
    </ReduxProvider>
  </ThemeProvider>,
);
