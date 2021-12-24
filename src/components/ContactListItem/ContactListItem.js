import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactListItem.module.css';

const ContactListItem = ({ contacts, onDeleteContact }) => (
    <div className={s.item}>
        <p className={s.contact}>
            <span className={s.name}>{contacts.name}:
            </span>
            <span className={s.number}>{contacts.number}
            </span>
        </p>
        <button className={s.button} onClick={()=> onDeleteContact(contacts.id)}>Delete</button>
    </div> 
)

ContactListItem.propTypes = {
  contacts: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired
  }),
    onDeleteContact:PropTypes.func.isRequired
};

export default ContactListItem;