import React, { useState, useMemo } from 'react';
import {
	Box,
	// Button,
	Card,
	CardActions,
	CardActionArea,
	CardContent,
	CardHeader,
	InputBase,
	Collapse,
	Divider,
	Radio,
	Typography,
	FormControl,
	FormLabel,
	FormControlLabel,
	RadioGroup,
} from '@mui/material';

import { ExpandLess, ExpandMore, Lens } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

import data from '../dyelist.json';

import useStyles from '../styles/dyeListStyles';

const DyeList = () => {
	const classes = useStyles();
	const [searchValue, setSearchValue] = useState('');
	const [filter, setFilter] = useState({
		alphabetically: false,
		ascending: false,
	});
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

	const handleSearchValue = event => {
		setSearchValue(event.target.value);
		setOpen({});
	};

	const changeSearchValue = newValue => {
		setSearchValue(newValue);
		setOpen({});
	};

	const handleItemExpand = index => {
		setOpen({ ...open, [index]: !open[index] });
	};

	const sortAlphabetically = () => {
		setFilter({ alphabetically: true });
	};

	const sortByColour = () => {
		setFilter({ alphabetically: false });
	};

	const generateFilterRadioButtons = colourGroups.map(groupName => {
		return (
			<FormControlLabel
				key={`${groupName}Radio`}
				value={groupName.toLowerCase()}
				control={<Radio />}
				label={groupName}
				onClick={() => {
					changeSearchValue(groupName);
				}}
			/>
		);
	});

	const renderOptions = (
		<Box className={classes.toolbarRadioGroup}>
			<FormControl className={classes.filterButtonContainer}>
				<FormLabel id='sort-dyes-radio-group'>Sort Dyes</FormLabel>
				<RadioGroup
					className={classes.filterButtonContainer}
					aria-labelledby='sort-dyes-radio-group'
					defaultValue='sortByGroup'
					name='radio-buttons-group'>
					<FormControlLabel
						key={`sortGroupRadio`}
						value={`sortByGroup`}
						control={<Radio />}
						label={`Sort By Group`}
						onClick={() => {
							sortByColour();
						}}
					/>
					<FormControlLabel
						key={`sortNameRadio`}
						value={`sortByName`}
						control={<Radio />}
						label={`Sort By Name`}
						onClick={() => {
							sortAlphabetically();
						}}
					/>
				</RadioGroup>
			</FormControl>
			<FormControl>
				<FormLabel id='filter-dyes-radio-group'>
					Filter by Color
				</FormLabel>
				<RadioGroup
					className={classes.filterButtonContainer}
					aria-labelledby='filter-dyes-radio-group'
					defaultValue='allDyes'
					name='filter-dyes-group'>
					<FormControlLabel
						key={`allDyesRadio`}
						value={`allDyes`}
						control={<Radio />}
						label={`All Dyes`}
						onClick={() => {
							changeSearchValue('');
						}}
					/>
					{generateFilterRadioButtons}
				</RadioGroup>
			</FormControl>
		</Box>
	);

	const toolbar = (
		<Box className={classes.toolbarContainer}>
			<Box className={classes.toolbar}>
				<Box>
					<h2 className={classes.title}>
						Final Fantasy XIV Dye Search
					</h2>
					<Divider />
					<Box>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder='Search …'
								className={classes.searchInputBase}
								inputProps={{ 'aria-label': 'search' }}
								value={searchValue}
								onChange={event => handleSearchValue(event)}
							/>
						</div>
						{renderOptions}
					</Box>
				</Box>
			</Box>
		</Box>
	);

	const filterItems = useMemo(
		() =>
			filter.alphabetically
				? data
						.slice()
						.sort((a, b) => {
							let textA = a.name.toUpperCase();
							let textB = b.name.toUpperCase();
							return textA < textB ? -1 : textA > textB ? 1 : 0;
						})
						.filter(items => {
							const searchTerm = searchValue.toLowerCase();
							if (searchValue === '' || searchValue === null) {
								return data;
							} else if (
								items.group
									.toLowerCase()
									.includes(searchTerm) ||
								items.name.toLowerCase().includes(searchTerm)
							) {
								return items;
							}
							return null;
						})
				: data.slice().filter(items => {
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
				  }),
		[filter.alphabetically, searchValue]
	);

	const listItems = filterItems.map((value, index) => {
		return (
			<div className={classes.listItemContainer} key={value.name}>
				<Card
					className={
						open[index]
							? classes.listItemOpen
							: classes.listItemClose
					}>
					<li
						key={'ListItemFor' + value.name}
						className={classes.listItem}>
						<CardActionArea
							sx={{
								padding: '1em',
							}}
							onClick={() => handleItemExpand(index)}>
							<CardHeader
								avatar={
									<div key={'itemIconfor ' + value.name}>
										<div
											className={
												classes.dyeColorContainer
											}>
											<Lens
												className={classes.dyeColor}
												sx={{
													color: value.colorhex,
													width: '40px',
													height: '40px',
												}}
											/>
										</div>
									</div>
								}
								title={
									<Typography variant='h5'>
										{value.name}
									</Typography>
								}
							/>
							<CardContent className={classes.flex}>
								<Typography
									key={'groupNameOf ' + value.name}
									variant='h6'
									component='div'>
									{value.group}
								</Typography>
							</CardContent>
							<CardActions className={classes.flex}>
								<Typography
									className={classes.listItemWhereAction}
									variant='subtitle1'>
									Find locations
									{open[index] ? (
										<ExpandLess
											sx={{
												fontSize: '1.8rem',
												verticalAlign: 'bottom',
											}}
										/>
									) : (
										<ExpandMore
											sx={{
												fontSize: '1.8rem',
												verticalAlign: 'bottom',
											}}
										/>
									)}
								</Typography>
							</CardActions>
						</CardActionArea>
					</li>
				</Card>
				<Collapse
					key={'collapsibleFor' + value.name}
					in={open[index]}
					className={classes.whereCollpsible}
					timeout='auto'
					collapsedSize='0px'
					unmountOnExit>
					<Divider />
					<ul className={classes.whereList}>
						{Object.entries(value.where).map(
							([locationKey, locationDetail], index) => {
								let locationEntries =
									typeof locationDetail === 'string'
										? locationDetail
										: locationDetail.join('/');
								let locationListLength =
									Object.getOwnPropertyNames(
										value.where
									).length;
								return (
									<li
										className={classes.nested}
										key={
											value.name.replace(' ', '') +
											locationKey.replace(' ', '')
										}>
										<Typography
											key={value.name + locationKey}
											className={classes.locationKey}
											sx={{
												fontWeight: 'bold',
												margin: '0.8rem',
											}}>
											{locationKey}
										</Typography>
										<ul
											key={value.name + locationDetail}
											className={classes.locationSubList}>
											{locationEntries
												.split('/')
												.map(loc => {
													return (
														<li
															key={loc}
															className={
																classes.locationValue
															}>
															<Typography>
																{loc}
															</Typography>
														</li>
													);
												})}
										</ul>
										{index < locationListLength - 1 ? (
											<Divider />
										) : null}
									</li>
								);
							}
						)}
					</ul>
				</Collapse>
			</div>
		);
	});

	return (
		<div className={classes.root}>
			<div className={classes.layout}>
				{toolbar}
				<div className={classes.content}>
					{filterItems.length > 0 ? (
						<div className={classes.list}>{listItems}</div>
					) : (
						<div>
							<Typography
								className={classes.noItems}
								variant='h6'>
								No items found.
							</Typography>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default DyeList;
