import React, { useState, ChangeEvent } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activities';

interface Props {
	activity: Activity | undefined;
	closeForm: () => void;
	createOrEditActivity: (activity: Activity) => void;
}

export default function ActivityForm({ activity: selectedActivity, closeForm, createOrEditActivity }: Props) {
	const initialObject = {
		id: '',
		title: '',
		date: '',
		description: '',
		category: '',
		city: '',
		venue: '',
	};

	const initialState = selectedActivity ?? initialObject;

	const [activity, setActivity] = useState(initialState);

	function handleSubmit() {
		console.log(activity);
		createOrEditActivity(activity);
	}

	function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;

		setActivity({ ...activity, [name]: value });
	}

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit} autocomplete='off'>
				<Form.Input
					placeholder='Title'
					value={activity.title}
					name='title'
					id='title'
					onChange={handleInputChange}
				/>
				<Form.TextArea
					placeholder='Description'
					value={activity.description}
					name='description'
					id='description'
					onChange={handleInputChange}
				/>
				<Form.Input
					placeholder='Category'
					value={activity.category}
					name='category'
					id='category'
					onChange={handleInputChange}
				/>
				<Form.Input
					placeholder='Date'
					value={activity.date}
					name='date'
					id='date'
					onChange={handleInputChange}
				/>
				<Form.Input
					placeholder='City'
					value={activity.city}
					name='city'
					id='city'
					onChange={handleInputChange}
				/>
				<Form.Input
					placeholder='Venue'
					value={activity.venue}
					name='venue'
					id='venue'
					onChange={handleInputChange}
				/>
				<Button floated='right' positive type='submit' content='Submit' />
				<Button onClick={closeForm} floated='right' type='button' content='Cancel' />
			</Form>
		</Segment>
	);
}
