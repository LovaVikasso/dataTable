import {StrictMode} from "react";
import {Provider} from "react-redux";
import {store} from "./state";
import {createRoot} from 'react-dom/client'
import App from './App.tsx'

import './styles/global.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </StrictMode>,
)
