const CycleReducer = (state={id:-1, name:"No Cycle"}, action)=>{
	switch(action.type){
		case 'CHANGE_CYCLE': return action.cycleId;
		default: return state;
	}
}

export default CycleReducer