import React, { Fragment, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityList from './ActivityList';
import ActivityFilters from './ActivityFilters';

function ActivityDashboard() {
	const { activityStore } = useStore();
	const { loadActivities, activityRegistry } = activityStore;

	useEffect(() => {
		if (activityRegistry.size <= 1) {
			loadActivities();
		}
	}, [activityRegistry.size, loadActivities]);

	if (activityStore.loadingInitial) {
		return <LoadingComponent content='Loading app' />;
	}

	return (
		<Fragment>
			<h1>Activities Dashboard</h1>
			<Grid>
				<Grid.Column width='10'>
					<ActivityList />
				</Grid.Column>
				<Grid.Column width='6'>
					<h2>Activity filters</h2>
					<ActivityFilters />
				</Grid.Column>
			</Grid>
		</Fragment>
	);
}

export default observer(ActivityDashboard);
