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

class RegisterModal extends Component{
    state={
        modal:false,
        name:'',
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
        const user={
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
        }
        axios.post('https://blogapp-backend-anshika.herokuapp.com/api/users',user)
            .then(res=>{
                console.log(res.data)
                localStorage.setItem('token',res.data.token)
                this.props.handleAuthentication(true)
                this.props.setUser(res.data.user.name)
                this.props.setToken(res.data.token)
                this.props.setEmail(res.data.user.email)
                this.toggle()
                
            })
            .catch(err=>{
                console.log(err.response.data)
                console.log("anshika")
                this.setState({msg:err.response.data.msg})
            })
        
    }

    render(){
        return(
            <div>
               <NavLink onClick={this.toggle} hreaf="#">Register</NavLink>

                <Modal 
                    isOpen={this.state.modal}
                    toogle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg?<Alert color="danger">{this.state.msg}</Alert> :null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className="mb-3"
                                    onChange={this.onChange}
                                >
                                </Input>

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
                                    Register
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}


export default (RegisterModal);

