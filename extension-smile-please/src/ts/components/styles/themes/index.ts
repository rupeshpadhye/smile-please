import { DefaultTheme } from 'styled-components';

export type ThemeTypes = 'light' | 'dark';

export const lightTheme: DefaultTheme = {
	backgroundColor: 'white',
	textColor:'black',
};

export const darkTheme: DefaultTheme = {
	backgroundColor: 'rgba(0, 0, 0, 0.85)',
	textColor:'orange',
};

export const themes = {
	light: lightTheme,
	dark: darkTheme,
};
