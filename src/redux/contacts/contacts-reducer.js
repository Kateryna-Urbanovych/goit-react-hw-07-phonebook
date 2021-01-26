import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { changeFilter } from './contacts-actions';
import contactsOperations from './contacts-operations';

const { fetchContacts, addContact, deleteContact } = contactsOperations;

const itemsReducer = createReducer([], {
    [fetchContacts.fulfilled]: (_, { payload }) => payload,
    [addContact.fulfilled]: (state, { payload }) => [payload.data, ...state],
    [deleteContact.fulfilled]: (state, { payload }) =>
        state.filter(({ id }) => id !== payload),
});

const filterReducer = createReducer('', {
    [changeFilter]: (_, { payload }) => payload,
});

const loadingReducer = createReducer(false, {
    [fetchContacts.pending]: () => true,
    [fetchContacts.fulfilled]: () => false,
    [fetchContacts.rejected]: () => false,
    [addContact.pending]: () => true,
    [addContact.fulfilled]: () => false,
    [addContact.rejected]: () => false,
    [deleteContact.pending]: () => true,
    [deleteContact.fulfilled]: () => false,
    [deleteContact.rejected]: () => false,
});

// можна обрабатывать ошибку и показывать что-то в интерфейсе, типа error.message
// const errorReducer = createReducer(null, {});

const contactsReducer = combineReducers({
    items: itemsReducer,
    filter: filterReducer,
    loading: loadingReducer,
    // error: errorReducer,
});

export default contactsReducer;
