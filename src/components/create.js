import React,{Component} from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import axios from "axios"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Spinner from 'react-bootstrap/Spinner'


class CreateBlog extends Component{
    state={
        isLoading:false,
        title:"",
        author:"",
        desc:"",
        email:""
    }

    
     handleChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

     postBlog=(e)=>{

        const config={
            headers:{
                'x-auth-token':localStorage.getItem('token')
            }
        }

        this.setState({isLoading:true})
            axios.get('https://blogapp-backend-anshika.herokuapp.com/api/auth/user',config)
                .then(user=>{
                    console.log(user)
                    const blogPost={
                        title:this.state.title,
                        author:this.state.author,
                        description:this.state.desc,
                        email:user.data.email
                    }
                    axios.post('https://blogapp-backend-anshika.herokuapp.com/api/blog/create',blogPost)
                        .then(res=>{
                            console.log(res.data)
                            window.alert("Blog created")
                        })
                        .catch(err=>console.log(err.response.data))
                })
            this.setState({isLoading:false})
            window.location.reload()
    }

    
   
    onSubmit=(e)=>{
        if(this.state.title.trim()==="")
        {
            window.alert("title field is empty. Please enter the title of your blog");
        }
        else if(this.state.author.trim()==="")
        {
            window.alert("author field is empty. Please enter the author name");
        }
        else if(this.state.desc.trim()==="")
        {
            window.alert("description field is empty. Please enter the description of your blog")
        }
        else
        {
            this.postBlog();
        }
    }

    //console.log(blogPost)
    render(){
        return(
            <div >
            <Modal.Dialog >
                <Modal.Header>
                    <Modal.Title className="label">Create a Blog</Modal.Title>
                </Modal.Header>
                
                <Form className="form-background"> 
                <Form.Group controlId="">
                    <Form.Label className="label">Title</Form.Label>
                        <Form.Control type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Title of blog" />
                    </Form.Group>
                <Form.Group controlId="">
                    <Form.Label className="label">Author</Form.Label>
                    <Form.Control type="text" placeholder="author of blog" name="author" value={this.state.author} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label className="label">Description</Form.Label>
                    <Form.Control as="textarea" rows={4} name="desc" value={this.state.desc} onChange={this.handleChange} placeholder="write your blog......"/>
                </Form.Group>
                
                <Modal.Footer>
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Click to create a blog!</Tooltip>}>
                <Button variant="primary" onClick={this.onSubmit}> 
                {this.state.isLoading ?<div> <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        /> Loading…</div> 
        : 'Create'}
        </Button>
                </OverlayTrigger>
                </Modal.Footer>
            </Form>
            </Modal.Dialog> 
            </div>
        )
    }
}

export default CreateBlog;