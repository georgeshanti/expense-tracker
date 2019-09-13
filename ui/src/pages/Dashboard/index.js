import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useSelector } from 'react-redux';
import axios from 'axios';

import CycleDaily from 'components/CycleDaily';
import CycleTypeSplit from 'components/CycleTypeSplit';
import CycleSummary from 'components/CycleSummary';
import CycleExpense from 'components/CycleExpense';
import TransactionTable from 'components/TransactionTable';

const useStyles = makeStyles(theme=>({
	cardSplit:{
		display: 'inline-block',
		verticalAlign: 'top',
		marginRight: 12,
		marginBottom: 12,
	},
	card: {
		minWidth: 275,
		marginBottom: 12,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
}));

export default function Dashboard() {
	const cycle = useSelector(state => state.CycleReducer)
	const classes = useStyles();
	const [transactions, updateTransactions] = useState([]);
	const [typeSplit, updateTypeSplit] = useState([]);
	const [summary, updateSummary] = useState({credit: 0, debit: 0, balace: 0, salary: 0, expense: 0});
	useEffect(()=>{
		if(cycle.id!==-1){
			axios.get(`/api/cycle/${cycle.id}/transaction`)
			.then((response)=>{
				updateTransactions(response.data);
			})
			.catch((err)=>{
			})

			axios.get(`/api/cycle/${cycle.id}/type-split`)
			.then((response)=>{
				updateTypeSplit(response.data);
			})
			.catch((err)=>{
			})

			axios.get(`/api/cycle/${cycle.id}/summary`)
			.then((response)=>{
				updateSummary(response.data);
			})
			.catch((err)=>{
			})
		}
	},[cycle])

	if(cycle.id===-1)
		return null;

	return (
		<div>
			<Card className={classes.card}>
				<CardContent>
					<CycleDaily transactions={transactions}/>
				</CardContent>
			</Card>

			<Card className={classes.cardSplit}>
				<CardContent>
					<CycleTypeSplit typeSplit={typeSplit}/>
				</CardContent>
			</Card>

			<Card className={classes.cardSplit}>
				<CardContent>
					<CycleSummary summary={summary}/>
				</CardContent>
			</Card>

			<Card className={classes.cardSplit}>
				<CardContent>
					<CycleExpense summary={summary}/>
				</CardContent>
			</Card>
			<TransactionTable transactions={[...transactions].reverse()}/>
		</div>

	);
}
