import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './NameForm.module.css';

class NameForm extends Component {
    state = {
        name: ''
    }

    handleChange = e => {
        this.setState({
            name: e.target.value,
        });
        
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            name: e.target.value,
        });
        this.props.onCreateNewPlayer(this.state);
        this.reset();
    }

    reset = () => {
        this.setState({ name: '' });
        this.setState({ status: ''});
    }

    render() {
        const {name} = this.state;
        
        return (
            <form onSubmit={this.handleSubmit} className={s.form}>
                <label className={s.label}>
                    <span className={s.title}>Enter your name</span>
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
                <button className={s.button} type="submit">Begin game</button>
            </form>
        )
    }
}

NameForm.propTypes = {
    onCreateNewPlayer: PropTypes.func,
};

export default NameForm;