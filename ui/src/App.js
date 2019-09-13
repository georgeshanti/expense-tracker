import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import PersistentDrawerLeft from 'components/Sidebar'
import ExpenseAppBar from 'components/Appbar';
import Dashboard from 'pages/Dashboard';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	fab: {
		margin: theme.spacing(1)*2,
		position: 'fixed',
		bottom: '0px',
		right: '0px'
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

function Main(props){
	const classes = useStyles();
	
	return (
		<main
			className={clsx(classes.content, {
			[classes.contentShift]: props['drawerOpen'],
			})}
		>
			<div className={classes.drawerHeader} />
			<Switch>
				<Route exact path="/" component={Dashboard} />
			</Switch>
			<Fab color="primary" aria-label="add" className={classes.fab}>
				<AddIcon />
			</Fab>
		</main>
	)
}

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'drawerOpen': false
		}
	}

	drawerHandler(){
		let openstate = this.state['drawerOpen'];
		this.setState({'drawerOpen': !openstate});
	}

	render(){
		return (
			<div style={{display: 'flex', background: '#ececec'}}>
				<ExpenseAppBar open={this.state['drawerOpen']} drawerHandler={this.drawerHandler.bind(this)}/>
				<PersistentDrawerLeft open={this.state['drawerOpen']} drawerHandler={this.drawerHandler.bind(this)} />
				<Main drawerOpen={this.state['drawerOpen']} />
			</div>
		);
	}
}

// App.propTypes = {
// 	classes: PropTypes.object.isRequired,
// };

export default App;
