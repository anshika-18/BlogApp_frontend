import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

import './css/allblogs.css'

class Main extends Component{
    
    state={
        blogs:null
    }
    componentDidMount()
    {
        axios.get('http://localhost:5000/api/blogs')
            .then(res=>{
                console.log(res.data)
                this.setState({blogs:res.data})
            })
            .catch(err=>console.log(err))
    }
    render()
    {
        
        return(
           
            <> 
        <Container>
        <Row >
        {this.state.blogs ? (
            <div className="mapping">  
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
        </Row>
    </Container>    
    </>
        
        )
    }
}

export default Main;
