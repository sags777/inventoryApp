import React, { useState, useEffect } from "react";
import useStyles from "./style";
import {
  Container,
  Card,
  createTheme,
  ThemeProvider,
  Grid,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Button,
  Autocomplete,
  CircularProgress,
  Box,
} from "@mui/material";
import {
  getQualityData,
  getSearchHints,
  usageSearchReasults,
} from "../../apis/Api";
import MyComponent from "react-fullpage-custom-loader";
import { FormControlLabel, IconButton } from "@material-ui/core";
import Tooltip from "@mui/material/Tooltip";
import ClearAllIcon from "@mui/icons-material/ClearAll";
function Search(props) {
  //Use of style.js
  const classes = useStyles();
  //Theme for search bar
  const darkTheme = createTheme({ palette: { mode: "dark" } });

  //Search bar fields
  const [search, setSearch] = useState("");
  const [qualities, setQualities] = useState();
  const [stats, setStats] = useState();

  //Quality Lodaing
  const [isLoading, setIsloading] = useState();

  //Search Loader
  const [loader, setLoader] = useState(false);
  const [spinner, setSpinner] = useState("none");

  //Validationg search field
  const [searchValidate, setSearchValidate] = useState("none");

  //Quality content from api
  const [qualityData, setQualityData] = useState([]);

  //Search appplied
  const [isSearchApplied, setIsSearchApplied] = useState(false);

  useEffect(() => {
    //Getting the quality dropdown data
    getQualityData()
      .then((response) => {
        setQualityData(response);
        setIsloading(true);
        let prevSearch = localStorage.getItem("searchObj");
        if (prevSearch) {
          let obj = JSON.parse(prevSearch);
          if (obj.searchString && obj.qualityId && obj.status) {
            console.log("seafchObj", obj);
            usageSearchReasults(obj).then((response) => {
              setIsSearchApplied(true);
              setQualities(obj.qualityId);
              setSearch(obj.searchString);
              setStats(obj.status);
              searchHintData(obj.searchString);
              setSearchValidate("none");
              props.updateGrid(response);
              // props.newSearch(true); /// 2nd search show grid hide fdetails
              props.isSearchAppliedFlag(true);
              setLoader(false);
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Getting search hints
  const [searchHint, setSearchHint] = useState([]);
  const searchHintData = (value) => {
    if (value.length === 2) {
      setSpinner("");
    }
    if (value.length > 2) {
      getSearchHints(value).then((response) => {
        let newArray = response;
        newArray.sort(function (a, b) {
          var nameA = a.searchString.toUpperCase();
          var nameB = b.searchString.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        setSearchHint(newArray);
        setSpinner("none");
      });
    }
    if (value.length < 2) {
      setSpinner("none");
      setSearchHint([]);
    }
  };

  //Making search calls
  const searchColors = () => {
    if (search === undefined || search === "") {
      setSearchValidate("");
      return null;
    }

    const obj = {
      searchString: search,
      qualityId:
        qualities === undefined || qualities === ""
          ? "all"
          : qualities.toString(),
      status: stats === undefined || stats === "" ? "both" : stats,
    };
    setQualities(obj.qualityId);
    setStats(obj.status);
    localStorage.setItem("searchObj", JSON.stringify(obj));
    getSearchResults(obj);
  };

  const getSearchResults = (obj) => {
    usageSearchReasults(obj).then((response) => {
      setSearchValidate("none");
      props.updateGrid(response);
      props.newSearch(true); /// 2nd search show grid hide fdetails
      props.isSearchAppliedFlag(true);
      setIsSearchApplied(true);
      setLoader(false);
    });
  };

  const removeSearch = () => {
    localStorage.setItem("searchObj", "");
    setQualities("");
    setSearch("");
    setStats("");
    props.updateGrid([]);
    setIsSearchApplied(false);
    props.isSearchAppliedFlag(false);
  };

  return (
    <div>
      {loader ? (
        <MyComponent sentences={[]} />
      ) : (
        <div className={classes.container}>
          <ThemeProvider theme={darkTheme}>
            <Container>
              <Card className={classes.card}>
                <Grid container spacing={2} sx={{ m: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      "& > :not(style)": {
                        m: 1,
                        width: 260,
                        maxHeight: 100,
                        marginBottom: 1,
                      },
                    }}
                  >
                    <Autocomplete
                      freeSolo
                      onInputChange={(event, newInputValue) => {
                        setSearch(newInputValue);
                        searchHintData(newInputValue);
                      }}
                      id="controllable-states-demo"
                      options={searchHint.map((option) => option.searchString)}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <div>
                          <TextField
                            {...params}
                            label="Enter search criteria"
                            style={{ width: "" }}
                          />
                          <CircularProgress
                            size={25}
                            style={{
                              position: "absolute",
                              marginLeft: "-35px",
                              marginTop: "15px",
                              display: spinner,
                            }}
                          />
                          <p
                            style={{
                              color: "red",
                              display: searchValidate,
                              marginBottom: 0,
                            }}
                          >
                            Field cannot be empty
                          </p>
                        </div>
                      )}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      "& > :not(style)": {
                        m: 1,
                        width: 260,
                        maxHeight: 100,
                        marginBottom: 1,
                      },
                    }}
                  >
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel>Select Qualities</InputLabel>
                      <Select
                        value={qualities || ""}
                        label="Qualities"
                        onChange={(e) => setQualities(e.target.value)}
                      >
                        <MenuItem value="all">All</MenuItem>
                        {isLoading ? (
                          qualityData.map((data, index) => {
                            return (
                              <MenuItem key={index} value={data.qualityID}>
                                {data.qualityName}
                              </MenuItem>
                            );
                          })
                        ) : (
                          <MenuItem>Loading..</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      "& > :not(style)": {
                        m: 1,
                        width: 260,
                        maxHeight: 100,
                        marginBottom: 1,
                      },
                    }}
                  >
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={stats || ""}
                        label="Status"
                        onChange={(e) => setStats(e.target.value)}
                      >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                        <MenuItem value="both">Both</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      "& > :not(style)": {
                        m: 1,
                        width: 230,
                        maxHeight: 100,
                        marginBottom: 1,
                      },
                    }}
                  >
                    <Button
                      sx={{ width: "100%", height: "55px" }}
                      variant="contained"
                      onClick={() => searchColors()}
                    >
                      Search
                    </Button>
                  </Box>
                  {isSearchApplied ? (
                    <FormControlLabel
                      control={
                        <Tooltip title="Clear Search" placement="top">
                          <IconButton
                            color="primary"
                            aria-label="add an alarm"
                            onClick={removeSearch}
                            className={classes.clearBtn}
                          >
                            <ClearAllIcon style={{ marginLeft: "2px" }} />
                          </IconButton>
                        </Tooltip>
                      }
                    />
                  ) : (
                    ""
                  )}
                </Grid>
              </Card>
              <hr />
            </Container>
          </ThemeProvider>
        </div>
      )}
    </div>
  );
}

export default Search;
