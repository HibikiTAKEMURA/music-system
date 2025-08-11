import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, styled } from "@mui/material";
import { URLS } from "../../constants/appSettings";
import { useAtomValue } from "jotai";
import { locationPathAtom } from "@/jotais/default";


type SideDrawerProps = {
    handleDrawer: () => void;
    drawerWidth: number;
    open: boolean;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 10),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const SideDrawer:  React.FC<SideDrawerProps> = ({ handleDrawer, drawerWidth, open }) => {
  const locationPath = useAtomValue(locationPathAtom);
  return(
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
      }}
      variant="temporary" // ページの上からメニューを開くためここを変更
      anchor="left"
      open={open}
      onClose={handleDrawer} // 外側クリックで閉じる
    >
      <DrawerHeader>
        {/* <IconButton onClick={handleDrawer}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton> */}
      </DrawerHeader>
      {/* <Divider /> */}
      <List>
        {URLS.map((url, index) => {
          return(
            <ListItem disablePadding key={index} >
              <ListItemButton
                href={url.url}
                onClick={() => {
                  handleDrawer();
                }}
                disabled={url.url === locationPath}
              >
                <ListItemText primary={url.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideDrawer;