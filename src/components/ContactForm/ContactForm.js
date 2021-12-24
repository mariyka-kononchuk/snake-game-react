import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

class ContactForm extends Component {
    state = {
        name: '',
        number: '',
        id:''
    }

    handleChange = e => {
        const { name, value } = e.currentTarget;
        this.setState({
            [name]: value,
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { name, value } = e.currentTarget;
        this.setState({
            [name]: value
        });
        this.props.onAddContact(this.state);
        this.reset();
    }

    reset = () => {
        this.setState({ name: '', number: '' });
    }

    render() {
        const { name, number } = this.state;
        
        return (
            <form onSubmit={this.handleSubmit} className={s.form}>
                <label className={s.label}>
                    <span className={s.title}>Name</span>
                    <input
                        className={s.input}
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                        required
                    />
                </label>
                <label className={s.label}>
                    <span className={s.title}>Number</span>
                    <input
                        className={s.input}
                        type="tel"
                        name="number"
                        value={number}
                        onChange={this.handleChange}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                        required
                    />
                </label>
                <button className={s.button} type="submit">Add contact</button>
            </form>
        )
    }
}

ContactForm.propTypes = {
    onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;