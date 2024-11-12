import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import './App.css';
import Homescreen from './pages/Homescreen';
import Navbar from './components/Navbar';
import Details from './pages/Details';
import Browse from './pages/Browse';
import BrowseByGenre from './pages/BrowseByGenre';
import Search from './pages/Search';
import SignUp from './auth/SignUp';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        {/* <Route path = '/' element = {<Homescreen/>}></Route> */}
        <Route path = '/' element = {<SignUp/>}></Route>
        <Route path='/details/:platform/:id' element = {<Details/>}></Route>
        <Route path='/browse/:platform' element = {<Browse/>}></Route>
        <Route path='/browsebygenre/:platform/:id' element = {<BrowseByGenre/>}></Route>
        <Route path='/search' element={<Search/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
