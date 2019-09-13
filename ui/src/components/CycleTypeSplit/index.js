import React from 'react';
import { Chart } from 'react-google-charts';
import { Typography } from '@material-ui/core';

export default class CycleDaily extends React.Component{

	render(){
		let typeSplit = [...this.props.typeSplit]
		typeSplit.sort((a, b) => (a[1] > b[1]) ? -1 : 1)
		typeSplit.splice(0,0,['Type','Expense'])
		return(
			<div>
				<Typography gutterBottom variant="h6">Type Wise</Typography><br/>
				<Chart
					width={'530px'}
					height={'300px'}
					chartType="PieChart"
					loader={<div>Loading Chart</div>}
					data={typeSplit}
					options={{
						// Just add this option
						pieHole: 0.9,
						chartArea: {
							width: '100%',
							height: '100%',
						},
						animation: {
							duration: 1000,
							easing: 'out',
							startup: true,
						}
					}}
				rootProps={{ 'data-testid': '3' }}
				/>
			</div>
		);
	}
}