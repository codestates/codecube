import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
const url = process.env.REACT_APP_SERVER;
axios.defaults.withCredentials = true;

function App() {
  const handleClick = () => {
    axios.get(`${url}/hello`).then((res) => console.log(res.data));
  };

  const handleClickWorld = () => {
    axios.get(`${url}/world`).then((res) => console.log(res.data));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleClick}>hello</button>
        <button onClick={handleClickWorld}>world</button>
      </header>
    </div>
  );
}

export default App;
