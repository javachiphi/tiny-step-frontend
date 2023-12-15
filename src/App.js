import logo from './logo.svg';
import './App.css';
import Navigation from './components/navigation';
import { Outlet } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <header>
        <Navigation />
      </header>
      <Outlet />
    </div>
  );
}

export default App;
