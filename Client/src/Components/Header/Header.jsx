import { Link, useLocation, useNavigate } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, useMediaQuery, IconButton, MenuItem, Button, Menu} from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "30px",
    width: "100%",
  },
  appBar: {
    backgroundColor: "whitesmoke",
    width: "100%",
  },
  link:{
    textDecoration: "none",
    color: "#268391",
    
  },
  menuItem: {
    margin: "15px",
    fontSize: "1.2rem",
    "& :active":{
      color: "black"
    },
    "& :hover":{
      color: "#37D5D6"
    },
  },
  menuButton: {
    color: "#268391",
  },
  menuAppBar: {
    width: "100%",
    marginTop: "48px"
  },
  itemMenu: {
    textAlign: "center"
  },
  logOutButton: {
    color: "#268391",
    fontWeight: "bolder"
  },
}));


const Header = () => {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const cleanToken = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    (location.pathname === "/" || location.pathname === "/operations" || location.pathname === "/categories") &&  
    <div className={classes.root}>
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar>
      {isMobile ? <>
        <IconButton
                edge="start"
                className={classes.menuButton}
                aria-label="menu"
                onClick={(e) => handleMenu(e)}
              >
                <MenuIcon/>
              </IconButton>
              <Menu
                className={classes.menuAppBar}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                
                <MenuItem className={classes.itemMenu}>
                  <Typography variant="h6" className={classes.menuItem}>
                    <Link to='/' className={classes.link}>
                      Home
                    </Link>
                  </Typography>
                </MenuItem>

                <MenuItem className={classes.itemMenu}>
                  <Typography variant="h6" className={classes.menuItem}>
                    <Link to='/operations' className={classes.link}>
                      Operations
                    </Link>
                  </Typography>
                </MenuItem>

                <MenuItem className={classes.itemMenu}>
                  <Typography variant="h6" className={classes.menuItem}>
                    <Link to='/categories' className={classes.link}>
                      Categories
                    </Link>
                  </Typography>
                </MenuItem>
              </Menu>
              <Button className={classes.logOutButton} onClick={() => cleanToken()}>Log out</Button>
            </>
            : 
            <>
          <MenuItem>
          <Typography variant="h6" className={classes.menuItem}>
            <Link to='/' className={classes.link}>
              Home
            </Link>
          </Typography>
          </MenuItem>

          <MenuItem>
          <Typography variant="h6" className={classes.menuItem}>
            <Link to='/operations' className={classes.link}>
              Operations
            </Link>
          </Typography>
          </MenuItem>

          <MenuItem>
          <Typography variant="h6" className={classes.menuItem}>
            <Link to='/categories' className={classes.link}>
              Categories
            </Link>
          </Typography>
          </MenuItem>

          <MenuItem>
          <Typography variant="h6" className={classes.menuItem}>
            <Link to='/login' className={classes.link} onClick={() => localStorage.clear()}>
              Log out
            </Link>
          </Typography>
          </MenuItem>
        </>}
      </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header