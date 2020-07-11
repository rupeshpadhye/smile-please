import * as React from 'react';
import styled from 'styled-components';
import GlobalStyle from '../../components/styles/GlobalStyle';
import MemesApp from '../../containers/MemesApp';
import ReactGA from 'react-ga';

const PopupApp: React.FC<{}> = () => {
	ReactGA.initialize('UA-163992425-1');
	ReactGA.ga('set', 'checkProtocolTask', () => {});
	ReactGA.pageview('/popup.html');
	return (
		<React.Fragment>
			<GlobalStyle />
				<PopupAppContainer>
					<MemesApp/>
				</PopupAppContainer>
		</React.Fragment>
	);
}

export default PopupApp;

const PopupAppContainer = styled('div')`
	height: 600px;
	width: 600px;
	background-color: rgba(0, 0, 0, 0.85);
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
