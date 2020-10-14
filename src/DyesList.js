import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
	blueGrey,
	red,
	brown,
	yellow,
	green,
	blue,
	purple,
} from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import Lens from '@material-ui/icons/Lens';
import data from './dyelist.json';

const useStyles = makeStyles((theme) => ({
	toolbar: {
		backgroundColor: '#537780',
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('lg')]: {
			display: 'block',
		},
	},
	titleShort: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'block',
		},
		[theme.breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		flexGrow: 1,
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	toolbarButtonGroup: {
		display: 'flex',
	},
	toolbarButton: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	toolbarButtonText: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'flex',
		},
	},
	filterButtonContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'start',
		backgroundColor: '#eaeaea',
		padding: (theme.spacing(2)),
	},
	filterButton: {
        margin: theme.spacing(1),
	},
	listItem: {
		display: 'grid',
		gridTemplateColumns: '10% 40% 30% 20%',
		gap: '0 1rem',
		[theme.breakpoints.up('sm')]: {
			gridTemplateColumns: '10% 40% 40% 10%',
		},
		'&:hover': {
			background: '#d6d6d6',
		},
	},
	dyeColorContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '40px',
		height: '40px',
		borderRadius: '50%',
		boxShadow: '1px 1px 12px #a3a3a3, -6px -6px 12px #ffffff',
		[theme.breakpoints.up('md')]: {
			marginLeft: theme.spacing(4),
		},
	},
	dyeColor: {
		fontSize: '3rem',
	},
	whereCollpsible: {
		backgroundColor: '#eaeaea',
	},
	nested: {
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		paddingTop: theme.spacing(1),
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 50%)',
		alignItems: 'baseline',
	},
	locationKey: {
		fontWeight: 'bold',
	},
	locationValue: {
        display: 'inline-block',
        width: '100%',
        whiteSpace: 'pre-wrap',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
	},
	noItems: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		textAlign: 'center',
	},
}));

export default function DyeList() {
	const classes = useStyles();
    const [searchValue, setSearchValue] = useState('');
    const [filter, setFilter] = useState({
        alphabetically: false,
        ascending: false
    });
	const [optionsExpand, setoptionsExpand] = useState(false);
	const [open, setOpen] = useState({});

    const colourGroups = [
		'Greys',
		'Reds',
		'Browns',
		'Yellows',
		'Greens',
		'Blues',
		'Purples',
		'Special Dyes',
	];
	const filterButtonColours = [
		blueGrey[500],
		red[500],
		brown[500],
		yellow[700],
		green[500],
		blue[500],
		purple[500],
    ];

	const handleOptionsExpand = () => {
		setoptionsExpand(!optionsExpand);
	};

	const handleSearchValue = (event) => {
		setSearchValue(event.target.value);
	};

	const changeSearchValue = (newValue) => {
		setSearchValue(newValue);
    };

	const handleItemExpand = (index) => {
		setOpen({ ...open, [index]: !open[index] });
	};

	const filteredItems = 
        filter.alphabetically ? 
            data
            .slice()
            .sort((a, b) => {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
            .filter((items) => {
                const searchTerm = searchValue.toLowerCase();
                if (searchValue === '' || searchValue === null) {            
                    return data;
                } else if (
                    items.group.toLowerCase().includes(searchTerm) ||
                    items.name.toLowerCase().includes(searchTerm)
                ) {
                    return items;
                }
                return null;
            })
        :
            data.slice().filter((items) => {
                const searchTerm = searchValue.toLowerCase();
                if (searchValue === '' || searchValue === null) {            
                    return data;
                } else if (
                    items.group.toLowerCase().includes(searchTerm) ||
                    items.name.toLowerCase().includes(searchTerm)
                ) {
                    return items;
                }
                return null;
            });
    
    const sortAlphabetically = () => {
        setFilter({alphabetically: true});
    }

    const sortByColour = () => {
        setFilter({alphabetically: false});
    }

	const createFilterButtons = colourGroups.map((groupName, index) => {
		return (
			<Button
				id={groupName}
				style={{
					background:
						index === colourGroups.length - 1
							? 'linear-gradient(45deg, #e91e63, #9c27b0, #2196f3, #4caf50, #ffeb3b)'
                            : filterButtonColours[index],
                    color: 'white',
				}}
                variant='contained'
                className={classes.filterButton}
				onClick={() => {
					changeSearchValue(groupName);
				}}
			>
				{groupName}
			</Button>
		);
    });

	const renderOptions = (
		<Collapse
			id='dye-options'
			in={optionsExpand}
			timeout='auto'
			unmountOnExit
		>
            <div className={classes.filterButtonContainer}>
                <Button
					id='orderByAlphabetical'
					color='default'
                    variant='contained'
                    className={classes.filterButton}
					onClick={() => {
						sortAlphabetically();
					}}
				>
					Sort By Name
				</Button>
				<Button
					id='orderByColor'
					color='default'
                    variant='contained'
                    className={classes.filterButton}
					onClick={() => {
						sortByColour();
					}}
				>
					Sort By Group
				</Button>                
			</div>
			<div className={classes.filterButtonContainer}>
				{createFilterButtons}
				<Button
					id='allDyes'
					color='default'
                    variant='contained'
                    className={classes.filterButton}
					onClick={() => {
						changeSearchValue('');
					}}
				>
					All Dyes
				</Button>
			</div>
		</Collapse>
	);

	const toolbar = (
		<AppBar className={classes.appBar} position='sticky'>
			<Toolbar className={classes.toolbar}>
				<Typography className={classes.title} variant='h6' noWrap>
					Final Fantasy 14 Dye Locations
				</Typography>
				<Typography className={classes.titleShort} variant='h6' noWrap>
					FFXIV Dyes
				</Typography>
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder='Search…'
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{ 'aria-label': 'search' }}
						value={searchValue}
						onChange={(event) => handleSearchValue(event)}
					/>
				</div>
				<div className={classes.grow} />
				<div className={classes.toolbarButtonGroup}>
					<Button
						color='inherit'
						className={classes.toolbarButton}
						onClick={handleOptionsExpand}
						aria-label='show more'
						aria-controls='primary-search-show-more-options'
					>
						<span className={classes.toolbarButtonText}>
							Filter
						</span>
						{optionsExpand ? <ExpandLess /> : <ExpandMore />}
					</Button>
				</div>
			</Toolbar>
			{renderOptions}
		</AppBar>
	);

	const listItems = filteredItems.map((value, index) => {
		return (
			<Paper key={value.name} elevation={0}>
				<ListItem
					button
					disableTouchRipple={true}
					onClick={() => handleItemExpand(index)}
					divider
					key={'ListItemFor' + value.name}
					classes={{
						root: classes.listItem,
					}}
				>
					<ListItemIcon>
						<div className={classes.dyeColorContainer}>
							<Lens
								className={classes.dyeColor}
								style={{ color: value.colorhex }}
							/>
						</div>
					</ListItemIcon>
					<ListItemText primary={value.name} />
					<ListItemText primary={value.group} />
					{open[index] ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse
					key={'collapsibleFor' + value.name}
					in={open[index]}
					className={classes.whereCollpsible}
					timeout='auto'
					unmountOnExit
				>
					<List disablePadding>
						{Object.entries(value.where).map(
							([locationKey, locationDetail], _) => {
								var locationEntries =
									typeof locationDetail === 'string'
										? locationDetail
										: locationDetail.join('/');
								return (
									<div
										key={
											'collapsibleListItem' +
											value.name.replace(' ', '') +
											locationKey.replace(' ', '')
										}
									>
										<ListItem className={classes.nested}>
											<Typography
												key={value.name + locationKey}
												className={classes.locationKey}
											>
												{locationKey}
											</Typography>
											<Typography
												key={
													value.name + locationDetail
												}
											>
												{locationEntries.split('/').map((loc, _) => {
                                                    return <span className={classes.locationValue}>{loc}</span>
                                                })}
											</Typography>
										</ListItem>
										<Divider />
									</div>
								);
							}
						)}
					</List>
				</Collapse>
			</Paper>
		);
	});

	return (
		<>
			{toolbar}
			{filteredItems.length !== 0 ? (
				<List>{listItems}</List>
			) : (
				<div>
					<Typography className={classes.noItems} variant='h6'>
						No items found.
					</Typography>
					<Divider />
				</div>
			)}
		</>
	);
}
