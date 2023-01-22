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
            path="/"
            element={[
              <Navbar />,
              <AppContainer>
                <Home />
              </AppContainer>,
            ]}
          />
          <Route
            path="/teachers"
            element={[
              <Navbar />,
              <AppContainer>
                <Teacher />
              </AppContainer>,
            ]}
          />
          <Route path="/products" element={[<Navbar />, <Student />]} />
          <Route path="/invoice" element={[<Navbar />, <InvoiceGenerator />]} />
          <Route path="/invoice_edit" element={[<Navbar />, <Invoice />]} />

          <Route
            path="/login"
            element={[
              <Account>
                <Status/>,
                <Navbar />, <Login_page />, <Settings />
              </Account>,
            ]}
          />
          <Route path="/Calendar" element={[<Navbar />, <Calendar />]} />
          <Route path="/ForgetPassword" element={[<Navbar />, <ForgetPassword />]} />
          <Route path="/confirmRegistration" element={[<Navbar />, <ConfirmRegistration />]} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
