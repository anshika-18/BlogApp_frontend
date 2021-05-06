import React, { Component } from 'react'
import axios from 'axios'

import Card from "react-bootstrap/Card"
import {Redirect,Link } from 'react-router-dom'
import Button from "react-bootstrap/Button"
export default class singleBlog extends Component {

    state={
        blog:null,
        user:null,
        matched:false
    }

    componentDidMount()
    {
        const config={
            headers:{
                'x-auth-token':localStorage.getItem('token')
            }
        }
        console.log(this.props.match.params.id)
        const id=this.props.match.params.id
        axios.get(`http://localhost:5000/blog/${id}`,config)
            .then((blog)=>{
                
                this.setState({blog:blog.data})
            })
    }

    delete=()=>{
        let id=this.props.match.params.id
        const config={
            headers:{
                'x-auth-token':localStorage.getItem('token')
            }
        }
        axios.get("http://localhost:5000/api/auth/user",config)
            .then(user=>{
                this.setState({user:user.data})
                if(this.state.user)
                {
                    axios.get(`http://localhost:5000/blog/${id}`)
                        .then(blog=>{
                            this.setState({blog:blog})
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    if(this.state.user.email===this.state.blog.email)
                    {
                        axios.delete(`http://localhost:5000/api/blog/${id}`)
                            .then(res=>{
                                console.log(res.data)
                                this.props.history.push('/myblogs')
                            })
                    }
                    else
                    {
                        window.alert("This blog Does not blog to you..You cannot delete it..!!")
                    }

                }
                else
                {
                    window.alert("please login to delete")
                }
            })
            .catch(err=>{
                window.alert("please login to delete")
            })
    }

    render() {
        //console.log(this.props)
        return (
            <div>
                {this.state.blog
                ?<>
                <Card className="text-center Card">
                        <Card.Header>{this.state.blog.title}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <b>By: {this.state.blog.author}</b><br></br>
                                { this.state.blog.description}
                            </Card.Text>
                           
                        </Card.Body>
                     </Card>
                     
                    <Link to={{pathname:'/update/'+this.state.blog._id}}><Button Variant="primary">Update</Button></Link>
                    <Button Variant="primary" onClick={this.delete} >Delete</Button>
                   
            </>
            :
            <></>
            }
            </div>
        )
    }
}
