import React, { Component } from 'react'
import Header from './contactHeder'
import Footer from '../footer/Footer'
import write from './write.png'
import './contact.css'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
var userData={}
export default class Contact extends Component {
    constructor(props){
        super(props)
        this.state={
           
            username:'',message:'',redirect:false
        }
    }
    handleChange=(e)=>{
        this.setState({ [e.target.id]:e.target.value} )
    }
    onSubmit = e => {
        
        e.preventDefault();
     userData = {
          username: this.state.username,
          message:this.state.message
        };
    console.log(userData);
    Axios.post("/contact", userData)
            
            .then(res => {
                console.log(res.config.data)
              if(res.data){
                  console.log('Successfull')
                  this.setState({redirect:true})
              }
              else console.log(' error')
            })
            .catch(err =>
              console.log(err.response.data)
              
            ); 
}
    render() {
        if(this.state.redirect){
            return <Redirect to='/'/>
        }
        return (
            <>
            <Header/>
            <div className="top-img">
                <img src={write} alt="Image of students oragninsing camp" />
            </div>
            <section className="section-book">
            <div className="row">
                <div className="book">
                    <div className="book__form">
                        <form action="#" className="form" autoComplete="off">
                            <div className="u-margin-bottom-medium">
                                <h2 className="heading-secondary">
                                    Contact Us
                                </h2>
                            </div>
                            <div className="form__group">
                                
                                <input type="email" className="form__input" placeholder="Email Address" id="username" required   onChange={(e)=>this.handleChange(e)} />
                                <label for="email" className="form__label">Email Address</label>
                            </div>
    
                            <div className="form__group">
                            <textarea type="type" className="form__input" placeholder="Message for us" id="message" required   onChange={(e)=>this.handleChange(e)} />
                                <label for="text" className="form__label">Message for us</label>
                            </div>
                            
                                <div className="form__group u-margin-top-small u-margin-bottom-big">
                                    <button className="btn btn--green btn--animated" onClick={this.onSubmit}>
                                        Submit &rarr;
                                    </button>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
        </>
        )
    }
}
