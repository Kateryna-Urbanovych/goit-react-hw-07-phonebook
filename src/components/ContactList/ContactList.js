import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './ContactList.module.css';
import ContactItem from 'components/ContactItem';
import { contactsOperations, contactsSelectors } from 'redux/contacts';

const ContactList = () => {
    const contacts = useSelector(contactsSelectors.getVisibleContacts);
    const loading = useSelector(contactsSelectors.getLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(contactsOperations.fetchContacts());
    }, [dispatch]);

    return (
        <ul className={s.contactList}>
            {/* отображает отсутствие контаков */}
            {contacts.length === 0 && <p>No contacts</p>}

            {/* отображает загрузку контаков */}
            {loading && <p>Loading contacts ...</p>}

            {contacts.map(({ id, name, number }) => (
                <li key={id} className={s.contactItem}>
                    <ContactItem name={name} number={number} id={id} />
                </li>
            ))}
        </ul>
    );
};

export default ContactList;
