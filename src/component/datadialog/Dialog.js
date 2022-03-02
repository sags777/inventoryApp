import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import useStyles from "./style";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InfoIcon from "@mui/icons-material/Info";
import { FormControlLabel, IconButton } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import { formulaDetails } from "../../apis/Api";
import CompareIcon from '@mui/icons-material/Compare';

const InfoEdit = ({ formulaNumber, info }) => {
    const handleEditClick = () => {
        // some action
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                
                <Grid item xs={6} style={{ marginTop: "13px", "marginRight": "12px", "marginLeft": "12px" }}>
                <CompareIcon style={{marginRight: "10px"}}></CompareIcon>
                    {formulaNumber}
                </Grid>
                
                <Grid item xs={4}>
                    {info === "" ? (
                        <div></div>
                    ) : (
                        <FormControlLabel
                            control={
                                <Tooltip title={info} placement="top">
                                    <IconButton
                                        color="primary"
                                        aria-label="add an alarm"
                                        onClick={handleEditClick}
                                    >
                                        <InfoIcon style={{ marginLeft: "2px" }} />
                                    </IconButton>
                                </Tooltip>
                            }
                        />
                
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default function FormulaDialog(props) {
    console.log("props", props.formulaData)
    const [pageSize, setPageSize] = React.useState(5);
    const classes = useStyles();
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 815,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const handleClose = () => {
        props.setModalOpen(false);
    };

    const getFormulaDetails = (id) => {
        formulaDetails(id).then((response) => {
            props.formDetails(response)
        });
    };

    const getGridColumns = () => {
        return [
            // {
            //     field: "compare",
            //     headerName: "Compare",
            //     width: 100,
            //     headerClassName: "super-app-theme--header",
            //     cellClassName: "super-app-theme--cell",
            // },
            {
                field: "formulaNumber",
                headerName: "Formula",
                width: 190,
                headerClassName: "super-app-theme--header",
                cellClassName: "super-app-theme--cell",
                renderCell: (params) => {
                    return (
                        <div
                            className="d-flex justify-content-between align-items-center"
                            style={{ cursor: "pointer" }}
                            onClick={() => getFormulaDetails(params.row.formulaID)} //<-<<< here
                        >
                            <InfoEdit
                                formulaNumber={params.row.formulaNumber}
                                info={params.row.info}
                            />
                        </div>
                    );
                },
            },
            {
                field: "formulaID",
                headerName: "ID",
                width: 100,
                headerClassName: "super-app-theme--header",
            },
            {
                field: "product",
                headerName: "Product",
                width: 100,
                headerClassName: "super-app-theme--header",
            },
            {
                field: "date",
                headerName: "Date",
                width: 150,
                headerClassName: "super-app-theme--header",
            },
            {
                field: "chips",
                headerName: "Chips",
                width: 210,
                headerClassName: "super-app-theme--header",
            },
        ];
    };

    const cellClick = () => {
        //todo
    };

    if (props.formulaData && props.formulaData.rows) {
        props.formulaData.rows.forEach(function (item, index) {
            props.formulaData.rows[index]["id"] = index;
            props.formulaData.rows[index]["compare"] = "Compare";
        });
    }

    return (
        <div className={classes.container}>
            <Modal
                open={props.modalState}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
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


                        <div style={{ height: 470, width: '100%' }}>
                            <div style={{ display: 'flex', height: '100%' }}>
                                <div style={{ flexGrow: 1 }}>
                                    <p className={classes.gridheader}>Available Formulas For Usage</p>
                                    <p className={classes.gridheader}>{props.formulaData.colorSource}/{props.formulaData.colorDetails}</p>
                                    <div style={{}} className={classes["data-grid"]}>
                                        {/* <div style={{}} className={classes.grid}> */}
                                        <DataGrid
                                            columns={getGridColumns()}
                                            rows={props.formulaData.rows}
                                            pageSize={pageSize}
                                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                            rowsPerPageOptions={[5, 10, 20]}
                                            onCellClick={cellClick}
                                            pagination
                                        />
                                        {/* </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                    <Box
                        component="span"
                        m={1}
                        className={`${classes.bottomLeftBox} ${classes.box}`}
                    >
                        <Button variant="contained" onClick={handleClose}>
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
