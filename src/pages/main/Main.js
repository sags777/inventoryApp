import React, { useState, useEffect } from "react";
import Search from "../../component/search/Search";
import FormulaDataGrid from "../../component/datagrid/Grid";
import FormulaDetails from "../formula details/FormulaDetails";
import Login from "../login/Login";

function Main(props) {
  const [data, setData] = useState();
  const [status, setStatus] = useState();

  const [showGrid, setShowGrid] = useState(true);
  const [showFdetails, setShowFdetails] = useState(false);

  const [fDetails, setFdetails] = useState(false);

  const [showSearch, setShowSearch] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isSearchApplied, setIsSearchApplied] = useState(false);

  const setSearchResults = (response, status) => {
    setData(response);
    setStatus(status);
  };

  const setSearchFlag = (flag) => {
    console.log("remove grid called", flag)
    setIsSearchApplied(flag)
  }    

  const setFormulaDetails = (response) => {
    setFdetails(response);
    setShowGrid(false);
    setShowFdetails(true);
  };

  const value = (response) => {
    if (response) {
      setShowGrid(true);
      setShowFdetails(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setShowSearch(true);
      setShowLogin(false);
    }
  }, []);

  return (
    <div style={{ minHeight: "100%" }}>
      {showSearch && <Search updateGrid={setSearchResults} newSearch={value} isSearchAppliedFlag={setSearchFlag} />}
      {showGrid && isSearchApplied && (
        <FormulaDataGrid
          data={data}
          status={status}
          formDetails={setFormulaDetails}
        />
      )}
      {showFdetails && <FormulaDetails fDetails={fDetails} />}
      {showLogin && <Login />}
    </div>
  );
}

export default Main;
