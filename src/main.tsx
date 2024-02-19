import './styles/scrollbar.css';

import { StyleProvider } from '@ant-design/cssinjs';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import App from './App';

const rootElement: HTMLElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
  // <React.StrictMode>
  <Router>
    <StyleProvider hashPriority="high">
      <App />
    </StyleProvider>
  </Router>
  // </React.StrictMode>
);
