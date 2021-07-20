import { observer } from 'mobx-react-lite';
import React, { useState, ChangeEvent } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

function ActivityForm() {
	const { activityStore } = useStore();
	const { selectedActivity, closeForm, createActivity, updateActivity, loading } = activityStore;

	const newActivity = {
		id: '',
		title: '',
		date: '',
		description: '',
		category: '',
		city: '',
		venue: '',
	};

	const initialState = selectedActivity ?? newActivity;

	const [activity, setActivity] = useState(initialState);

	function handleSubmit() {
		activity.id ? updateActivity(activity) : createActivity(activity);
	}

	function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;

		setActivity({ ...activity, [name]: value });
	}

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit} autoComplete='off'>
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
					type='date'
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
				<Button loading={loading} floated='right' positive type='submit' content='Submit' />
				<Button onClick={closeForm} floated='right' type='button' content='Cancel' />
			</Form>
		</Segment>
	);
}
export default observer(ActivityForm);