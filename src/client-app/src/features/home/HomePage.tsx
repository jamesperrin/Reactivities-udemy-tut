import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

export default function HomePage() {
	return (
		<Container style={{ marginTop: '7em' }}>
			<h1>Home Page</h1>

			<h2>Go to <Link to='/activities' title='Go to Activities'>Activities</Link></h2>
		</Container>
	);
}
