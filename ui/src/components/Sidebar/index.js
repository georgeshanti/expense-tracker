import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard'

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

export default function PersistentDrawerLeft(props) {
	const classes = useStyles();
	const theme = useTheme();

	const dashboardOptions = [
			{
				'text': 'Dashboard',
				'icon': DashboardIcon
			}
		];
	const settingsOptions = [
			{
				'text': 'Settings',
				'icon': DashboardIcon
			}
		];

	let dashboardSubMenu = dashboardOptions.map((x,i)=>{
		let Icon = x['icon'];
		let Text = x['text'];
		return (
			<ListItem key={i}>
				<ListItemIcon><Icon /></ListItemIcon>
				<ListItemText primary={Text}></ListItemText>
			</ListItem>
		);
	});

	let settingsSubMenu = settingsOptions.map((x,i)=>{
		let Icon = x['icon'];
		let Text = x['text'];
		return (
			<ListItem key={i}>
				<ListItemIcon><Icon /></ListItemIcon>
				<ListItemText primary={Text}></ListItemText>
			</ListItem>
		);
	});

	return (
		<div className={classes.root}>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={props.open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={props['drawerHandler']}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<Divider />
				{dashboardSubMenu}
				<Divider />
				{settingsSubMenu}
			</Drawer>
		</div>
	);
}