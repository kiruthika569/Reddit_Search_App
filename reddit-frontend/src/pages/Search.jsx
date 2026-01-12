import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!keyword.trim()) {
      setError("Please enter a keyword");
      setResults([]);
      return;
    }
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/reddit?q=${keyword}`
      );
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError("Failed to fetch data from Reddit");
      setResults([]);
    }
  };

  return (
    <div className="AppContainer">
      <h2>Reddit Search</h2>

      <div className="inputContainer">
        <input
          type="text"
          placeholder="Enter search keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => navigate("/")}>Back Home</button>
      </div>

      {error && <p className="error">{error}</p>}

      {results.map((post, index) => (
        <div className="card" key={index}>
          <h4>{post.title}</h4>
          <p><b>Subreddit:</b> r/{post.subreddit}</p>
          <p>{post.description}</p>
          <p><b>Author:</b> {post.author} | <b>Comments:</b> {post.comments}</p>
          <a href={post.url} target="_blank" rel="noreferrer">
            Open Discussion
          </a>
        </div>
      ))}
    </div>
  );
}

export default Search;
