import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivitiyDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

function ActivityDetails() {
	const { activityStore } = useStore();
	const { selectedActivity: activity, loadActivity, loading } = activityStore;
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (id) {
			loadActivity(id);
		}
	}, [id, loadActivity]);

	if (loading || !activity) {
		return <LoadingComponent />;
	}

	return (
		<Grid>
			<Grid.Column width={10}>
				<ActivityDetailedHeader activity={activity} />
				<ActivityDetailedInfo activity={activity} />
				<ActivityDetailedChat />
			</Grid.Column>
			<Grid.Column width={6}>
				<ActivityDetailedSidebar />
			</Grid.Column>
		</Grid>
	);
}

export default observer(ActivityDetails);
