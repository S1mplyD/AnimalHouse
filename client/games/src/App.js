import "./App.css";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Quiz from "./components/Quiz"
import Home from "./components/Home"

function App() {
  
  return (
    <Router>
    <div>
      <Link to="/"><h1 id="title">Animal House Games</h1></Link>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/quiz" element={<Quiz />}/>
      </Routes>
    </div>
    </Router>
  )
}

export default App;
