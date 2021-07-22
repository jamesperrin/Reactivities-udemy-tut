import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Card, Image, ButtonGroup, Button } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

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
		<Card fluid>
			<Image src={`/assets/categoryImages/${activity.category}.jpg`} />
			<Card.Content>
				<Card.Header>{activity.title}</Card.Header>
				<Card.Meta>
					<span>{activity.date}</span>
				</Card.Meta>
				<Card.Description>{activity.description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<ButtonGroup widths='2'>
					<Button
						as={Link}
						to={`/manage/${activity.id}`}
						basic
						color='blue'
						content='Edit'
						title={`Edit ${activity.title}`}
					/>
					<Button as={Link} to='/activities' basic color='grey' content='Cancel' title='Cancel' />
				</ButtonGroup>
			</Card.Content>
		</Card>
	);
}

export default observer(ActivityDetails);
