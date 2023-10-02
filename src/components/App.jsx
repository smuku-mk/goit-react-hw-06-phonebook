import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, setFilter } from '../redux/slices';
import { getContacts, getFilter } from '../redux/selectors';

import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { ContactForm } from './ContactForm';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const handleSubmit = data => {
    const { name, number } = data;
    const isContactExist = contacts.find(contact => contact.name === name);

    if (isContactExist) {
      dispatch(setFilter(''));
      alert(`${name} is already in contacts`);
    } else {
      dispatch(addContact(name, number));
      dispatch(setFilter(''));
    }
  };

  const handleFilterChange = evt => {
    dispatch(setFilter(evt.target.value));
  };

  const filteredContacts = (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filtered = filteredContacts(contacts, filter);

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm data={handleSubmit} />
      <h2>Contacts</h2>
      <Filter onChange={handleFilterChange} />
      <ContactList contacts={filtered} onButtonClick={handleDeleteContact} />
    </>
  );
};
