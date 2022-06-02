import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Join from './components/Join'


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/join' element={[<Join />]} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
