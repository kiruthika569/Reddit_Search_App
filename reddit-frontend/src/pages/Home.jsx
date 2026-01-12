import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="AppContainer">
      <h2>Welcome to Reddit Search Tool</h2>
      <p>Search for Reddit discussions instantly by entering a keyword below.</p>
      <button onClick={() => navigate("/search")}>Go to Search</button>
    </div>
  );
}

export default Home;
