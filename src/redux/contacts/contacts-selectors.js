import { createSelector } from '@reduxjs/toolkit';

export const getContacts = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;
export const getLoading = state => state.contacts.loading;

export const getVisibleContacts = createSelector(
    [getContacts, getFilter],
    (contacts, filter) => {
        const normalizedFilter = filter.toLowerCase();
        return contacts.filter(({ name }) =>
            name.toLowerCase().includes(normalizedFilter),
        );
    },
);

export const getContactsNames = createSelector([getContacts], contacts => {
    return contacts.reduce((allNames, { name }) => {
        allNames.push(name.toLowerCase());
        return allNames;
    }, []);
});

// без мемоизации (библиотека Reselect)

// export const getVisibleContacts = state => {
//     const contacts = getContacts(state);
//     const filter = getFilter(state);

//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter(({ name }) =>
//         name.toLowerCase().includes(normalizedFilter),
//     );
// };

// export const getContactsNames = state => {
//     const contacts = getContacts(state);

//     return contacts.reduce((allNames, { name }) => {
//         allNames.push(name.toLowerCase());
//         return allNames;
//     }, []);
// };
