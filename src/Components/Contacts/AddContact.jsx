import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddContact = () => {

    let navigate = useNavigate();

    let [state,setState] = useState({
        loading:false,
        contact:{
            name:'',
            photo:'',
            email:'',
            mobile:'',
            company:'',
            title:'',
            groupId:''
        },
        groups:[],
        errorMsg:''
    });

    useEffect(async()=>{
        try{
            setState({...state, loading:true,})
            let response = await axios.get(`http://localhost:5000/groups`);
            setState({...state, loading:false, groups:response.data})
        }
        catch(err){

        }
    },[])

    let changeInput = (e) => {
        setState({
            ...state,
            contact:{
                ...state.contact,
                [e.target.name] : e.target.value
            }
        })
    };

    let submitFun = async(e) => {
        e.preventDefault();
        try{
            let response = await axios.post(`http://localhost:5000/contacts`,contact);
    

            if(response){
                navigate(`/contacts/list`,{replace:true})
            }
        }
        catch(err){
            navigate(`/contacts/add`,{replace:false})
        }
        
    };

    let {loading, contact, groups, errorMsg} = state;

    return (
        <React.Fragment>
            <pre>{JSON.stringify(contact)}</pre>
            <section className='add-contact'>
                <div className="container p-3">
                    <div className="row">
                        <div className="col">
                            <h1 className='text-primary fw-bold'>Create Contact</h1>
                            <p className="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam debitis sapiente quam iusto praesentium ipsum non labore nostrum impedit laudantium. Facere velit quod consequatur est aspernatur, repellendus maxime labore commodi autem quos magni quae amet sed dolorem. Ipsum, veniam exercitationem.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='create-contact'>
                <div className="container p-3">
                    <div className="row">
                        <div className="col-md-4">
                            <form action="" onSubmit={submitFun}>
                                <div className="mb-2">
                                    <input 
                                    required={true}
                                    name='name'
                                    value={contact.name}
                                    onChange={changeInput}
                                    type="text" className='form-control' placeholder='Name' />
                                </div>
                                <div className="mb-2">
                                    <input 
                                    required={true}
                                    name='photo'
                                    value={contact.photo}
                                    onChange={changeInput}
                                    type="text" className='form-control' placeholder='Photo' />
                                </div>
                                <div className="mb-2">
                                    <input 
                                    required={true}
                                    name='email'
                                    value={contact.email}
                                    onChange={changeInput}
                                    type="email" className='form-control' placeholder='Email' />
                                </div>
                                <div className="mb-2">
                                    <input 
                                    name='mobile'
                                    required={true}
                                    value={contact.mobile}
                                    onChange={changeInput}
                                    type="number" className='form-control' placeholder='Mobile' />
                                </div>
                                <div className="mb-2">
                                    <input 
                                    required={true}
                                    name='company'
                                    value={contact.company}
                                    onChange={changeInput}
                                    type="text" className='form-control' placeholder='Company' />
                                </div>
                                <div className="mb-2">
                                    <input 
                                    required={true}
                                    name='title'
                                    value={contact.title}
                                    onChange={changeInput}
                                    type="text" className='form-control' placeholder='Title' />
                                </div>
                                <select className='form-control mb-2' 
                                name="groupId" 
                                value={contact.groupId}
                                onChange={changeInput}
                                id="">
                                    <option value="">Select a Group-</option>
                                    {
                                        groups.length>0 && groups.map(group=>{
                                            return(
                                                <option value={group.id} key={group.id}>{group.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <div className="mb-2">
                                    <input type="submit" className='btn btn-primary' value="Create" />
                                    <Link to={'/contacts/list'}>
                                        <button className='btn btn-dark ms-2'>Back</button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default AddContact;