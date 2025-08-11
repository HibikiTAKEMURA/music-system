import { IconButton, styled, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';


type HeaderProps = {
    handleDrawer: () => void;
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1, // サイドメニューより前面に
}));

const Header:  React.FC<HeaderProps> = ({handleDrawer}) => {
  return(
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawer}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
                    Music System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;