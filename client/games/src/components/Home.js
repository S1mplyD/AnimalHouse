import image from "../1652541244672.png";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
function Home() {
  return (
      <div className="games">
          <Link to="/quiz">
        <img src={image} alt="quiz" />
      </Link>
      </div>

    );
}

export default Home;
