import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Account } from "./pages/login Page/Accounts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import Invoice from "./pages/invoice/Invoice";
import InvoiceGenerator from "./pages/invoice/InvoiceTest";
import tw from "twin.macro";
import Login_page from "./pages/login Page/Login_page";
import { getMonth } from "./pages/calendar/components/util";
import Calendar from "./pages/calendar/Calendar";
import Status from "./pages/login Page/Status";
import Settings from "./pages/Account/Settings";
import ForgetPassword from "./pages/login Page/ForgetPassword";
import ConfirmRegistration from "./pages/login Page/ConfirmRegistration";
import Attributes from "./pages/Account/Attributes";
import Slider from "./pages/ToggleSwitch/Slider";

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

function App() {
  console.table(getMonth());
  return (
    <Router>
      <>
        <Routes>
          <Route
            path="/home/:token"
            element={[
              <Navbar />,
              <AppContainer>
                <Home />
              </AppContainer>,
            ]}
          />
          <Route
            path="/teachers/:token"
            element={[
              <Navbar />,
              <AppContainer>
                <Teacher />
              </AppContainer>,
            ]}
          />
          <Route path="/products/:token" element={[<Navbar />, <Student />]} />
          <Route path="/invoice/:token" element={[<Navbar />, <InvoiceGenerator />]} />
          <Route path="/pdf/:token" element={[<Navbar />, <Invoice />]} />

          <Route
            path="/"
            element={[
              <Account>
                <Status />
                <Slider />
              </Account>
            ]}
          />
          <Route path="/Calendar/:token" element={[<Navbar />, <Calendar />]} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
