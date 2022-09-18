import { makeStyles } from '@material-ui/core/styles';
import {Container, Typography, TextField, Button} from '@material-ui/core';
import {useFormik, FormikProvider } from "formik";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { post } from '../../Services/apiCalls'
import ApiCallsContext from '../../Contexts/ApiCallsContext'
import * as yup from 'yup';
import Swal from 'sweetalert2'


const useStyles = makeStyles({
  container: {
    marginTop: "50px",
    padding: "20px",
    textAlign: "center",
    position: "relative",
    background: "rgba(255, 255, 255, 0.7)",
    "&:before":{
      content: "''",
      zIndex: "-1",
      position: "absolute",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      background: "linear-gradient(-45deg, #268391 0%, #37D5D6 100% )",
      transform: "translate3d(0px, 10px, 0) scale(0.95)",
      filter: "blur(20px)",
      opacity: "var(0.7)",
      transition: "opacity 0.3s",
      borderRadius: "inherit",
    },
    "&::after":{
      content: "''",
      zIndex: "-1",
      position: "absolute",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      background: "inherit",
      borderRadius: "inherit",
    }
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
  textField:{
    margin: "10px",
    "& .MuiInputBase-input":{
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      color: "#268391",
      borderBottom: "2px solid lightgrey"
    },
    "& .MuiFilledInput-underline:after":{
      borderBottom: "solid 2px #268391"
    },
    "& .MuiFormLabel-root":{
      color: "darkgrey"
    },
    "& .Mui-focused":{
      color: "#268391"
    },
    "& .MuiOutlinedInput-input":{
      color: "#268391"
    },
    "& .Mui-error":{
      color: "red",
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
})

const UserRegister = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {BASE_URL} = useContext(ApiCallsContext)

  const validations = yup.object({
    name: yup
      .string("Enter a valid name")
      .required("Enter a valid name")
      .min(3, "Must be between 4 and 20 characters.")
      .max(20, "Must be between 4 and 20 characters."),
      
    email: yup
        .string("Enter a valid email.")
        .required("Enter a valid email.")
        .test("test-name", "Enter a valid email.",
            function(value) {
              const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
              let isValidEmail = emailRegex.test(value)
              if(!isValidEmail){
                return false;
              }
                return true;
            }),
    password: yup
        .string("Must be between 4 and 10 characters.")
        .min(4, "Must be between 4 and 10 characters.")
        .max(10, "Must be between 4 and 10 characters.")
        .required("Must be between 4 and 10 characters."),
  });

  const formik = useFormik({
    initialValues:{
      name: "",
      email: "",
      password: ""
    },
    validationSchema: validations,

    onSubmit: async (values) => {
      const url = BASE_URL + '/users/register'
      const res = await post(url, values)
      .then((res) => {
        Swal.fire({
          title: "User created! Please, login",
          icon: 'success',
          color: 'grey',
          showConfirmButton: false,
          timer: 2000
        })
        setTimeout(() => {
          window.location.href = "/login"
        }, 2000);
      })
      .catch(({response}) => {
        console.log(response)
       })
      
    }
  
  })


  return (
      <Container 
      maxWidth="sm"
      className={classes.container}
      >
      <Typography 
      variant="h5" 
      className={classes.titleForm}
      >REGISTER FORM</Typography>
      <FormikProvider value={formik}>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField 
          name='name'
          id="name" 
          label="name" 
          variant="filled"
          className={classes.textField}
          value={formik.values.name || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={ formik.touched.name && formik.errors.name }
          error={ formik.touched.name && Boolean(formik.errors.name) }
          />
          <TextField 
          name='email'
          id="email" 
          label="email" 
          variant="filled"
          className={classes.textField}
          value={formik.values.email || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={ formik.touched.email && formik.errors.email }
          error={ formik.touched.email && Boolean(formik.errors.email) }
          />
          <TextField 
          name='password'
          id="password"
          label="password" 
          variant="filled"
          className={classes.textField}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={ formik.touched.password && formik.errors.password }
          error={ formik.touched.password && Boolean(formik.errors.password) }
          />
          <Button 
          className={classes.sendButton}
          type='submit'
          onClick={formik.handleSubmit}
          >
            Send
          </Button>
          </form>
        </FormikProvider>
      </Container>

    
  )
}

export default UserRegister