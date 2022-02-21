import React from 'react';
import * as http from '../../api/api'
import {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";


	class Register extends React.Component{
		constructor(){
      super();
      this.state={
        firstName:'',
		    lastName:'',
		    email:'',
	  	  password:'',
		  adminType:'Super Admin'
      }
    }
	
	handleChangeAdd =(e)=>{
		 const target=e.target
     const name=target.name
     const value=target.value
     this.setState({
       [name]:value
     })
	}
   handleSubmitAddProf=(e)=>{
		e.preventDefault();
    let body={
      firstName:this.state.firstName,
		    lastName:this.state.lastName,
		    email:this.state.email,
	  	  password:this.state.password,
        adminType:this.state.adminType
    }
    
		
	}
  render(){
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form" onSubmit={this.handleSubmitAddProf}>
        <Row>
                  <Col sm="12" md="6" lg="6">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="First Name" type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChangeAdd}
            />
                  </InputGroup>
                </FormGroup>
          </Col>
          <Col sm="12" md="6" lg="6">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Last Name" type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChangeAdd}
            />
                  </InputGroup>
                </FormGroup>
          </Col>
          </Row>
          <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
            name="email"
            value={this.state.email}
                      autoComplete="new-email"
            onChange={this.handleChangeAdd}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
            name="password"
            value={this.state.password}
                      autoComplete="new-password"
            onChange={this.handleChangeAdd}
                    />
                  </InputGroup>
                </FormGroup>
                
                
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
  
}

export default Register;
