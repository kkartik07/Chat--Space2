import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Chat from "./components/Chat";
import Join from './components/Join'


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/join' element={[<Join />]} />
          <Route path='/chat' element={[<Chat />]} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
