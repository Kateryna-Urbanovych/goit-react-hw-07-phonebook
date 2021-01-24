import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
    // fetchContactRequest,
    // fetchContactSuccess,
    // fetchContactError,
    addContactRequest,
    addContactSuccess,
    addContactError,
    deleteContactRequest,
    deleteContactSuccess,
    deleteContactError,
    changeFilter,
} from './contacts-actions';

const itemsReducer = createReducer([], {
    // [fetchContactSuccess]: (_, { payload }) => payload,
    [addContactSuccess]: (state, { payload }) => [payload, ...state],
    [deleteContactSuccess]: (state, { payload }) =>
        state.filter(({ id }) => id !== payload),
});

const filterReducer = createReducer('', {
    [changeFilter]: (_, { payload }) => payload,
});

const loadingReducer = createReducer(false, {
    // [fetchContactRequest]: () => true,
    // [fetchContactSuccess]: () => false,
    // [fetchContactError]: () => false,
    [addContactRequest]: () => true,
    [addContactSuccess]: () => false,
    [addContactError]: () => false,
    [deleteContactRequest]: () => true,
    [deleteContactSuccess]: () => false,
    [deleteContactError]: () => false,
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
