import {Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import Axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import {entryResult, egressResult} from '../TotalEntryAndEgress/TotalEntryAndEgress'
import ApiCallsContext from '../../Contexts/ApiCallsContext'
import {get} from '../../Services/apiCalls'

const useStyles = makeStyles({
    table: {
        minWidth: 450,
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
        marginBottom: "10px",
    },
    result: {
        color: "grey",
        textAlign: "center",
        margin: "15px"
    },
    tCell: {
        border: "#268391 solid 1px",

    }
})

const LastOperations = () => {
    const {BASE_URL} = useContext(ApiCallsContext);
    const [operations, setOperations] = useState([])
    const [lastOperations, setLastOperations] = useState([])
    const classes = useStyles();

    const connectionApi = async() => {
        const url = BASE_URL + "/operations"
        const res = await get(url)
        setOperations(res.data)
    }

    const lastTenOp = async() => {
        const url = BASE_URL + "/operations/last_operations"
        const res = await get(url)
        setLastOperations(res.data)
    }

    useEffect(() => {
        lastTenOp()
        connectionApi()
    }, [])
    
    
    
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
            Last ten movements
        </Typography>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead >
                    <TableRow >
                        <TableCell  align="center">User</TableCell>
                        <TableCell  align="center">Concept</TableCell>
                        <TableCell  align="center">Type</TableCell>
                        <TableCell  align="center">Amount</TableCell>
                        <TableCell  align="center">Date</TableCell>
                        <TableCell  align="center">Category</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
            {lastOperations.map((operation) => {
                const date = (operation.date.substring(0, 10))
            return (
                    <TableRow key={operation.concept}>
                        <TableCell  align="center">{operation.name}</TableCell>
                        <TableCell  align="center">{operation.concept}</TableCell>
                        <TableCell  align="center">{operation.type}</TableCell>
                        <TableCell  align="center">{operation.amount}</TableCell>
                        <TableCell  align="center">{date}</TableCell>
                        <TableCell  align="center">{operation.category}</TableCell>
                    </TableRow>
            )
            })}
                </TableBody>
            </Table>
        </TableContainer>
        <Typography variant="h4" className={classes.result}>
            Result: {entryResult(operations) - egressResult(operations)}
        </Typography>
    </Container>
    )
}

export default LastOperations