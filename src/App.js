import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import tw from "twin.macro";

const AppContainer = tw.div`
  w-full
  max-w-full
  flex
  flex-col
  items-center
  justify-center
  pt-6
  pb-10
  pl-0
  pr-0
`;

const Title = tw.h1`
  text-2xl
  font-semibold
`;

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route
            path="/"
            element={[
              <Navbar />,
              <AppContainer>
                <Home />
              </AppContainer>,
            ]}
          />
          <Route path="/teachers" element={[<Navbar />, <AppContainer><Teacher /></AppContainer>]} />
          <Route path="/products" element={[<Navbar />, <Student />]} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
