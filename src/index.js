
import App from './App'
import Route_try from './route_try';
import './index.css'
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<Route_try />);


//import ReactDOM from 'react-dom';
//ReactDOM.render(<App/>, document.querySelector("#root"))
