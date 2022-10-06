
import './App.css';
import Content from './component/Content';
import Description from './component/Description';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'

function App() {
  return (
<Router>
<div className="App">

  <Routes>
    <Route path="/" element={[<Content /> ]} />
    <Route path="/order/:idDrink" element={[<Description />]} />
  </Routes>

</div>
</Router>
  );
}

export default App;
