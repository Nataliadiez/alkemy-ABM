import {useParams} from 'react-router-dom'
import { useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Container, Typography, TextField, Button, FormControl, InputLabel, Select} from '@material-ui/core';
import {useNavigate} from 'react-router-dom'
import ApiCallsContext from '../../Contexts/ApiCallsContext'
import {get, patch} from '../../Services/apiCalls'

const useStyles = makeStyles((theme) =>({
  container: {
    marginTop: "50px",
    marginBottom: "50px",
    padding: "20px",
    textAlign: "center",
    position: "relative",
    background: "rgba(255, 255, 255, 0.7)",
  },
  titleForm:{
    color: "darkgrey",
    letterSpacing: "3px",
    marginBottom: "10px"
  },
  form:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  formControl: {
    margin: "10px",
    minWidth: "100px",
    width: "100%",
    maxWidth: "40%",
  },
  select: {
    backgroundColor: "whitesmoke",
  },
  textField:{
    margin: "10px",
    minWidth: "100px",
    width: "100%",
    maxWidth: "40%",
    "& .MuiInputBase-input":{
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      color: "#268391",
      borderBottom: "2px solid lightgrey"
    },
    "& .MuiFormLabel-root":{
      color: "darkgrey"
    },
    "& .Mui-focused":{
      color: "#268391",
    },
    "& .MuiOutlinedInput-input":{
      color: "#268391"
    },
    "& .Mui-error .MuiInputBase-input ":{
      color: "red",
    },
    "& .Mui-error .MuiFilledInput-underline ":{
      borderBottom: "solid 2px red"
    },
    
  },
  sendButton:{
    padding: "1em 2em",
      border: "none",
      fontWeight: "bold",
      letterSpacing: "5px",
      textTransform: "uppercase",
      color: "#2c9caf",
      transition: "all 1000ms",
      fontSize: "15px",
      position: "relative",
      overflow: "hidden",
      outline: "2px solid #2c9caf",
      margin: "10px",
      "&:hover": {
        color: "#ffffff",
        transform: "scale(1.1)",
        outline: "2px solid #70bdca",
        boxShadow: "4px 5px 17px -4px #268391",
      },
      "&::before":{
        content: "''",
        position: "absolute",
        left: "-50px",
        width: "0",
        height: "100%",
        backgroundColor: "#2c9caf",
        transform: "skewX(45deg)",
        zIndex: "-1",
        transition: "width 1000ms",
      },
      "&:hover::before":{
        width: "250%"
      }
  }
}))

const EditRegister = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const {BASE_URL} = useContext(ApiCallsContext)

  const [register, setRegister] = useState({
    concept: "",
    amount: "",
    type: "",
    date: "",
    category: ""
  });

  const { concept, amount, type, category, date } = register;
  const onInputChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };


  const loadOperation = async () => {
    const url = BASE_URL + `/operations/${id}`
    const res = await get(url)
    setRegister(res.data[0]);
  };

  useEffect(() => {
    loadOperation();
  }, []);


  const onSubmit = async (e) => {
    e.preventDefault();
    const url = BASE_URL + `/operations/${id}`
    await patch(url, register);
    navigate("/");
  };

  

  return (
    <Container 
      maxWidth="sm"
      className={classes.container}
      >
      <Typography 
      variant="h5" 
      className={classes.titleForm}
      >Edit operation</Typography>

        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
          <TextField 
          type="text"
          className={classes.textField}
          placeholder="Concept"
          name="concept"
          value={concept}
          onChange={(e) => onInputChange(e)}
          />

          
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="type-native">type</InputLabel>
            <Select
              native
              disabled
              value={type}
              onChange={(e) => onInputChange(e)}
              className={classes.select}
              inputProps={{
              name: 'type',
              id: 'type-native',
              }}
            >
              <option aria-label="None" value="" />
              <option value="entry">entry</option>
              <option value="egress">egress</option>
            </Select>
          </FormControl>

          <TextField 
          name='amount'
          id="amount" 
          label="amount" 
          className={classes.textField}
          value={amount}
          onChange={(e) => onInputChange(e)}
          />

          <TextField 
          name='date'
          id="date" 
          label="date" 
          className={classes.textField}
          value={date}
          onChange={(e) => onInputChange(e)}
          />


          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="category-native">category</InputLabel>
            <Select
              native
              value={category}
              onChange={(e) => onInputChange(e)}
              className={classes.select}
              inputProps={{
              name: 'category',
              id: 'category-native',
              }}
            >
            <option aria-label="None" value="" />
            <option value="library">library</option>
            <option value="food">food</option>
            <option value="salary">salary</option>
            <option value="services">services</option>
            <option value="cleanning">cleanning</option>
            <option value="other">other</option>
          </Select>
        </FormControl>

          <Button 
          onClick={(e) => onSubmit(e)}
          className={classes.sendButton}
          >
            Save
          </Button>

          </form>
      </Container>
  )
}

export default EditRegister