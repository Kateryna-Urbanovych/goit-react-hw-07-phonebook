import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './ContactList.module.css';
import { getVisibleContacts } from '../../redux/contacts/contacts-selectors';
import contactsOperations from '../../redux/contacts/contacts-operations';
import ContactItem from '../ContactItem';

const ContactList = () => {
    const contacts = useSelector(getVisibleContacts);
    const dispatch = useDispatch();

    useEffect(() => dispatch(contactsOperations.fetchContacts()), [dispatch]);

    return (
        <ul className={s.contactList}>
            {/* отображает отсутствие контаков */}
            {contacts.length === 0 && <p>No contacts</p>}

            {contacts.map(({ id, name, number }) => (
                <li key={id} className={s.contactItem}>
                    <ContactItem name={name} number={number} id={id} />
                </li>
            ))}
        </ul>
    );
};

export default ContactList;
