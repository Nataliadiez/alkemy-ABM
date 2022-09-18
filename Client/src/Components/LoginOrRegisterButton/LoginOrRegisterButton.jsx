import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  button: {
      padding: "1em 2em",
      border: "none",
      borderRadius: "5px",
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
})

const LoginOrRegisterButton = (props) => {
  const {state, logOrRegFunction} = props;
  const classes = useStyles();
  
  return (
    <>
      <Button 
      variant="text" 
      color="primary" 
      className={classes.button} 
      onClick={logOrRegFunction}
      >
        {state}
      </Button>
    </>
  )
}

export default LoginOrRegisterButton