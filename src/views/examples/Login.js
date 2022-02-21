import React, { useState, useEffect } from "react";
import * as http from '../../api/api'
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


	class Login extends React.Component{
		constructor(props){
			super(props)
			this.state={
				email:'',
				password:''
			}
		}
		
	
	handleChange = (e)=>{
		const target=e.target
		const name=target.name
		const value=target.value
		this.setState({
			[name]:value
		})
	}
	 handleSubmit = (e)=>{
    const { match, location, history } = this.props
    console.log(this.props)
		e.preventDefault();
		//console.log(loginData)
		let loginData={
			email:this.state.email,
				password:this.state.password
		}
		http
		.authPost(loginData,"signin")
		.then((resp)=>resp.json())
		.then(function(data){
			console.log(data)
			if(data.success){
				localStorage.setItem("token",data.token);
				localStorage.setItem("userDetail",JSON.stringify(data.userDetail));
				localStorage.setItem("id",JSON.stringify(data.userDetail.id));
				toast.success(data.message)
				setTimeout(()=>{
					history.push('/admin/index')
				},1000);
			}
			else{
        toast.error(data.message)
        console.log(data.message)
      }
		})
	}
	render(){
		return (
    <>
	<ToastContainer/>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={this.handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
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
					onChange={this.handleChange}
                    autoComplete="new-email"
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
					onChange={this.handleChange}
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
	}
  
};

export default Login;