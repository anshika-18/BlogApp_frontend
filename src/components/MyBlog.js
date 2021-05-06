import axios from 'axios'
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Create from './create'
import './css/create.css'

export default class MyBlog extends Component {

    state={
        email:'',
        blogs:null
    }
    componentDidMount()
    {
        this.setState({email:this.props.passed.email})
        const token=localStorage.getItem('token')
        if(token)
        {
        const config={
        headers:{
          'x-auth-token':token
        }
        }
        axios.get('https://blogapp-backend-anshika.herokuapp.com/api/blog',config)
        .then(res=>{
          console.log(res.data.data)
          this.setState({blogs:res.data.data})
        })
        .catch(err=>console.log(err.response.data))

    }
    }

    render() {
        //console.log(this.state.email)
        return (
            <div>
                <h1>My Blogs</h1>
                {this.props.passed.email
                ?
                <> 
                 {this.state.blogs ? (
                    <div className="mapping" >  
                        <div className="mapping-blogs">
                        {this.state.blogs.map((blog) => (
                            <>
                            <Card className="text-center Card">
                                <Card.Header>{blog.title}</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <b>By: {blog.author}</b><br></br>
                                        { blog.description.substring(0,250)+"..."}
                                    </Card.Text>
                                   <Link to={{pathname:"/blog/"+blog._id}}><Button variant="primary" >Read more</Button></Link> 
                                </Card.Body>
                            </Card>
                            </>
                        ))
        
                        }
                        </div>
                        <div><Create/></div>
                    </div>
                ) : (
                    <><div className="container loader">
                            <span>L</span>
                            <span>O</span>
                            <span>A</span>
                            <span>D</span>
                            <span>I</span>
                            <span>N</span>
                            <span>G</span>
                         </div></>
                )
                }
                   
            </>
                
                :
                <div>Please login to enter blog</div>
                }
            </div>
        )
    }
}
