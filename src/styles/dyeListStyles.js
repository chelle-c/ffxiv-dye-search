import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

const dyeListStyles = makeStyles(theme => ({
	root: {
		maxWidth: '100%',
		minHeight: '100vh',
		backgroundColor: theme.palette.background.default,
		backgroundAttachment: 'fixed',
		color: theme.palette.text.primary,
	},
	layout: {
		display: 'flex',
		flexDirection: 'column',
		[theme.breakpoints.up('sm')]: {
			flexDirection: 'row',
		},
	},
	content: {
		width: '100%',
		minHeight: '100vh',
		margin: '0 auto',
		overflow: 'hidden',
		backgroundColor: theme.palette.background,
	},
	toolbarContainer: {
		minWidth: '350px',
		height: '100vh',
		overflowY: 'hidden',
		position: 'sticky',
		top: '0px',
	},
	toolbar: {
		display: 'flex',
		flexDirection: 'column',
		minWidth: '220px',
		minHeight: '100vh',
		padding: '1em',
		[theme.breakpoints.up('lg')]: {
			padding: '3em',
		},
		[theme.breakpoints.up('md')]: {
			padding: '2em',
			minWidth: '236px',
		},
		backgroundColor: theme.palette.info.dark,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		whiteSpace: 'nowrap',
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		margin: `1em ${theme.spacing(2)} 2em 0`,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: 0,
			marginRight: 0,
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
	searchInputBase: {
		color: 'inherit',
		'& .MuiInputBase-input': {
			padding: theme.spacing(1, 1, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${theme.spacing(4)})`,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('md')]: {
				width: '20ch',
			},
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	toolbarRadioGroup: {
		display: 'flex',
		flexDirection: 'column',
	},
	toolbarRadioButton: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: theme.palette.primary.light,
	},
	filterButtonContainer: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		justifyContent: 'start',
		padding: theme.spacing(2),
	},
	filterButton: {
		margin: theme.spacing(1),
		'&:hover': {
			background: 'initial',
			filter: 'brightness(0.75)',
			transitionDuration: '600ms',
			transitionProperty: 'filter',
		},
	},
	flex: {
		display: 'flex',
		flex: '1 1 auto',
		justifyContent: 'space-between',
	},
	list: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
		gap: '2rem',
		// gridAutoRows: 'minmax(420px, auto)',
		padding: '2rem',
	},
	listItemContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifySelf: 'center',
		alignSelf: 'start',
		width: '100%',
		maxWidth: '350px',
		borderRadius: theme.shape.borderRadius,
	},
	listItem: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	listItemOpen: {
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	listItemClose: {
		transitionDelay: '300ms',
		transition: 'all .2s',
		borderRadius: theme.shape.borderRadius,
	},
	listItemWhereAction: {
		...theme.typography.button,
		width: '100%',
		textAlign: 'center',
	},
	listItemButton: {
		width: '100%',		
	},
	dyeColorContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '40px',
		height: '40px',
		borderRadius: '50%',
		boxShadow: '1px 1px 1px ' + theme.palette.background.paper,
	},
	dyeColor: {
		fontSize: '3rem',
	},
	whereCollpsible: {
		paddingTop: 0,
		width: '100%',
		borderBottomLeftRadius: theme.shape.borderRadius,
		borderBottomRightRadius: theme.shape.borderRadius,
		backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
		boxShadow:
			'0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
	},
	whereList: {
		padding: 0,
	},
	nested: {
		padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
		display: 'grid',
		gridTemplateRows: 'repeat(2, 50%)',
		alignItems: 'baseline',
	},
	locationKey: {
		fontWeight: 'bold',
		margin: '0.8rem 0',
	},
	locationValue: {
		display: 'list-item',
		listStyle: 'circle',
		width: '100%',
		whiteSpace: 'pre-wrap',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	noItems: {
		padding: '4rem 0 0 0',
		textAlign: 'center',
	},
}));

export default dyeListStyles;
