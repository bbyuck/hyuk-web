import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


/*
  Icon
*/
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TableChartIcon from '@mui/icons-material/TableChart';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import GridOnIcon from '@mui/icons-material/GridOn';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ImageIcon from '@mui/icons-material/Image';

/*
  화면 import
*/
import HomeFrame from './ui/HomeFrame';
import CreateFrame from './ui/create/CreateFrame';
import DeleteFrame from './ui/delete/DeleteFrame';
import ReadFrame from './ui/read/ReadFrame';
import UpdateFrame from './ui/update/UpdateFrame';

const drawerWidth = 240;

const menuList = [
  {
    name : 'Create',
    component : <CreateFrame />,
    icon: <NoteAddIcon />
  },
  {
    name : 'Read',
    component : <ReadFrame />,
    icon : <TableChartIcon />
  },
  {
    name : 'Update',
    component : <UpdateFrame />,
    icon : <BrowserUpdatedIcon/>
  },
  {
    name : 'Delete',
    component : <DeleteFrame />,
    icon : <DeleteForeverIcon />
  },
  {
    name : 'Grid',
    component : null,
    icon : <GridOnIcon />
  },
  {
    name : 'File Upload',
    component : null,
    icon : <UploadFileIcon />
  },
  {
    name : 'Thumnnail',
    component : null,
    icon : <ImageIcon />
  }
];
 
// const menuList = ['Create', 'Read', 'Update', 'Delete', 'Grid', 'File Upload', 'Thumbnail'];
// const menuComponentList = [<CreateFrame />, <ReadFrame />, <UpdateFrame />, <DeleteFrame />];

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function MainFrame() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedMenuId, setSelectedMenuId] = React.useState(-1);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const selectMenu = (event, id) => {
    setSelectedMenuId(id);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" onClick={(e) => selectMenu(e, -1)}>
            CJ OliveNetworks
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography variant="h6" noWrap component="div">
            Hyuk Web
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuList.map((menu, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                selected={selectedMenuId === index}
                onClick={(e) => selectMenu(e, index)}>
                <ListItemIcon>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText primary={menu.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {(selectedMenuId === -1 ? <HomeFrame /> : menuList[selectedMenuId].component)}
      </Main>
    </Box>
  );
}

export default MainFrame;