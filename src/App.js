import { BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
// Import css
import "./App.css"
import BMI from "./Component/BMI";
import Calculator from "./Component/Calculator";
import Counter from "./Component/Counter";
import EmojiTab from "./Component/EmojiTab";
import FetchApi from "./Component/FetchApi";
import Home from "./Component/Home";
import ImgCompress from "./Component/ImgCompress";
  
function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <><Route exact path="/" element={<Home />} /></>
          <><Route exact path="BMI" element={<BMI />} /></>
          <><Route exact path="Counter" element={<Counter />} /></>
          <><Route exact path="EmojiSearch" element={<EmojiTab />} /></>
          <><Route exact path="Calculator" element={<Calculator />} /></>
          <><Route exact path="ImgCompress" element={<ImgCompress />} /></>
          <><Route exact path="FetchApi" element={<FetchApi />} /></>
        </Routes>

      </Router>
    </div>
  );
}

export default App;