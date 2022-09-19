import {Container, Typography, Table,Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import Axios from 'axios';
import { useEffect, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Swal from 'sweetalert2'
import {entryResult, egressResult} from '../TotalEntryAndEgress/TotalEntryAndEgress'
import ApiCallsContext from '../../Contexts/ApiCallsContext'
import {get, deleteResource} from '../../Services/apiCalls'

const useStyles = makeStyles({
    table: {
        minWidth: 705,
        "& .MuiTableCell-head":{
            margin: "5px",
            color: "#2c9caf",
            fontWeight: "bolder"
        },
        "& .MuiTableCell-root":{
            borderBottom: "solid 1px #79adad"
        },
    },
    title:{
        color: "grey",
        textAlign: "center",
        marginBottom: "10px"
    },
    result: {
        color: "grey",
        textAlign: "center",
        margin: "15px"
    },
    buttonEdit: {
        color: "#219ebc",
        border: "none",
        fontWeight: "bolder"
        
    },
    buttonDelete: {
        color: "red",
        border: "none",
        fontWeight: "bolder"
    }
})

const AllOperations = () => {
    const {BASE_URL} = useContext(ApiCallsContext);
    const [operations, setOperations] = useState([]);
    const classes = useStyles();
    const navigate = useNavigate();

    const connectionApi = async() => {
        const url = BASE_URL + "/operations"
        const res = await get(url)
        setOperations(res.data)
    }

    
    useEffect(() => {
        connectionApi()
    }, [])

    const deleteRegister = async(operation) => {
        const id = operation.id_operation
        const url = BASE_URL + `/operations/${id}`
        Swal.fire({
            title: `¿Are you sure you want to delete the register ${operation.concept} id:${id}?`,
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
          }).then((result) => {
            if (result.isConfirmed) {
                const res = deleteResource(url)
                Swal.fire('Register deleted', '', 'success')
                connectionApi()
                navigate('/operations')
            } 
          })
        
    }


    
    if (operations.length === 0)
    return (
    <>
        <Container maxWidth="sm">
            <Typography variant="h5" className={classes.title}>
                No movements yet
            </Typography>
        </Container>
    </>
    );
    return (
    <Container maxWidth="md">
        <Typography variant="h4" className={classes.title}>
            All movements
        </Typography>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow className={classes.tableRow}>
                        <TableCell align="left">Concept</TableCell>
                        <TableCell align="left">Type</TableCell>
                        <TableCell align="left">Amount</TableCell>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Category</TableCell>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                {operations.map((operation) => {
                const date = (operation.date.substring(0, 10))
                const id = operation.id_operation
                
            return (
                    <TableRow key={operation.concept}>
                        <TableCell component="th" scope="row">{operation.concept}</TableCell>
                        <TableCell align="left">{operation.type}</TableCell>
                        <TableCell align="left">{operation.amount}</TableCell>
                        <TableCell align="left">{date}</TableCell>
                        <TableCell align="left">{operation.category}</TableCell>
                        <TableCell align="left">
                            <Button variant="outlined" className={classes.buttonEdit} onClick={() => navigate(`/edit_register/${id}`)}>
                                <EditIcon/>
                            </Button>
                        </TableCell>
                        <TableCell align="left">
                            <Button variant="outlined" className={classes.buttonDelete} onClick={() => deleteRegister(operation)}>
                                <DeleteOutlineIcon/>
                            </Button>
                        </TableCell>
                    </TableRow>
                )
            })}
                </TableBody>
            </Table>
        </TableContainer>
        
         
              <Typography variant="h4" className={classes.result}>
                Result: {entryResult(operations) - egressResult(operations)}
                {/* {totalEntry - totalEgress} */}
              </Typography>
            
        
    </Container>
    )
}

export default AllOperations