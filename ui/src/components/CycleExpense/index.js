import React from 'react';
import { styled } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const Label = styled(Typography)({
	display: 'inline-block',
	margin: '0px',
	width: '200px',
	fontWeight: '300'
})

const Value = styled(Typography)({
	display: 'inline-block',
	margin: '0px',
	width: '100px',
	textAlign: 'right',
	fontWeight: '300'
})

export default class CycleExpense extends React.Component{

	render(){

		return(
			<div style={{height: "358px"}}>
				<Typography variant="h6">Total Spending</Typography><br/>
				<Label variant="h6">Salary</Label><Value variant="h6">{this.props.summary.salary}</Value><br/>
				<Label variant="h6">Balance</Label><Value variant="h6">{this.props.summary.balance}</Value><hr/>
				<Label variant="h6">Expenditure</Label><Value variant="h6">{this.props.summary.expense}</Value><br/>
			</div>
		);
	}
}