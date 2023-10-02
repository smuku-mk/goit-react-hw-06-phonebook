import { useDispatch, useSelector } from 'react-redux';
import { addContact, setFilter } from '../../redux/slices';
import { getContacts } from '../../redux/selectors';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = evt => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const { name, number } = form.elements;
    const isContactExist = contacts.find(
      contact => contact.name === name.value
    );

    if (isContactExist) {
      dispatch(setFilter(''));
      alert(`${name.value} is already in contacts`);
    } else {
      dispatch(addContact(name.value, number.value));
      dispatch(setFilter(''));
    }

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        <span>Number</span>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};
