import { useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/models/activities';

function ActivityForm() {
	const history = useHistory();
	const { activityStore } = useStore();
	const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
	const { id } = useParams<{ id: string }>();

	const [activity, setActivity] = useState<Activity>({
		id: '',
		title: '',
		date: null,
		description: '',
		category: '',
		city: '',
		venue: '',
	});

	const validationScheme = Yup.object({
		title: Yup.string().required('The activity title is required'),
		description: Yup.string().required('The activity description is required'),
		category: Yup.string().required('The activity category is required'),
		date: Yup.string().required('The activity date is required').nullable(),
		venue: Yup.string().required('The activity venue is required'),
		city: Yup.string().required('The activity city is required'),
	});

	useEffect(() => {
		if (id) {
			loadActivity(id).then((activity) => setActivity(activity!));
		}
	}, [id, loadActivity]);

	function handleFormSubmit(activity: Activity) {
		if (activity.id.length === 0) {
			const newActivity = { ...activity, id: uuid() };

			createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
		} else {
			updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
		}
	}

	if (loadingInitial) {
		return <LoadingComponent content='Loading activity...' />;
	}

	return (
		<Segment clearing>
			<Header content='Activity Details' sub color='teal' />
			<Formik
				validationSchema={validationScheme}
				enableReinitialize
				initialValues={activity}
				onSubmit={(values) => handleFormSubmit(values)}>
				{({ handleSubmit, isValid, isSubmitting, dirty }) => (
					<Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
						<MyTextInput placeholder='Title' name='title' id='title' />
						<MyTextArea placeholder='Description' name='description' id='description' rows={3} />
						<MySelectInput options={categoryOptions} placeholder='Category' name='category' id='category' />
						<MyDateInput
							placeholderText='Date'
							name='date'
							id='date'
							showTimeSelect
							timeCaption='time'
							dateFormat='MMMM d, yyyy h:mm aa'
						/>
						<Header content='Location Details' sub color='teal' />
						<MyTextInput placeholder='City' name='city' id='city' />
						<MyTextInput placeholder='Venue' name='venue' id='venue' />
						<Button
							disabled={isSubmitting || !dirty || !isValid}
							loading={loading}
							floated='right'
							positive
							type='submit'
							content='Submit'
						/>
						<Button as={NavLink} to='/activities' floated='right' type='button' content='Cancel' />
					</Form>
				)}
			</Formik>
		</Segment>
	);
}
export default observer(ActivityForm);
