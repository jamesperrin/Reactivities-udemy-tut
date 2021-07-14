import React from 'react';
import { Card, Image, Icon, ButtonGroup, Button } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activities';

interface Props {
	activity: Activity;
}

export default function ActivityDetails({ activity }: Props) {
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
					<Button basic color='blue' content='Edit' title={`Edit ${activity.title}`} />
					<Button basic color='grey' content='Cancel' title='Cancel' />
				</ButtonGroup>
			</Card.Content>
		</Card>
	);
}
