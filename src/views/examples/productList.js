import React from "react";
import Paginating from "components/Pagination/Pagination";

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
			      orderProductModal:false,
            productName:'',
            availableQuantity:'',
			      productId:'',
			      quantity:'',
            pageSize:100,
            currentPage:0
          };
       
    }
    productAddModal = ()=>{
        this.setState({
            productAddModal:!this.state.productAddModal
        })
      }
	  orderProductModal = () =>{
		  this.setState({
            orderProductModal:!this.state.orderProductModal
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
          console.log(this.state.getProducts.length)
        })
      }
      submitProduct = () =>{
        let body={
          productName:this.state.productName,
          availableQuantity:parseInt(this.state.availableQuantity)
        }
        console.log(body)
          http
          .productAdd(body,"Product")
          .then((resp)=>resp.json())
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
      handleonPageChange=(index)=>{
        this.setState({
          currentPage:index,
        })
        console.log(this.state.currentPage)
      
      }
	  orderProducts (productId){
		  this.setState({
			  productId:productId,
			  orderProductModal:!this.state.orderProductModal
		  })
		  
	  }
	  submitOrderProduct = () =>{
		  let body={
          productId:this.state.productId,
          quantity:parseInt(this.state.quantity)
        }
        console.log(body)
          http
          .orderProduct(body,"OrderProducts")
          .then((resp)=>resp.json())
          .then(data =>{
            console.log(data)
              this.setState({
                orderProductModal:false,
                productId:'',
                quantity:''
              })
           
          })
          this.getProductsList()
	  }
render(){
    const {getProducts,search} = this.state
    const filterGetProducts = getProducts.filter(product=>product.productName!==null).slice(this.state.currentPage * this.state.pageSize,(this.state.currentPage + 1) * this.state.pageSize)
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
                <div className="mb-5">
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
                  </div>
                  <Row>
                      <Col md="12">
                      <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Available Quantity</th>
                    <th scope="col">Order Product</th>
                  </tr>
                </thead>
                <tbody>
                    {
                        filterGetProducts.filter(product=>product.productName.toLowerCase().includes(search.toLowerCase())).map(product=>(
                            <tr>
                                <td>{product.productName}</td>
                                <td>{product.availableQuantity}</td>
								<td><Button color="primary" size="sm" onClick={()=>this.orderProducts(product.productId)}>Order Products</Button></td>
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
              <Row>
                <Col>
                <Paginating
          NoOfValuesInArray={this.state.getProducts.length}
          pageSize={this.state.pageSize}
          onPageChange={this.handleonPageChange}
          currentPage={this.state.currentPage}
          />
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
			<Modal isOpen={this.state.orderProductModal} toggle={this.orderProductModal} className={this.className}>
            <ModalHeader toggle={this.orderProductModal}>Order Products</ModalHeader>
            <ModalBody className="bg-secondary shadow">
              <Row>
              <Col sm="12" md="12" lg="12">
              <FormGroup>
                            <Label for="exampleEmail">Product Id</Label>
                            <Input type="text" name="productId" value={this.state.productId} onChange={this.handleOnChange} placeholder="Product Id" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Quantity</Label>
                            <Input type="text" name="quantity" value={this.state.quantity} onChange={this.handleOnChange} placeholder="Quantity" />
                        </FormGroup>
              </Col>
              
              </Row>
            </ModalBody>
            <ModalFooter>
          <Button color="primary" onClick={this.submitOrderProduct} >Add Product</Button>{' '}
          <Button color="secondary" onClick={this.orderProductModal}>Cancel</Button>
        </ModalFooter>
            </Modal>
      </>
    )
}
}
export default ProductList;