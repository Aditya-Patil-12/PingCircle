import './App.css'

import { useState } from 'react'
import {BrowserRouter , Route } from 'react-router-dom';


// JSX Imports ====
import { HomePage , ChatPage } from './pages';
// ================


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Route path="/" component={HomePage} />
        <Route path="/chats" component={ChatPage} />
      </BrowserRouter>
    </div>
  );
}

export default App
