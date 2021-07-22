import React, { useState, ChangeEvent } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid';

function ActivityForm() {
	const history = useHistory();
	const { activityStore } = useStore();
	const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
	const { id } = useParams<{ id: string }>();

	const [activity, setActivity] = useState({
		id: '',
		title: '',
		date: '',
		description: '',
		category: '',
		city: '',
		venue: '',
	});

	useEffect(() => {
		if (id) {
			loadActivity(id).then((activity) => setActivity(activity!));
		}
	}, [id, loadActivity]);

	function handleSubmit() {
		if (activity.id.length === 0) {
			const newActivity = { ...activity, id: uuid() };

			createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
		} else {
			updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
		}
	}

	function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;

		setActivity({ ...activity, [name]: value });
	}

	if (loadingInitial) {
		return <LoadingComponent content='Loading activity...' />;
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
				<Button as={NavLink} to='/activities' floated='right' type='button' content='Cancel' />
			</Form>
		</Segment>
	);
}
export default observer(ActivityForm);
