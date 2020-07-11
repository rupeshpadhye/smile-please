import React from 'react';
import styled from 'styled-components';
import GlobalStyle from '../../components/styles/GlobalStyle';
import Preferences from '../../components/Preferences';


const OptionsAppContainer = styled('div')`
	position: absolute;
	height: 90vh;
	width: 90vw;
	left: 5vw;
	top: 5vh;
	background-color: rgba(0, 0, 0, 0.85);
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;


const OptionsApp: React.FC<{}> = () => {
	return (
			<React.Fragment>
				<GlobalStyle />
				<OptionsAppContainer>
					<Preferences/>
				</OptionsAppContainer>
			</React.Fragment>
	);
}

export default OptionsApp;
