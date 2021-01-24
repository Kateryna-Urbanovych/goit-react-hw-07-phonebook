import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import s from './ContactItem.module.css';
import contactsOperations from '../../redux/contacts/contacts-operations';

const ContactItem = ({ name, number, id }) => {
    const dispatch = useDispatch();
    return (
        <>
            {name}: {number}
            <button
                type="button"
                className={s.btnDelete}
                onClick={() => dispatch(contactsOperations.deleteContact(id))}
            >
                Delete
            </button>
        </>
    );
};

export default ContactItem;

ContactItem.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};
