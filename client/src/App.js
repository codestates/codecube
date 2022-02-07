import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
const url = process.env.REACT_APP_SERVER;
axios.defaults.withCredentials = true;

function App() {
  const handleClick = () => {
    console.log("hello");
    axios.get(`${url}/hello`).then((res) => console.log(res.data));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleClick}>hello</button>
      </header>
    </div>
  );
}

export default App;
