import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {
  return(
    <div className="App">

        <div>edgeCheker yo!</div>
        
        <Router>
            <Routes>
                <Route path="*">
                    <App/>
                </Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
