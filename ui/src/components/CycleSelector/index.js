import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';

import { changeCycle } from 'actions/CycleActions';

const useStyles = makeStyles(theme => ({
  root: {
	display: 'inline-block',
	verticalAlign: 'middle',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SimpleSelect(props) {
  const cycle = useSelector(state => state.CycleReducer)
  const dispatch = useDispatch();

  const classes = useStyles();

  const [cycles, updateCycles] = useState([]);
  useEffect(()=>{
    axios.get('/api/cycle')
    .then((response)=>{
      updateCycles(response.data);
    })
  },[])
  
  let cycleMap = {}
  cycles.forEach((x)=>{
    cycleMap[x.id] = x.name
  })
  
	function handleChange(event) {
	  dispatch(changeCycle({id: event.target.value, name: cycleMap[event.target.value]}));
	}

  let cycleComponents = cycles.map((x,i)=> (<MenuItem key={i} value={x.id}>{x.name}</MenuItem>))

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">Age</InputLabel>
        <Select
          value={cycle.id}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-simple',
          }}
        >
          <MenuItem value={-1}>Select Cycle</MenuItem>
          {cycleComponents}
        </Select>
      </FormControl>
    </form>
  );
}
