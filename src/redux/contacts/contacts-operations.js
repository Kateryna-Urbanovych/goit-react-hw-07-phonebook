import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5050';

const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/contacts');
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

const addContact = createAsyncThunk(
    'contacts/addContact',
    async ({ name, number }, { rejectWithValue }) => {
        // console.log(name, number);
        try {
            const contact = { name, number };
            const response = axios.post('/contacts', contact);
            // console.log(response.data);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contactId, { rejectWithValue }) => {
        try {
            await axios.delete(`/contacts/${contactId}`);
            return contactId;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

const contactsOperations = {
    fetchContacts,
    addContact,
    deleteContact,
};
export default contactsOperations;
