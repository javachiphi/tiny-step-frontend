import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OnboardingPage from './components/onboardingPage';
import EntryForm from './components/entryForm';
import MyTags from './components/myTags';
import { Auth0Provider } from '@auth0/auth0-react';
import Welcome from './components/welcome';
import EntriesByTag from './components/entriesByTag';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://diary/api",
      scope: "read:current_user update:current_user_metadata"
    }}
>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Welcome />} />
          <Route path="diary" element={<EntriesByTag />} />
          <Route path="tags" element={<MyTags />} />
          <Route path="onboarding" element={<OnboardingPage />} />
          <Route path="create" element={<EntryForm />} />
          <Route path="*" element={"Nothing here!"} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
