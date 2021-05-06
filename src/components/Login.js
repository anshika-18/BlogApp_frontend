import React,{Component} from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap'
import axios from 'axios'


class Login extends Component{
    state={
        modal:false,
        email:'',
        password:'',
        msg:null
    }
    toggle=()=>{
       
        this.setState({
            modal:!this.state.modal
        })   
    }

    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit=(e)=>{
        e.preventDefault();
        const userLogin={
            email:this.state.email,
            password:this.state.password
        }
        axios.post('http://localhost:5000/api/auth',userLogin)
            .then(user=>{
                //console.log(user.data.user.email)
                this.props.setEmail(user.data.user.email)
                localStorage.setItem('token',user.data.token)
                this.props.handleAuthentication(true)
                this.props.setUser(user.data.user.name)
                this.props.setToken(user.data.token)
                
                this.toggle()
            })
            .catch(err=>{
                console.log(err.response.data)
                this.setState({msg:err.response.data.msg})
            })
        window.location.reload();
    }

    render()
    {
        return(
            <div>
            <NavLink onClick={this.toggle} hreaf="#">LOGIN</NavLink>

             <Modal 
                 isOpen={this.state.modal}
                 toogle={this.toggle}
             >
                 <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                 <ModalBody>
                   {this.state.msg?<Alert color="danger">{this.state.msg}</Alert>:null}
                     <Form onSubmit={this.onSubmit}>
                         <FormGroup>
                             
                             <Label for="email">Email</Label>
                             <Input
                                 type="email"
                                 name="email"
                                 id="email"
                                 className="mb-3"
                                 placeholder="Email"
                                 onChange={this.onChange}
                             >
                             </Input>

                             <Label for="password">Password</Label>
                             <Input
                                 type="password"
                                 name="password"
                                 id="password"
                                 className="mb-3"
                                 placeholder="password"
                                 onChange={this.onChange}
                             >
                             </Input>

                             <Button
                                 color="dark"
                                 style={{marginTop:'2rem'}}
                             >
                                 Login
                             </Button>
                         </FormGroup>
                     </Form>
                 </ModalBody>

             </Modal>
         </div>
        )
    }
}

export default Login