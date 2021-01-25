import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './ContactForm.module.css';
import { contactsOperations, contactsSelectors } from 'redux/contacts';

export default function ContactForm() {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const contactsNames = useSelector(contactsSelectors.getContactsNames);
    const dispatch = useDispatch();

    const handleChange = ({ target }) => {
        const { name, value } = target;

        switch (name) {
            case 'name':
                setName(value);
                break;

            case 'number':
                setNumber(value);
                break;

            default:
                return;
        }
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (contactsNames.includes(name.toLowerCase())) {
            alert(`${name} is already in contacts`);
            return;
        }

        // 2-ой вариант поиска существующего имени
        // if (
        //     contacts.find(
        //         contact => contact.name.toLowerCase() === name.toLowerCase(),
        //     )
        // ) {
        //     alert(`${name} is already in contacts`);
        //     return;
        // }

        dispatch(contactsOperations.addContact(name, number));
        reset();
    };

    const reset = () => {
        setName('');
        setNumber('');
    };

    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <label className={s.label}>
                Name
                <input
                    type="text"
                    className={s.input}
                    name="name"
                    value={name}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </label>
            <label className={s.label}>
                Number
                <input
                    type="tel"
                    className={s.input}
                    name="number"
                    value={number}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </label>
            <button
                type="submit"
                className={s.button}
                disabled={name === '' || number === ''}
            >
                Add contact
            </button>
        </form>
    );
}
