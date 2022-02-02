import React, { useState } from "react";
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
} from "@mui/material";

function Search() {
  const classes = useStyles();

  const [search, setSearch] = useState();
  const [qualities, setQualities] = useState();
  const [stats, setStats] = useState();

  const darkTheme = createTheme({ palette: { mode: "dark" } });

  const handleClick = () => {
    const obj = {
      search: search,
      qualities: qualities,
      status: stats,
    };

    console.log("res", obj);
  };

  return (
    <div className={classes.container}>
      <ThemeProvider theme={darkTheme}>
        <Container>
          <Card className={classes.card}>
            <Grid container spacing={2} sx={{ m: 3 }}>
              <Grid item xs={3} container>
                <TextField
                  label="Enter Search Criteria"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  value={search || ""}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Grid>
              <Grid item xs={3} container>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel>Select Qualities</InputLabel>
                  <Select
                    value={qualities || ""}
                    label="Qualities"
                    onChange={(e) => setQualities(e.target.value)}
                  >
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3} container>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={stats || ""}
                    label="Status"
                    onChange={(e) => setStats(e.target.value)}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Both">Both</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2} container>
                <Button
                  sx={{ width: "100%" }}
                  variant="contained"
                  onClick={()=>handleClick()}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Search;
