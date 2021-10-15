import React, { Fragment } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import NavBar from './NavBar';
import HomePage from '../../features/home/HomePage';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityForm from '../../features/activities/form/ActivityForm';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';

function App() {
	const location = useLocation();

	return (
		<Fragment>
			<ToastContainer position='bottom-right' hideProgressBar />
			<Route exact path='/' component={HomePage} />
			<Route
				path={'/(.+)'}
				render={() => (
					<Fragment>
						<NavBar />
						<Container style={{ marginTop: '7em' }}>
							<Switch>
								<Route exact path='/activities' component={ActivityDashboard} />
								<Route path='/activities/:id' component={ActivityDetails} />
								<Route
									key={location.key}
									path={['/createActivity', '/manage/:id']}
									component={ActivityForm}
								/>
								{/* <Route path='/server-error' component={ServerError} /> */}
								<Route component={NotFound} />
							</Switch>
						</Container>
					</Fragment>
				)}
			/>
		</Fragment>
	);
}

export default observer(App);
