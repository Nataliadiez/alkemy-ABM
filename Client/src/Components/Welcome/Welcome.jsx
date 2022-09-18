import {useState} from 'react';
import {Box, Container, Typography} from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import {LoginOrRegisterButton, UserLogin, UserRegister} from '../index';

const useStyles = makeStyles((theme) =>({
  container:{
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: "darkgrey"
  }
}));



const Welcome = () => {
  const classes = useStyles();
  const [login, setLogin] = useState();

  const handleClickLogin = (e) => {
    setLogin(true)
  }

  const handleClickRegister = (e) => {
    setLogin(false)
  }

  
  

  return (
    <Box>
      <Container maxWidth="md" className={classes.container}>
        <Typography 
        variant="h3"
        className={classes.title}
        > 
          Welcome to invoice page
        </Typography>
        <div>
        <LoginOrRegisterButton state="Login" logOrRegFunction={(e) => handleClickLogin(e)}></LoginOrRegisterButton>
        <LoginOrRegisterButton state="Register" logOrRegFunction={(e) => handleClickRegister(e)}></LoginOrRegisterButton>
        </div>
        {(login === true) ? <UserLogin/> : <UserRegister/>}
      </Container>
    </Box>
  )
}

export default Welcome
