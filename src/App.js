import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import DyeList from './components/DyesList';

const App = () => {
	const theme = createTheme({
		palette: {
			mode: 'dark',
			primary: {
				light: '#b29ae2',
				main: '#352258',
			},
			secondary: {
				main: '#f50057',
			},
		},
	});

	// const XIVAPI = require('@xivapi/js')
	// const xiv = new XIVAPI({
	//     private_key: 'fecf958e03d74d96a059d735c87837cf5fe8fda3db8f48c58d361fbcf0f71640',
	//     language: 'en',
	//     verbose: true
	// })

	// /search?filters=ItemSearchCategory.Name_en=Dyes

	return (
		<ThemeProvider theme={theme}>
			<DyeList />
		</ThemeProvider>
	);
};

export default App;
