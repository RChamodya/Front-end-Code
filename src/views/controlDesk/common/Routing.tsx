import { Route, Router, Routes } from "react-router-dom";
import LandingPage from "./landingPage/LandingPage";
import CustomerCategory from "../customerCategory/CustomerCategory";
// import Benefit from "../benefit/Benefit";
import IdentifyCustomer from "../../../identifyCustomer/Identify Customer";
import LoanAmount from "../loanAmount/LoanAmount";
import SubBenefit from "../../../subBenefit/SubBenefit";
import CustomerCategiryViewPage from "../customerCategory/CustomerCategiryViewPage";
import CustomerCategoryEditPage from "../customerCategory/CustomerCategoryEditPage";
import CategoryCreatePage from "../customerCategory/CategoryCreatePage";
import CreateLoanAmount from "../loanAmount/CreateLoanAmount";
import EditLoanAmount from "../loanAmount/EditLoanAmount";
import ViewLoanAmount from "../loanAmount/ViewLoanAmount";
import React from "react";
import Benefit from "../benefit/Benefit";
import CreateMainBenefit from "../benefit/CreateMainBenefit";
import CreateSubBenefit from "../../../subBenefit/CreateSubBenefit";
import BenefitAllocation2 from "../loanAndBenefitAllocation/benefitAllocation/BenefitAllocation2";

function Routing() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/customerCategory"} element={<CustomerCategory />} />
        {/*<Route path={"/benefit"} element={<Benefit />} />*/}
        <Route path={"/identifyCustomer"} element={<IdentifyCustomer />} />
        <Route path={"/loanAmount"} element={<LoanAmount />} />
        <Route path={"/benefit"} element={<Benefit />} />
        <Route path={"/benefit/subBenefit/*"} element={<SubBenefit />} />
        <Route
          path={"/customerCategory/view/*"}
          element={<CategoryCreatePage />}
        />
        <Route path={"/createMainBenefit"} element={<CreateMainBenefit />} />
        <Route path={"/benefit/view/*"} element={<CreateMainBenefit />} />
        <Route path={"/benefit/edit/*"} element={<CreateMainBenefit />} />
        <Route
          path={"/benefit/subBenefit/create/*"}
          element={<CreateSubBenefit />}
        />
        <Route
          path={"/benefit/subBenefit/edit/*"}
          element={<CreateSubBenefit />}
        />{" "}
        <Route
          path={"/benefit/subBenefit/view/*"}
          element={<CreateSubBenefit />}
        />
        <Route
          path={"/customerCategory/edit/*"}
          element={<CategoryCreatePage />}
        />
        <Route
          path={"/customerCategory/create"}
          element={<CategoryCreatePage />}
        />
        <Route
          path={"/benefitAllocation"}
          element={<BenefitAllocation2 />}
        />
        <Route path={"/createLoanAmount/*"} element={<CreateLoanAmount />} />
        <Route
          path={"/createLoanAmount/edit/*"}
          element={<CreateLoanAmount />}
        />
        <Route
          path={"/createLoanAmount/view/*"}
          element={<CreateLoanAmount />}
        />
      </Routes>
    </>
  );
}
export default Routing;
