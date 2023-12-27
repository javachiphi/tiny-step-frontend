import './App.css';
import Navigation from './components/navigation/navigation';
import { Outlet } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { muiTheme } from './styles/muiTheme';
import { joyTheme } from './styles/joyTheme';




function App() {
  return (
    <div className="App">
        <header>
        <MuiThemeProvider theme={muiTheme}>
          <Navigation />
        </MuiThemeProvider>
        </header>
        <div className="App-center">
        <Outlet />
        </div>
      </div>
  );
}

export default App;
