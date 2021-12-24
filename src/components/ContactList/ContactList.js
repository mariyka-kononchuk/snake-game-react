import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import ContactListItem from '../ContactListItem';

const ContactList = ({ contacts, onDeleteContact }) => (
    <ul className={s.list}>
        {contacts.map((contacts)=> (
            <li key={contacts.id}  >
                 <ContactListItem contacts={contacts} onDeleteContact={onDeleteContact} />
            </li>
        ))}
    </ul>
)

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        })
    ),
    onDeleteContact:PropTypes.func.isRequired
};

export default ContactList;

 