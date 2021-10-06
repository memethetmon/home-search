import { useState } from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  const [ address, setAddress ] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    history.push({
      pathname: "/home",
      search: `?address=${address}`
    });
  };

  return (
    <div className="home">
      <div className="center">
        <input 
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          name="address" 
          placeholder="Search by address: 400 Oak St" />
        <button onClick={handleSearch}>&#128269;</button>
      </div>
    </div>
  );
}

export default Home;