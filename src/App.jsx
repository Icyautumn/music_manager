import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Student from "./pages/Student"
import Teacher from "./pages/Teacher";
import Invoice from "./pages/invoice/Invoice";
import InvoiceGenerator from "./pages/invoice/InvoiceTest"
import tw from "twin.macro";
import Login_page from "./pages/login Page/Login_page";
import { getMonth } from './pages/calendar/components/util'
import Calendar from "./pages/calendar/Calendar";


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
  console.table(getMonth())
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
          <Route path="/invoice" element={[<Navbar />, <InvoiceGenerator />]} />
          <Route path="/invoice_edit" element={[<Navbar />, <Invoice />]} />
          <Route path="/login" element={[<Navbar />, <Login_page />]} />
          <Route path="/Calendar" element={[<Navbar />, <Calendar />]} />
          {/* <Route path="/save_file" element={[<Navbar />, <Test_invoice />]} /> */}
        </Routes>
      </>
    </Router>
  );
}

export default App;
