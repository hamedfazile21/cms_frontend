
import Home from "./routes/home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./components/nav-bar";
import CreateCustomer from "./routes/create-customer";
import CreateCustomerStatus from "./routes/create-customer-status";
import CreateCustomerDiseases from "./routes/create-customer-diseases";
import CustomerDetails from "./routes/customer-details";
import { ToastContainer } from "react-toastify";
import CustomerFactor from "./routes/customer-factor";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="create_customer/:id/:method/"
            element={<CreateCustomer />}
          />
          <Route
            path="create_customer_status/:id/:method/"
            element={<CreateCustomerStatus />}
          />
          <Route
            path="create_customer_diseases/:id/:method/"
            element={<CreateCustomerDiseases />}
          />
          <Route path="customer_details/:id/" element={<CustomerDetails />} />
          <Route path="customer_factor/:id/" element={<CustomerFactor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
