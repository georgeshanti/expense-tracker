import React from 'react';
import { styled } from '@material-ui/styles';
import { Chart } from 'react-google-charts';
import { Button, Typography, Switch } from '@material-ui/core';

const presets = [
	{
		name: 'Day To Day',
		types: ['Breakfast', 'Dinner', 'Snack', 'Travel']
	},
	{
		name: 'Food',
		types: ['Lunch', 'Breakfast', 'Dinner', 'Snack']
	},
	{
		name: 'Overall',
		types: [
			'Breakfast',
			'Dinner',
			'Household',
			'Journey',
			'Lend',
			'Lunch',
			'Other',
			'Outing',
			'Rent',
			'Return',
			'Salary',
			'Snack',
			'Travel',
			'Treat',
			'Utility',
			'Withdrawal'
		]
	},
	{
		name: 'None',
		types: []
	}
]

const Heading = styled(Typography)({
	marginTop: '2px',
	display: 'inline-block'
})

let ActiveTypeTag = (color)=> styled(Button)({
	background: color,
	margin: '0px',
	transform: 'scale(0.8)',
	border: '1px solid ' + color,
	color: 'white',
	hover: {
		background: "red"
	}
})

let InactiveTypeTag = (color)=> styled(Button)({
	margin: '0px',
	transform: 'scale(0.8)',
	border: '1px solid ' + color,
	color: color
})

const Tag = styled(Button)({
	margin: '0px',
	transform: 'scale(0.8)',
	border: '1px solid rgba(63, 81, 181, 0.5)'
})

const init = {
	'Breakfast': { amount: 0, color:"#8929e1" },
	'Dinner': { amount: 0, color:"#e17020" },
	'Household': { amount: 0, color:"#ce5252" },
	'Journey': { amount: 0, color:"#008686" },
	'Lend': { amount: 0, color:"#770707" },
	'Lunch': { amount: 0, color:"#256ca8" },
	'Other': { amount: 0, color:"#355700" },
	'Outing': { amount: 0, color:"#f44707" },
	'Rent': { amount: 0, color:"#995555" },
	'Return': { amount: 0, color:"#e63232" },
	'Salary': { amount: 0, color:"#007700" },
	'Snack': { amount: 0, color:"#3fb36a" },
	'Travel': { amount: 0, color:"#aa3f71" },
	'Treat': { amount: 0, color:"#ec3f5d" },
	'Utility': { amount: 0, color:"#ff9300" },
	'Withdrawal': { amount: 0, color:"#636626" },
	'Sub Total': { amount: 0, color:"#626262" }
};

export default class CycleDaily extends React.Component{

	constructor(props){
		super(props);
		var selectedTypes = []
		for(var e in init){
			selectedTypes.push(e);
		}
		this.state = { selectedTypes: selectedTypes, totalChecked: true };
	}

	tagHandler(e){
		return ()=>{
			let s = this.state.selectedTypes;
			if(s.includes(e))
				s.splice(s.indexOf(e),1)
			else
				s.push(e)
			this.setState({selectedTypes: s});
		}
	}

	setPreset(pre){
		return ()=>{
			let k = [...pre]
			this.setState({selectedTypes: k})
		};
	}

	handleTotalCheck(){
		this.setState({totalChecked: !this.state.totalChecked});
	}

	render(){
		let dates = {};
		this.props.transactions.forEach(element => {
			let subTotal = element.credit - element.debit;
			if(subTotal<0){
				if(!(element.date in dates)){
					let obj = {}
					for(const x in init){
						obj[x] = init[x].amount
					}
					dates[element.date] = {...obj};
				}
				dates[element.date][element.txn_type] -= subTotal;
				dates[element.date]['Sub Total'] -= subTotal;
			}
		});
		var cycleTotal = 0;
		let datesArray = [];
		for(var date in dates){
			let day = dates[date]
			let dayTotal = 0;
			let d = date.split('-')
			// let dayArray = [ date ]
			let dayArray = [ new Date(d[0], d[1]-1, d[2]) ];
			for(let g in day){
				if(this.state.selectedTypes.includes(g)){
					if(!this.state.totalChecked)
						dayArray.push(day[g]);
					if(g!=='Sub Total')
						dayTotal += day[g];
				}
			}
			cycleTotal += dayTotal;
			dayArray.push(dayTotal);
			datesArray.push(dayArray);
		}
		let headingArr = ['x']
		let tags = []
		let seriesCurve = {}
		for(var e in init){
			let selected = this.state.selectedTypes.includes(e);
			if(!this.state.totalChecked){
				if(selected){
					headingArr.push(e);
					console.log(Object.keys(seriesCurve).length)
					seriesCurve[Object.keys(seriesCurve).length]={ curveType: 'function', color: init[e].color }
				}
			}
			let TypeTag = selected ? ActiveTypeTag(init[e].color) : InactiveTypeTag(init[e].color);
			console.log(selected)
			tags.push((<TypeTag key={e} size="small" onClick={this.tagHandler(e).bind(this)} variant={selected?"contained":"outlined"}>{e}</TypeTag>))
		}
		headingArr.push('Total');
		seriesCurve[Object.keys(seriesCurve).length]={ curveType: 'function', color: 'black' }
		let dayCount = datesArray.length;
		datesArray.splice(0,0,headingArr);

		let presetComponents = presets.map((x)=>{
			let selectedTypesSet = new Set(this.state.selectedTypes);
			let set = new Set(x.types);
			let intersection = new Set(
				[...selectedTypesSet].filter(x => set.has(x)));
			let union = new Set([...selectedTypesSet, ...set]);
			let active = (intersection.size===union.size);
			return (<Tag key={x.name} color="primary" size="small" onClick={this.setPreset(x.types).bind(this)} variant={active?"contained":"outlined"}>{x.name}</Tag>)
		});
		console.log(seriesCurve)
		return(
			<div>
				<div style={{display: 'flex', justifyContent:'space-between'}}>
					<Heading variant="h6">Day Wise</Heading>
					<div style={{display: 'block', verticalAlign:'middle'}}>
						<Heading variant="overline">Only Total:</Heading>
						<div style={{display: 'inline-block', textAlign:'right'}}>
							<Switch
								checked={this.state.totalChecked}
								onChange={this.handleTotalCheck.bind(this)}
								value="checkedB"
								color="primary"
								inputProps={{ 'aria-label': 'primary checkbox' }}
							/>
						</div>
						<div style={{display: 'inline-block'}}>
						<Heading variant="overline">Presets:</Heading>
							{presetComponents}
						</div>
					</div>
				</div>
				<Chart
					height={'250px'}
					chartType="LineChart"
					loader={<div>Loading Chart</div>}
					data={datesArray}
					rootProps={{ 'data-testid': '3' }}
					options={{
						chartArea: {
							width: '90%',
							height: '80%',
						},
						animation: {
							duration: 1000,
							easing: 'out',
							startup: true,
						},
						legend: 'none',
						series: seriesCurve,
						hAxis: {
						  title: 'Days',
						},
						vAxis: {
						  title: 'Expense',
						},
					}}
				/>
				{tags}
				<br/>
				<Typography gutterBottom variant="overline">Total: {cycleTotal}</Typography><br/>
				<Typography gutterBottom variant="overline">Average: {cycleTotal/dayCount}</Typography><br/>
			</div>
		)
	}
}