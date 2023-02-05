import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Account } from "./pages/login Page/Accounts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import Student from "./pages/Student";
import Student from "./pages/Student/Student";
import Invoice from "./pages/invoice/Invoice";
import InvoiceGenerator from "./pages/invoice/InvoiceTest";
import tw from "twin.macro";
import Login_page from "./pages/login Page/Login_page";
import { getMonth } from "./pages/calendar/components/util";
import Calendar from "./pages/calendar/Calendar";
import MTable from "./components/MTable";
import Status from "./pages/login Page/Status";
import Settings from "./pages/Account/Settings";
import ForgetPassword from "./pages/login Page/ForgetPassword";
import ConfirmRegistration from "./pages/login Page/ConfirmRegistration";
import Attributes from "./pages/Account/Attributes";
import Slider from "./pages/ToggleSwitch/Slider";
import AllInvoice from "./pages/invoice/Read_invoice/AllInvoice";
import Student_details from "./pages/Student/Student_details";

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
            path="/students/:token"
            element={[
              <Navbar />,
              <AppContainer>
                <Student />
              </AppContainer>,
            ]}
          />
          <Route path="/products/:token" element={[<Navbar />, <Student />]} />
          <Route path="/invoice_edit/:token" element={[<Navbar />, <AllInvoice />]} />
          <Route path="/invoice/:token/:student_id" element={[<Navbar />, <Invoice />]} />

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
          <Route path="/avatar" element={[<Navbar />, <MTable />]} />
          <Route path="/students/:token/:student_id" element={[<Navbar />, <Student_details />]} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
