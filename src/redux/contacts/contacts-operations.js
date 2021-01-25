import axios from 'axios';
import shortid from 'shortid';
import {
    fetchContactRequest,
    fetchContactSuccess,
    fetchContactError,
    addContactRequest,
    addContactSuccess,
    addContactError,
    deleteContactRequest,
    deleteContactSuccess,
    deleteContactError,
} from './contacts-actions';

axios.defaults.baseURL = 'http://localhost:5050';

const fetchContacts = () => async dispatch => {
    dispatch(fetchContactRequest());

    try {
        const { data } = await axios.get('/contacts');
        dispatch(fetchContactSuccess(data));
    } catch (error) {
        dispatch(fetchContactError(error));
    }
};

const addContact = (name, number) => async dispatch => {
    const contact = {
        id: shortid.generate(),
        name,
        number,
    };

    dispatch(addContactRequest());

    try {
        const { data } = await axios.post('/contacts', contact);
        dispatch(addContactSuccess(data));
    } catch (error) {
        dispatch(addContactError(error));
    }
};

const deleteContact = contactId => async dispatch => {
    dispatch(deleteContactRequest());

    try {
        await axios.delete(`/contacts/${contactId}`);
        dispatch(deleteContactSuccess(contactId));
    } catch (error) {
        dispatch(deleteContactError(error));
    }
};

const contactsOperations = {
    fetchContacts,
    addContact,
    deleteContact,
};
export default contactsOperations;

// без async await !!!

// const fetchContacts = () => dispatch => {
//     dispatch(fetchContactRequest());

//     axios
//         .get('/contacts')
//         .then(({ data }) => dispatch(fetchContactSuccess(data)))
//         .catch(error => dispatch(fetchContactError(error)));
// };

// const addContact = (name, number) => dispatch => {
//     const contact = {
//         id: shortid.generate(),
//         name,
//         number,
//     };

//     dispatch(addContactRequest());

//     axios
//         .post('/contacts', contact)
//         .then(({ data }) => dispatch(addContactSuccess(data)))
//         .catch(error => dispatch(addContactError(error)));
// };

// const deleteContact = contactId => dispatch => {
//     dispatch(deleteContactRequest());

//     axios
//         .delete(`/contacts/${contactId}`)
//         .then(dispatch(deleteContactSuccess(contactId)))
//         .catch(error => dispatch(deleteContactError(error)));
// };
