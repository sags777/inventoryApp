import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { useDialog } from "muibox";
import Box from "@mui/material/Box";
import useStyles from "./style";
import FormulaDialog from "../datadialog/Dialog";
import { getFormulaData } from "../../apis/Api";
import { Container } from "@mui/material";
import MyComponent from "react-fullpage-custom-loader";
import PaletteIcon from '@mui/icons-material/Palette';
import { toast } from 'react-toastify';
import { FormControlLabel, IconButton } from "@material-ui/core";
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const BucketIcon = ({ colorSource, usageId }) => {
  const handleEditClick = () => {
    // some action
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>  
        <Grid item xs={8} style={{ marginTop: "13px" }}>
          <div style={{"white-space": "break-spaces"}}>  {colorSource}</div>
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Tooltip title="View Formula" placement="top">
                <IconButton
                  color="primary"
                  aria-label="add an alarm"
                  onClick={handleEditClick}
                >
                  <PaletteIcon style={{ marginLeft: "40px" }} />
                </IconButton>
              </Tooltip>
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default function FormulaDataGrid(props) {
  const [pageSize, setPageSize] = React.useState(5);
  const [finalClickInfo, setFinalClickInfo] = React.useState(null);
  const [formulaData, setFormulaData] = React.useState([]);
  const dialog = useDialog();
  const classes = useStyles();

  //Loader
  const [loader, setLoader] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formulaDetails = (response) => {
    props.formDetails(response)
  }

  const handleOnCellClick = (params) => {
    setFinalClickInfo(params);

    if (params.field === "colorSource") {
      setLoader(true);
      let data = { formulaStatus: props.status, usageID: params.row.usageId }
      getFormulaData(data).then((response) => {
        if (response.length) {
          let data = { rows: response, colorSource: params.row.colorSource, colorDetails: params.row.colorDetails }
          toast.info("Formula data Loaded.");
          setFormulaData(data);
          setOpen(true);
        } else {
          toast.info("Formula data not available.");
        }
        setLoader(false);
      });
    }
  };

  const getGridColumns = () => {
    return [
      {
        field: "colorSource",
        headerName: "Color Source",
        width: 210,
        headerClassName: "super-app-theme--header",
        renderCell: (params) => {
          return (
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
            >
              <BucketIcon colorSource={params.row.colorSource} colorDetails={params.row.colorDetails} usageId={params.row.usageId} />
            </div>
          )
        }
      },
      // {
      //   field: "formulas",
      //   headerName: "Formulas",
      //   width: 150,
      //   headerClassName: "super-app-theme--header",
      //   cellClassName: "super-app-theme--cell",
      // },
      {
        field: "colorDetails",
        headerName: "Color Details",
        width: 400,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "part",
        headerName: "Part",
        width: 200,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "region",
        headerName: "Region",
        width: 200,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "relatedColors",
        headerName: "Related Colors",
        width: 200,
        headerClassName: "super-app-theme--header",
      },
    ];
  };

  if (props.data) {
    props.data.forEach(function (item, index) {
      props.data[index]["id"] = index;
      props.data[index]["formulas"] = "view";
    });
  }

  const clearSearchHistory = () => {
    localStorage.setItem('searchObj', "");
  }

  return (
    <div className={classes.container}>
      {props.data ? (
        <Container>
          <Box
            sx={{
              display: "data-grid",
              "& .super-app-theme--header": {
                backgroundColor: "#a7cbe9",
                fontFamily: "auto",
                fontSize: "medium"
              },
              "& .super-app-theme--cell": {
                color: "blue",
                fontWeight: "600",
                "text-decoration": "underline",
                cursor: "pointer",
              },
            }}
          >

            <div style={{ height: 400, width: '100%' }}>
              <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={10}>
                      <p className={classes.gridheader}>Usages</p>
                    </Grid>
                    <Grid item xs={2} className={classes.topRightBox}>
                      {/* <Button variant="contained" className={classes.topRightBox} onClick={clearSearchHistory}>
                        Clear Search
                      </Button> */}
                    </Grid>

                  </Grid>


                  <div style={{}} className={classes["data-grid"]}>
                    <DataGrid
                      columns={getGridColumns()}
                      rows={props.data}
                      pageSize={pageSize}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      rowsPerPageOptions={[5, 10, 20]}
                      onCellClick={handleOnCellClick}
                      pagination
                      sx={{
                        boxShadow: 2,
                        borderColor: "primary.light",
                        "& .MuiDataGrid-cell:hover": {
                          color: "primary.main",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Box>
          {loader ? (
            <MyComponent sentences={[]} />
          ) : (
            <FormulaDialog
              setModalOpen={setOpen}
              modalState={open}
              formulaData={formulaData}
              formDetails={formulaDetails}
            />
          )}
        </Container>
      ) : null}
    </div>
  )

}