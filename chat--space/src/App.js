import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Chat from "./components/Chat";
import Join from './components/Join'
import './App.css'


function App() {

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={[<Join />]} />
          <Route path='/chat' element={[<Chat />]} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
