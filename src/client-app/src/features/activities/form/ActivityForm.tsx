import React, { useState, ChangeEvent } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid';
import { Formik, Form, Field } from 'formik';

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

	// function handleSubmit() {
	// 	if (activity.id.length === 0) {
	// 		const newActivity = { ...activity, id: uuid() };

	// 		createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
	// 	} else {
	// 		updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
	// 	}
	// }

	// function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
	// 	const { name, value } = event.target;

	// 	setActivity({ ...activity, [name]: value });
	// }

	if (loadingInitial) {
		return <LoadingComponent content='Loading activity...' />;
	}

	return (
		<Segment clearing>
			<Formik enableReinitialize initialValues={activity} onSubmit={(values) => console.log(values)}>
				{({ handleSubmit }) => (
					<Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
						<Field placeholder='Title' name='title' id='title' />
						<Field placeholder='Description' name='description' id='description' />
						<Field placeholder='Category' name='category' id='category' />
						<Field type='date' placeholder='Date' name='date' id='date' />
						<Field placeholder='City' name='city' id='city' />
						<Field placeholder='Venue' name='venue' id='venue' />
						<Button loading={loading} floated='right' positive type='submit' content='Submit' />
						<Button as={NavLink} to='/activities' floated='right' type='button' content='Cancel' />
					</Form>
				)}
			</Formik>
		</Segment>
	);
}
export default observer(ActivityForm);
