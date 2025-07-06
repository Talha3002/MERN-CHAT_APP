import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/Authcontext.jsx";
import { SocketContextProvider } from "./context/Socketcontext.jsx";
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
			<AuthContextProvider>
				<SocketContextProvider>
					<App />
				</SocketContextProvider>
			</AuthContextProvider>
		</BrowserRouter>
  </StrictMode>,
)
