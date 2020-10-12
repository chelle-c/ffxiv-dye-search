import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DyeList from './DyesList';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
        maxWidth: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(#537780, #11d3bc, #55e9bc, #fffcca)',
        backgroundAttachment: 'fixed',
        [theme.breakpoints.up('lg')]: {            
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(8),
		},
    },
	paper: {
		maxWidth: 1080,
        margin: '0 auto',
		backgroundColor: theme.palette.background.paper,
    },
    madeBy: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
}));

export default function App() {
    const classes = useStyles();

	return (
		<div className={classes.root}>            
		    <Paper className={classes.paper} elevation={3}>
                <DyeList></DyeList>
                <div className={classes.madeBy}>
                    <Typography variant='subtitle2'>Made by Chelle Croke</Typography>
                </div>
            </Paper>
        </div>
	);
}