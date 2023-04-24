import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import ContactList from './Components/Contacts/ContactList';
import AddContact from './Components/Contacts/AddContact';
import ViewContact from './Components/Contacts/ViewContact';
import EditContact from './Components/Contacts/EditContact';
import Navbar from './Components/Navbar/Navbar';

let App = () => {
  return (
    <React.Fragment>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ContactList/>}/>
        <Route path='/contacts/list' element={<ContactList/>} />
        <Route path='/contacts/add' element={<AddContact/>} />
        <Route path='/contacts/view/:contactId' element={<ViewContact/>} />
        <Route path='/contacts/edit/:contactId' element={<EditContact/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
