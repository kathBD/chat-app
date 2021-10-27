
import './App.css';
import { AuthProvider } from './auth/AuthContext';

import {SocketProvider} from './context/Socketcontext'
import RouterApp from './router/RouterApp';
import { ChatProvider } from './context/ChatContext';
import moment from 'moment'
import 'moment/locale/es';
moment.locale('es');

function App() {
  return (
    <ChatProvider>
    <AuthProvider>
      <SocketProvider>

           <RouterApp/>
      </SocketProvider>
  
    </AuthProvider>
    </ChatProvider>
   
  );
}

export default App;
