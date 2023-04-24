import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import dogGif from '../../assets/loadingdog.gif';

const ViewContact = () => {

    let {contactId} = useParams();

    let [state,setState] = useState({
        loading:false,
        contact:{},
        group:{},
        errorMsg:''
    });

    let {loading, contact, group, errorMsg} = state;

    useEffect(async()=>{
        try{
            setState({...state, loading:true,});
            let response = await axios.get(`http://localhost:5000/contacts/${contactId}`);
            let groupResponse = await axios.get(`http://localhost:5000/groups/${response.data.groupId}`);
            setState({...state, loading:false, contact:response.data, group:groupResponse.data});
        }
        catch(err){
            setState({...state, loading:false, errorMsg:err});
        }
    },[])

    return (
        <React.Fragment>
            <section className='view-contact'>
                <div className="container p-3">
                    <div className="row">
                        <div className="col">
                            <h1 className='text-warning fw-bold'>View Contact</h1>
                            <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi at iusto omnis id tempora aperiam dignissimos autem repellat nisi, asperiores corrupti, error harum in laborum veritatis voluptate totam? Accusantium nobis voluptas totam tempore doloremque necessitatibus voluptatibus hic nemo! Quasi, accusantium.</p>
                        </div>
                    </div>
                </div>
            </section>

            {
                loading ? <img src={dogGif} className="img-fluid d-block m-auto w-25" alt="" /> :
                Object.keys(contact).length>0 &&
                <section className='show-contact'>
                <div className="container p-3">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-4">
                            <img src={contact.photo} className='img-fluid rounded-circle view-img' alt="" />
                        </div>
                        <div className="col-md-8">
                            <ul className='list-group'>
                                <li className='list-group-item list-group-item-action list-group-item-primary'>
                                    Name : <span className='fw-bold'>{contact.name}</span>
                                </li>
                                <li className='list-group-item list-group-item-action list-group-item-success'>
                                    email : <span className='fw-bold'>{contact.email}</span>
                                </li>
                                <li className='list-group-item list-group-item-action list-group-item-info'>
                                    Mobile : <span className='fw-bold'>{contact.mobile}</span>
                                </li>
                                <li className='list-group-item list-group-item-action list-group-item-danger'>
                                    Company : <span className='fw-bold'>{contact.company}</span>
                                </li>
                                <li className='list-group-item list-group-item-action list-group-item-light'>
                                    Title : <span className='fw-bold'>{contact.title}</span>
                                </li>
                                <li className='list-group-item list-group-item-action list-group-item-primary'>
                                    Group : <span className='fw-bold'>{group.name}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            }


            <div>
                <Link to={'/contacts/list'}>
                    <button className='btn btn-warning back-btn'>Back</button>
                </Link>
            </div>
        </React.Fragment>
    );
};

export default ViewContact;