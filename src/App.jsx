import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Body from "./Body";
import Header from "./Header";

function App() {
  return(
    <div className="App">

        <Header/>
        <Body/>
        
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
