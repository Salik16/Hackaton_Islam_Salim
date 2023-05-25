import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link, NavLink } from "react-router-dom";
import { Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContextProvider";
import { useCart } from "../contexts/CartContextProvider";
import { useFav } from "../contexts/FavoriteContextProvider";

const pages = [
  { title: "Films", link: "/" },
  { title: "Comics", link: "/comics" },
];
const adminPages = [{ title: "Add Product", link: "/add" }];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { user, logout, isAdmin } = useAuth();
  const { cartLength, getCart } = useCart();
  const { favLength, getFav } = useFav();

  React.useEffect(() => {
    getCart();
  }, []);
  React.useEffect(() => {
    getFav();
  }, []);

  let data = JSON.parse(localStorage.getItem("users"));

  return (
    <AppBar sx={{ bgcolor: "white" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png"
              alt=""
              width={70}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {isAdmin()
                ? pages.concat(adminPages).map((page, index) => (
                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                      <Typography
                        textalign="center"
                        component={Link}
                        to={page.link}
                        color="black"
                      >
                        {page.title}
                      </Typography>
                    </MenuItem>
                  ))
                : pages.map((page, index) => (
                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                      <Typography
                        textalign="center"
                        component={Link}
                        to={page.link}
                        color="black"
                      >
                        {page.title}
                      </Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "black",
                  fontFamily: "monospace",
                  display: "block",
                }}
                component={Link}
                to={page.link}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!data || !data.subscr ? (
              <NavLink
                style={{ color: "black", textDecoration: "none" }}
                to={"/premium"}
              >
                Get a Premium Subscription
              </NavLink>
            ) : null}

            <IconButton component={Link} to="/fav" sx={{ color: "white" }}>
              <Badge badgeContent={favLength} color="default">
                <FavoriteBorderIcon sx={{ color: "black" }} />
              </Badge>
            </IconButton>
            <IconButton component={Link} to="/cart" sx={{ color: "white" }}>
              <Badge badgeContent={cartLength} color="primary">
                <ShoppingCart sx={{ color: "black" }} />
              </Badge>
            </IconButton>
            {user ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.displayName} src={user.photoURL} />
                </IconButton>
              </Tooltip>
            ) : (
              <Button component={Link} to={"/auth"} style={{ color: "black" }}>
                Login
              </Button>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  logout();
                }}
              >
                <Typography textalign="center">Log Out</Typography>
              </MenuItem>
              {isAdmin() ? (
                <Box>
                  <Button
                    sx={{ color: "black", display: "block" }}
                    component={Link}
                    to="/add"
                    textalign="center"
                  >
                    Add Product
                  </Button>
                  <Button
                    sx={{ color: "black" }}
                    component={Link}
                    to="/addcomics"
                    textalign="center"
                  >
                    Add Comics
                  </Button>
                </Box>
              ) : null}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
