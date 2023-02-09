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
import AddInstrument from "./pages/Student/instrument/AddInstrument";
import EditInstrument from "./pages/Student/instrument/EditInstrument";
import Teacher from "./pages/Teacher/Teacher";
import AddStudent from "./pages/Student/AddStudent";
import AddTeacher from "./pages/Teacher/AddTeacher";
import Teacher_Details from "./pages/Teacher/Teacher_Detail";
import UserInvoice from "./pages/invoice/Read_invoice/UserInvoice";
import Payment from "./pages/invoice/payment/Payment";

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
  return (
    <Router>
      <>
        <Routes>
          <Route
            path="/home/:token"
            element={[
              <Account>
                <Navbar />,
                <AppContainer>
                  <Home />
                </AppContainer>
                ,
              </Account>,
            ]}
          />
          <Route
            path="/students/:token"
            element={[
              <Account>
                <Navbar />,
                <AppContainer>
                  <Student />
                </AppContainer>
                ,
              </Account>,
            ]}
          />
          <Route
            path="/teachers/:token"
            element={[
              <Account>
                <Navbar />,
                <AppContainer>
                  <Teacher />
                </AppContainer>
                ,
              </Account>,
            ]}
          />
          <Route
            path="/products/:token"
            element={[
              <Account>
                <Navbar />, <Student />
              </Account>,
            ]}
          />
          <Route
            path="/view_invoice/:token/:student_id"
            element={[
              <Account>
                <Navbar />, <AllInvoice />
              </Account>,
            ]}
          />
          <Route
            path="/view_invoice/:token"
            element={[
              <Account>
                <Navbar />, <UserInvoice />
              </Account>,
            ]}
          />
          <Route
            path="/paid_invoice/:token/:invoice_id"
            element={[
              <Account>
                <Payment />
              </Account>,
            ]}
          />
          <Route
            path="/invoice/:token/:student_id"
            element={[
              <Account>
                <Navbar />, <Invoice />
              </Account>,
            ]}
          />

          <Route
            path="/"
            element={[
              <Account>
                <Status />
                <Slider />
              </Account>,
            ]}
          />
          <Route
            path="/Calendar/:token"
            element={[
              <Account>
                <Navbar />, <Calendar />
              </Account>,
            ]}
          />
          <Route
            path="/avatar"
            element={[
              <Account>
                <Navbar />, <MTable />
              </Account>,
            ]}
          />
          <Route
            path="/students/:token/:student_id"
            element={[
              <Account>
                <Navbar />, <Student_details />
              </Account>,
            ]}
          />
          <Route
            path="/teachers/:token/:teacher_id"
            element={[
              <Account>
                <Navbar />, <Teacher_Details />
              </Account>,
            ]}
          />
          <Route
            path="/students/add_Instrument/:token/:student_id"
            element={[
              <Account>
                <Navbar />, <AddInstrument />
              </Account>,
            ]}
          />
          <Route
            path="/students/reg-student/:token"
            element={[
              <Account>
                <Navbar />, <AddStudent />
              </Account>,
            ]}
          />
          <Route
            path="/students/reg-teacher/:token"
            element={[
              <Account>
                <Navbar />, <AddTeacher />
              </Account>,
            ]}
          />
          <Route
            path="/students/edit_instrument/:token/:student_id/:instrument_id"
            element={[
              <Account>
                <Navbar />, <EditInstrument />
              </Account>,
            ]}
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;
