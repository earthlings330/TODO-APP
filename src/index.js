import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore,applyMiddleware,compose} from 'redux';
import authReducer from './Store/reducer/auth'




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(authReducer,composeEnhancers(
    applyMiddleware(thunk)
    )
    );
const app = (
    <Provider store={Store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root')); 
registerServiceWorker();
