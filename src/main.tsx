import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Header from './components/Header/Header.tsx'
import {CommentList} from './components/Main/CommentsList/CommentList.tsx'
import { Provider } from 'react-redux';
import { store } from './store/store.tsx';
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> 
      {/* <Header/> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* <CommentList/> */}
    </Provider> 
  </React.StrictMode>,
)

console.log('api');


