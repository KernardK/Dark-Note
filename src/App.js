import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import NotesPage from "./pages/NotesPage";
import NotePage from "./pages/NotePage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* Has to have exact because al pages start with the '/', to render page when route is exact */}
        <Route component={NotesPage} path="/" exact />
        <Route component={NotePage} path="/note/:id" />
      </div>
    </Router>
  );
}

export default App;
