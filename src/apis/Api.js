import React from "react";
import Axios from "axios";
import { decodeToken } from "react-jwt";

//Authentication
export async function authentication(data) {
  if (localStorage.getItem("token") !== null) {
    const role = decodeToken(localStorage.getItem("token"));
    return role["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  } else {
    try {
      const response = await Axios.post(
        "https://swmosaicapp.azurewebsites.net/api/Authentication",
        data
      );
      localStorage.setItem("token", response.data.token);

      const myObj = decodeToken(response.data.token);
      return myObj[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    } catch (error) {
      return [];
    }
  }
}

export async function getFormulaData(data) {
  // authentication().then(async (res) => {
  //   if (res === "Admin") {
  //   }
  // });
  try {
    const response = await Axios.get(
      `https://swmocsaic.azurewebsites.net/api/Formula?usageID=${data.usageID}&formulaStatus=${data.formulaStatus}`
    );
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function getQualityData() {
  // authentication().then(async (res) => {
  //   if (res === "Admin") {
  //   }
  // });
  try {
    const response = await Axios.get(
      "https://swmocsaic.azurewebsites.net/api/Quality"
    );
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function getSearchHints(value) {
  // authentication().then(async (res) => {
  //   if (res === "Admin") {
  //   }
  // });
  try {
    const response = await Axios.get(
      "https://swmocsaic.azurewebsites.net/api/SerachCriteria?searchCriteria=" +
        value
    );
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function usageSearchReasults(obj) {
  // authentication().then(async (res) => {
  //   if (res === "Admin") {
  //   }
  // });
  try {
    const response = await Axios.post(
      "https://swmocsaic.azurewebsites.net/api/UsageSearchResults",
      obj
    );
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function formulaDetails(id) {
  // authentication().then(async (res) => {
  //   if (res === "Admin") {
  //   }
  // });
  try {
    const response = await Axios.get(
      `https://swmocsaic.azurewebsites.net/api/Formula/FormulaDetails?formulaID=${id}`
    );


    return response.data;
  } catch (error) {
    return [];
  }
}
