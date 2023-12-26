import logo from './logo.svg';
import './App.css';
import Navigation from './components/navigation/navigation';
import { Outlet } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <header>
        <Navigation />
      </header>
      <div className="App-center">
      <Outlet />
      </div>
    </div>
  );
}

export default App;
