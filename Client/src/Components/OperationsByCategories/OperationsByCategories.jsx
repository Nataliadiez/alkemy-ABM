import {Container, Typography, Table, TableBody, TableCell, ButtonGroup, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import Axios from 'axios';
import { useEffect, useState } from 'react';

const useStyles = makeStyles({
    table: {
        minWidth: 800,
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
    divCategoryButtons:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      '& > *': {
        margin: "40px",
    }},
    buttonCategory: {
        border: "none",
        cursor: "pointer",
        fontSize: "15px",
        padding: "10px",
        backgroundColor: "whitesmoke",
        fontWeight: "bolder",
        color: "grey",
        "&:hover":{
            color: "#2c9caf",
            
        }
    }
})



const OperationsByCategories = () => {
    const [operations, setOperations] = useState([])
    const classes = useStyles();
    const [category, setCategory] = useState("")

    const setConfig = () =>{
        return {
            headers: {
              'x-access-token': localStorage.getItem("token")
            }
        }
    }

    const conexionApi = async() => {
        const config = setConfig()
        let url = "http://localhost:3600/api/operations/last_operations"
        const response = await Axios.get(url, config)
        setOperations(response.data)
    }
    
    useEffect(() => {
        conexionApi()
    }, [])
    
    const showByCategory = (e) => {
        setCategory(e.target.name)
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
            Operations by categories
        </Typography>

        <div className={classes.divCategoryButtons}>
          <ButtonGroup variant="text" aria-label="text primary button group">
            <button
            className = {classes.buttonCategory} 
            name="library" 
            onClick={(e) => showByCategory(e)}>
                Library
            </button>

            <button 
            className = {classes.buttonCategory} 
            name="food" 
            onClick={(e) => showByCategory(e)}>
                Food
            </button>

            <button 
            className = {classes.buttonCategory} 
            name="salary" 
            onClick={(e) => showByCategory(e)}>
                Salary
            </button>

            <button 
            className = {classes.buttonCategory} 
            name="services" 
            onClick={(e) => showByCategory(e)}>
                Services
            </button>

            <button 
            className = {classes.buttonCategory} 
            name="cleanning" 
            onClick={(e) => showByCategory(e)}>
                Cleanning
            </button>

            <button 
            className = {classes.buttonCategory} 
            name="other" 
            onClick={(e) => showByCategory(e)}>
                Other
            </button>
          </ButtonGroup>
        </div>

        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                      <TableCell align="left">Concept</TableCell>
                      <TableCell align="left">Type</TableCell>
                      <TableCell align="left">Amount</TableCell>
                      <TableCell align="left">Date</TableCell>
                      <TableCell align="left">Category</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
            {operations.map((operation) => {
                const date = (operation.date.substring(0, 10))
                if(operation.category === category){
                    return (
                        <TableRow key={operation.concept}>
                          <TableCell component="th" scope="row">{operation.concept}</TableCell>
                          <TableCell align="left">{operation.type}</TableCell>
                          <TableCell align="left">{operation.amount}</TableCell>
                          <TableCell align="left">{date}</TableCell>
                          <TableCell align="left">{operation.category}</TableCell>
                        </TableRow>
                )
                }
                return(<></>)
            })}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
    )
}

export default OperationsByCategories