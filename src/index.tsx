/* eslint-disable import/order */
import { createRoot } from 'react-dom/client';

import App from 'src/pages/App/App';
import 'src/index.scss';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(<App />);
