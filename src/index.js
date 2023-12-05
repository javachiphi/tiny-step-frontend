import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OnboardingPage from './components/onboardingPage';
import EntryForm from './components/entryForm';
import MyPage from './components/myPage';
import TagSelect from './components/tagSelect';
import TagForm from './components/tagForm';
import MyTags from './components/myTags';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
    
      <Route path="/" element={<App />}>
        <Route index element={<TagForm />} />
        <Route path="onboarding" element={<OnboardingPage />} />
        <Route path="entry" element={<EntryForm />} />
        <Route path="*" element={"Nothing here!"} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
