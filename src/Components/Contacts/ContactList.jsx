import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import dogGif from '../../assets/loadingdog.gif';

const ContactList = () => {
    
    
    let {contact} = useParams();

    let [state,setState] = useState({
        loading:false,
        contacts:[],
        filteredContacts:[],
        errorMsg:''
    });

    let [term,setTerm] = useState({
        text:"" 
    });

    let changeText = (e) => {
        setTerm({
            ...term,
            text:e.target.value
        })
        let searchContact = state.contacts.filter(contact=>{
            return contact.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setState({...state,filteredContacts:searchContact})
    };

   
        
        

    useEffect(async()=>{
        try{
            setState({...state,loading:true});
            let response = await axios.get(`http://localhost:5000/contacts`);
            setState({...state, loading:false, contacts:response.data,filteredContacts:response.data});
        }
        catch(err){
            setState({...state, loading:false, errorMsg:err});
        }
    },[])

    let deleteFun=async(id)=>{
        try{
            let response = await axios.delete(`http://localhost:5000/contacts/${id}`,contact)
            if(response){
                setState({...state,loading:true});
                let response = await axios.get(`http://localhost:5000/contacts`);
                setState({...state, loading:false, contacts:response.data,filteredContacts:response.data});
            }
        }
        catch{
            setState({...state, loading:false, errorMsg:'err'});
        }
    };


    let {loading, contacts, filteredContacts, errorMsg} = state;

    return (
        <React.Fragment>
            <pre>{JSON.stringify(term)}</pre>
            <section className='contact-list'>
                <div className="container p-3">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <h1 className='text-success fw-bold'>Contact-List
                                <Link to={'/contacts/add'}>
                                    <button className='btn btn-primary ms-2'>New
                                    <i className='fa fa-plus-circle ms-2'></i>
                                    </button>
                                </Link>
                                </h1>
                                <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quisquam tempora voluptatem autem id culpa, quia numquam molestias qui neque doloribus, esse beatae cum? Sit soluta deserunt voluptatem odio facere reprehenderit possimus nulla, officia quidem incidunt blanditiis impedit obcaecati eaque!</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <form action="" className='row'>
                                    <div className="col-md-6">
                                        <input 
                                        required={true}
                                        name='text'
                                        onChange={changeText}
                                        type="text" className='form-control' placeholder='Search Here..' />
                                    </div>
                                    <div className="col-md-6">
                                        <button className='btn btn-success'>Search</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {
                loading ? <img src={dogGif} className="img-fluid d-block m-auto w-25" alt="" /> :
                <section className='the-contacts'>
                <div className="container p-3">
                    <div className="row">
                        {
                            filteredContacts.length>0 && filteredContacts.map(contact=>{
                                return(
                                    <div key={contact.id} className="col-md-6">
                            <div className="card shadow-lg mb-2">
                                <div className="card-body">
                                    <div className="row d-flex align-items-center justify-content-center">
                                        <div className="col-md-4">
                                            <img src={contact.photo} className='img-fluid' alt="" />
                                        </div>
                                        <div className="col-md-7">
                                            <ul className='list-group'>
                                                <li className='list-group-item list-group-item-action list-group-item-primary'>
                                                    Name : <span className='fw-bold'>{contact.name}</span>
                                                </li>
                                                <li className='list-group-item list-group-item-action list-group-item-success'>
                                                    email : <span className='fw-bold'>{contact.email}</span>
                                                </li>
                                                <li className='list-group-item list-group-item-action list-group-item-danger'>
                                                    Mobile : <span className='fw-bold'>{contact.mobile}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-1">
                                            <Link to={`/contacts/View/${contact.id}`}>
                                                <button className='btn btn-warning btn-sm mb-2'>
                                                    <i className='fa fa-eye'></i>
                                                </button>
                                            </Link>
                                            <Link to={`/contacts/edit/${contact.id}`}>
                                                <button className='btn btn-primary btn-sm mb-2'>
                                                    <i className='fa fa-pen'></i>
                                                </button>
                                            </Link>
                                            <button onClick={()=>deleteFun(contact.id)} className='btn btn-danger btn-sm'>
                                                <i className='fa fa-trash'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
            }
        </React.Fragment>
    );
};

export default ContactList;