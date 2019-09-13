import React from 'react';
import styles from './style.module.scss';

export default function Tag(props){
	return (
		<div className={styles['tag'] + " " + (props.selected?styles['selected']:'')}>
			{props.name}
		</div>
	)
}