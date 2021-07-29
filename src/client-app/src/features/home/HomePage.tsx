import { Link } from 'react-router-dom';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';

export default function HomePage() {
	return (
		<Segment inverted textAlign='center' vertical className='masthead'>
			<Container text>
				<Header as='h1' inverted>
					<Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBotom: 12 }} />
					Ractivities
				</Header>
				<Header as='h2' inverted content='Welcome to Reactiviers' />
				<Button as={Link} to='/activities' size='huge' inverted>
					Take me to the Activities
				</Button>
			</Container>
		</Segment>
	);
}
