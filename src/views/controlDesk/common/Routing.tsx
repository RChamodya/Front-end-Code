import {Route, Router, Routes} from "react-router-dom";
import LandingPage from "./views/controlDesk/common/landingPage/LandingPage";
import CustomerCategory from "./views/controlDesk/customerCategory/CustomerCategory";
import Benefit from "./benefit/Benefit";
import IdentifyCustomer from "./identifyCustomer/Identify Customer";
import LoanAmount from "./views/controlDesk/loanAmount/LoanAmount";
import SubBenefit from "./subBenefit/SubBenefit";
import CustomerCategiryViewPage from "./views/controlDesk/customerCategory/CustomerCategiryViewPage";
import CustomerCategoryEditPage from "./views/controlDesk/customerCategory/CustomerCategoryEditPage";
import CategoryCreatePage from "./views/controlDesk/customerCategory/CategoryCreatePage";
import CreateLoanAmount from "./views/controlDesk/loanAmount/CreateLoanAmount";
import EditLoanAmount from "./views/controlDesk/loanAmount/EditLoanAmount";
import ViewLoanAmount from "./views/controlDesk/loanAmount/ViewLoanAmount";

function Routing(){

    return(
        <>

        <Routes>
          <Route path={"/"}  element={<LandingPage/>}/>
          <Route path={"/customerCategory"}  element={<CustomerCategory/>}/>
          <Route path={"/benefit"}  element={<Benefit/>}/>
          <Route path={"/identifyCustomer"}  element={<IdentifyCustomer/>}/>
          <Route path={"/loanAmount"}  element={<LoanAmount/>}/>
          <Route path={"/subBenefit"}  element={<SubBenefit/>}/>
          <Route path={"/viewCustomerCategory"}  element={<CustomerCategiryViewPage/>}/>
          <Route path={"/editCustomerCategory/*"}  element={<CustomerCategoryEditPage/>}/>
          <Route path={"/createCustomerCategory/*"}  element={<CategoryCreatePage/>}/>
          <Route path={"/createLoanAmount/*"}  element={<CreateLoanAmount/>}/>
          <Route path={"/editLoanAmount/*"}  element={<EditLoanAmount/>}/>
          <Route path={"/viewLoanAmount/*"}  element={<ViewLoanAmount/>}/>

        </Routes>



        </>
    )


}
export default Routing;