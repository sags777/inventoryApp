import React from "react";
import Footer from "../component/footer/Footer";
import Header from "../component/header/Header";
import Search from "../component/search/Search";
import { Divider } from "@mui/material";

function Main(props) {
  return (
    <div>
      <Header />
      <Search />
      <Divider sx={{ margin: "40px 0px 0px 0px" }} />
      <Footer />
    </div>
  );
}

export default Main;
