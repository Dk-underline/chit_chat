import React from 'react';
import Home from './components/home/Home';
import { Routes, Route } from "react-router-dom";
import Status from './components/status/Status';
import StatusViwer from './components/status/StatusViwer';
import SignIn from './components/register/SignIn';
import SignUp from './components/register/SignUp';
function App() {
  // console.log("This is App Components");
  return (
    <><div>
      <Routes>
        <Route exact path="/" element={<Home/>}> </Route>
        <Route exact path="/status" element={<Status/>}></Route>
        <Route exact path="/status/:userId" element={<StatusViwer/>}></Route>
        <Route exact path="/signIn" element={<SignIn/>}></Route>
        <Route exact path="/signUp" element={<SignUp/>}></Route>
      </Routes>
    </div>
    </>
  );
}

export default App;
