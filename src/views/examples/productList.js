import React from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardText,
  CardTitle,
  CardFooter,
  CardBody,
  Label,
  FormGroup,
  Input,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Button,
  ModalFooter,
  UncontrolledTooltip,
  TabContent, TabPane, Nav, NavItem, NavLink,
  Spinner,
  Table
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import * as http from '../../api/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classnames from 'classnames';
import { Component } from "react";

class ProductList extends Component{
    constructor(){
        super()
        this.state = {
            search:'',
            getProducts:[],
            productAddModal:false,
            productId:'',
            productName:'',
            availableQuantity:''
          };
       
    }
    productAddModal = ()=>{
        this.setState({
            productAddModal:!this.state.productAddModal
        })
      }
      handleOnChange = (e) =>{
          const target = e.target
          const name = target.name
          const value = target.value
          this.setState({
              [name]:value
          })
      }
      componentDidMount(){
        this.getProductsList()
        
      }
      getProductsList = () =>{
        http
        .productGet("Product")
        .then((resp)=>resp.json())
        .then(data =>{
          console.log(data)
          this.setState({
            getProducts:data
          })
        })
      }
      submitProduct = () =>{
        let body={
          productName:this.state.productName,
          availableQuantity:"SFD",
          productId:this.state.productId
        }
        console.log(body)
          http
          .productAdd(body,"Product")
          .then((resp)=>resp.json)
          .then(data =>{
            console.log(data)
              this.setState({
                productAddModal:false,
                productName:'',
                availableQuantity:''
              })
           
          })
          this.getProductsList()
      }
render(){
    const {getProducts,search} = this.state
    return(
        <>
        <Header />
        <Container className="mt--7" fluid>
        <ToastContainer />
        <Row>
          <div className="col">
            <Card className="shadow container bg-secondary">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Product List</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      size="sm"
                      onClick={this.productAddModal}
                    >
                      Add Products
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              <div>
              <Row>
            <Col sm="12">
              <div className="mt-5">
                  <Row>
                      <Col sm="12" md="6" lg="6">
                      <input
                      className="form-control-alternative form-control"
                      placeholder="Search"
                      type="text"
                      name="search"
                      value={this.state.search}
                      onChange={this.handleOnChange}
                      />
                      </Col>
                  </Row>
                  <Row>
                      <Col md="12">
                      <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Available Quantity</th>
                  </tr>
                </thead>
                <tbody>
                    {
                        getProducts.map(product=>(
                            <tr>
                                <td>{product.productName}</td>
                                <td>{product.availableQuantity}</td>
                            </tr>
                        ))
                    }
                </tbody>
                      </Table>
                      </Col>
                  </Row>
              </div>
              </Col>
              </Row>
      </div>  
            </CardBody> 
            </Card>
            </div>
            </Row>
            </Container>
            <Modal isOpen={this.state.productAddModal} toggle={this.productAddModal} className={this.className}>
            <ModalHeader toggle={this.productAddModal}>Product Add</ModalHeader>
            <ModalBody className="bg-secondary shadow">
              <Row>
              <Col sm="12" md="12" lg="12">
              <FormGroup>
                            <Label for="exampleEmail">Product Name</Label>
                            <Input type="text" name="productName" value={this.state.productName} onChange={this.handleOnChange} placeholder="Product Name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Quantity</Label>
                            <Input type="text" name="availableQuantity" value={this.state.availableQuantity} onChange={this.handleOnChange} placeholder="availableQuantity" />
                        </FormGroup>
              </Col>
              
              </Row>
            </ModalBody>
            <ModalFooter>
          <Button color="primary" onClick={this.submitProduct} >Add Product</Button>{' '}
          <Button color="secondary" onClick={this.productAddModal}>Cancel</Button>
        </ModalFooter>
            </Modal>
      </>
    )
}
}
export default ProductList;