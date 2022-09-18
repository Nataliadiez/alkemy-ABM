import {useState, useEffect, useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Container, Typography, TextField, Button, FormControl, InputLabel, Select} from '@material-ui/core';
import {useFormik, FormikProvider } from "formik";
import * as yup from "yup";
import ApiCallsContext from '../../Contexts/ApiCallsContext';
import {post} from '../../Services/apiCalls'
import Swal from 'sweetalert2'

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
  },
}))


const NewOperation = () => {
  const {BASE_URL} = useContext(ApiCallsContext)
  const classes = useStyles();
  const [disconnect, setDisconnect] = useState(false)
  const currentIdLogin = localStorage.getItem('token');

useEffect(() => {
  if (currentIdLogin == null) {
    setDisconnect(true)
  } else if (!currentIdLogin == null){
    setDisconnect(false)
  }
}, [])

  

  
  const validations = yup.object({
    concept: yup
      .string("this field can not be blank")
      .required("this field can not be blank")
      .max(100, "Must be between 4 and 100 characters."),
    type: yup
    .string("this field can not be blank")
    .required("this field can not be blank"),
    amount: yup
      .string("this field can not be blank")
      .required("this field can not be blank"),
    date: yup
      .string("this field can not be blank")
      .required("this field can not be blank"),
    category: yup
    .string("this field can not be blank")
    .required("this field can not be blank"),
  });

  const formik = useFormik({
    initialValues:{
      concept: "",
      type: "entry",
      amount: "",
      date: "2022-09-10",
      category: "library",
    },
    validationSchema: validations,
    onSubmit: async (values) => {
      const url = BASE_URL + "/operations"
      const res = await post(url, values)
      .then((res) => {
        console.log(res.data)
        Swal.fire({
          title: 'New register created!',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          color: 'grey',
        })
        setTimeout(() => {
          window.location.href = "/operations"
        }, 2000);
      })
      .catch(({response}) => {
        console.log(response)
       })
      
    }
  })


  return (
      <>
        {disconnect ? 
        <div></div>
        : 
        <Container 
        maxWidth="sm"
        className={classes.container}
        >
        <Typography 
        variant="h5" 
        className={classes.titleForm}
        >New operation</Typography>
        <FormikProvider value={formik}>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <TextField 
            name='concept'
            id="concept" 
            label="concept" 
            variant="filled"
            className={classes.textField}
            value={formik.values.concept || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={ formik.touched.concept && formik.errors.concept }
            error={ formik.touched.concept && Boolean(formik.errors.concept) }
            />
  
            
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="type-native">type</InputLabel>
              <Select
                native
                value={formik.values.type || "entry"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
            variant="filled"
            className={classes.textField}
            value={formik.values.amount || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={ formik.touched.amount && formik.errors.amount }
            error={ formik.touched.amount && Boolean(formik.errors.amount) }
            />
  
            <TextField
              id="date"
              label="date"
              type="date"
              variant="filled"
              className={classes.textField}
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={ formik.touched.date && formik.errors.date }
              error={ formik.touched.date && Boolean(formik.errors.date) }
              InputLabelProps={{
                shrink: true,
              }}
            />
  
  
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="category-native">category</InputLabel>
              <Select
                native
                value={formik.values.category || "library"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
            className={classes.sendButton}
            type='submit'
            onClick={formik.handleSubmit}
            >
              Save
            </Button>
            </form>
          </FormikProvider>
          </Container>
        }
        </>
  )
}

export default NewOperation