import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	body {
		box-sizing: border-box;
		display: block;
		margin: 0;
	}
	
	.ril-toolbar .ril-toolbar-right li:last-child {
		display: none;
	}
	
	.ril-toolbar .ril-toolbar-right li button {
	   margin-left: 0.5em;
	}
`;

export default GlobalStyle;
