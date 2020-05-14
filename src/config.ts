import { BrowserRouter, HashRouter } from 'react-router-dom';

export const title = process.env.REACT_APP_TITLE || 'poll';
export const wsServer =
  process.env.REACT_APP_SERVER_WS ||
  'ws://' + window.location.hostname + ':5000/ws';
export const apiServer =
  process.env.REACT_APP_SERVER_API ||
  'http://' + window.location.hostname + ':5000/';
export const Router: any = process.env.REACT_APP_USE_BROWSER_ROUTER
  ? BrowserRouter
  : HashRouter;
