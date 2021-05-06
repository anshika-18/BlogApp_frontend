import React,{Component} from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import axios from "axios"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Spinner from 'react-bootstrap/Spinner'

class CreateBlog extends Component {
    
    state={
        user:null,
        matched:false,
        isLoading:false,
        blogs:null,
        updated:false,
        blogPost:{
            title:"",
            author:"",
            desc:"",
            email:""
        }
    }

    componentDidMount(){
        let id=this.props.match.params.id

        const config={
            headers:{
                'x-auth-token':localStorage.getItem('token')
            }
        }

        axios.get('http://localhost:5000/api/auth/user',config)
            .then(user=>{
                console.log(user.data)
                this.setState({user:user.data})

                axios.get(`http://localhost:5000/blog/${id}`)
                    .then(res=>{
                        console.log(res.data);
                        if(res.data)
                        {
                            let blog=res.data;
                            this.setState({
                            blogPost:{
                                title:blog.title,
                                author:blog.author,
                                description:blog.description,
                                email:blog.email
                            }
                        });

                        console.log(this.state.user)
                        console.log(this.state.blogPost)

                    if(this.state.user.email===this.state.blogPost.email)
                    {
                        this.setState({matched:true})
                    }
    
                    }
                    })
                    .catch(error=>
                    console.log(error)
                     )
                
                
            })

            
       
    }
    
     handleChange=(e)=>{
        this.setState({
            blogPost:{
                ...this.state.blogPost,
                [e.target.name]: e.target.value
            }
        })
    }

     postBlog=async()=>{
        let id=this.props.match.params.id
        try
        {
            this.setState({isLoading:true})
            const res=await axios.put(`http://localhost:5000/update/${id}`,this.state.blogPost)
            
            if(res.data)
            {
                console.log(res.data)
                this.setState({blogs:res.data})
                let message="Blog Updated"
                this.setState({updated:true})
                console.log(this.state.updated)
                this.setState({isLoading:false})
                if(this.state.updated)
                {
                    //console.log("hello")
                    let id=this.props.match.params.id
                    this.props.history.push(`/blog/${id}`)
                }
            }
            
        }
        catch(err)
        {
            console.log(err);
        }
    }

   
    
   
     onSubmit=(e)=>{
         console.log(this.state.blogPost)
        if(this.state.blogPost.title.trim()==="")
        {
            window.alert("title field is empty. Please enter the title of your blog");
        }
        else if(this.state.blogPost.author.trim()==="")
        {
            window.alert("author field is empty. Please enter the author name");
        }
        else if(this.state.blogPost.description.trim()==="")
        {
            window.alert("description field is empty. Please enter the description of your blog")
        }
        else
        {
            this.postBlog();
        }
    }

    //console.log(blogPost)
    render()
    {
        return(
            <div>
                {this.state.user
            ?
           <div>
               {this.state.matched
               ?
               <div >
               <Modal.Dialog >
                   <Modal.Header>
                       <Modal.Title className="label">Create a Blog</Modal.Title>
                   </Modal.Header>
                   
                   <Form className="form-background"> 
                   <Form.Group controlId="">
                       <Form.Label className="label">Title</Form.Label>
                           <Form.Control type="text" name="title" value={this.state.blogPost.title} onChange={this.handleChange} placeholder="Title of blog" />
                       </Form.Group>
                   <Form.Group controlId="">
                       <Form.Label className="label">Author</Form.Label>
                       <Form.Control type="text" placeholder="author of blog" name="author" value={this.state.blogPost.author} onChange={this.handleChange} />
                   </Form.Group>
                   <Form.Group controlId="exampleForm.ControlTextarea1">
                       <Form.Label className="label">Description</Form.Label>
                       <Form.Control as="textarea" rows={4} name="description" value={this.state.blogPost.description} onChange={this.handleChange} placeholder="write your blog......"/>
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
           : 'Update'}
           </Button>
                   </OverlayTrigger>
                   </Modal.Footer>
               </Form>
               </Modal.Dialog> 
               </div>
               :
               <div>You have not created this blog So you cannot update this blog</div>
                }
           </div>
            :<>Please Login to update Blog</>
            }
            </div>
        )
    }
}

export default CreateBlog;