import { useSelector, useDispatch } from 'react-redux';
import s from './Filter.module.css';
import { contactsActions, contactsSelectors } from 'redux/contacts';

const Filter = () => {
    const value = useSelector(contactsSelectors.getFilter);
    const dispatch = useDispatch();

    return (
        <label className={s.label}>
            Find contacts by name
            <input
                type="text"
                className={s.input}
                value={value}
                onChange={event =>
                    dispatch(contactsActions.changeFilter(event.target.value))
                }
                autoComplete="off"
            />
        </label>
    );
};

export default Filter;
