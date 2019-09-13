import clsx from 'clsx';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography } from '@material-ui/core';
import CycleSelector from 'components/CycleSelector';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
	  display: 'flex',
	},
	appBar: {
	  transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	  }),
	},
	appBarShift: {
	  width: `calc(100% - ${drawerWidth}px)`,
	  marginLeft: drawerWidth,
	  transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.easeOut,
		duration: theme.transitions.duration.enteringScreen,
	  }),
	},
	menuButton: {
	  marginRight: theme.spacing(2),
	},
	hide: {
	  display: 'none',
	},
	drawer: {
	  width: drawerWidth,
	  flexShrink: 0,
	},
	drawerPaper: {
	  width: drawerWidth,
	},
	drawerHeader: {
	  display: 'flex',
	  alignItems: 'center',
	  padding: theme.spacing(0, 1),
	  ...theme.mixins.toolbar,
	  justifyContent: 'flex-end',
	},
	content: {
	  flexGrow: 1,
	  padding: theme.spacing(3),
	  transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	  }),
	  marginLeft: -drawerWidth,
	},
	contentShift: {
	  transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.easeOut,
		duration: theme.transitions.duration.enteringScreen,
	  }),
	  marginLeft: 0,
	},
}));

export default function ExpenseAppBar(props){
	const classes = useStyles();
	
	return(
		<AppBar
			position="fixed"
			className={
				clsx(classes.appBar, {
					[classes.appBarShift]: props.open,
				})}
		>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={props['drawerHandler']}
					edge="start"
					className={clsx(classes.menuButton, props.open && classes.hide)}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap>
					<span style={{verticalAlign: 'middle'}}>Expense Tracker</span>
					<CycleSelector />
				</Typography>
			</Toolbar>
		</AppBar>
	)
}