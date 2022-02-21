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
import { data } from "jquery";

class Clients extends Component{
    constructor(){
        super()
        this.state = {
            activeTab: 'interior',
            search:'',
            readInterior:[],
            unReadInterior:[],
            readExterior:[],
            unReadExterior:[],
            readConsultant:[],
            unReadConsultant:[],
            readPlan:[],
            unReadPlan:[]
          };
       
    }
    toggle =(tab)=> {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
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
        this.getInteriorProjects()
        this.getExteriorProjects()
        this.getConsultantsProjects()
        this.getPlanProjects()
        
      }
      getInteriorProjects = () =>{
        
      }
      getExteriorProjects = () =>{
        
      }
      getConsultantsProjects = () =>{
        
      }
      getPlanProjects = () =>{
        
      }
      
      imageDetail = (client) =>{
        console.log(this.state.activeTab.toLowerCase())
        var cata = this.state.activeTab.toLowerCase()
        console.log(cata)
        console.log(client)
      }
render(){
  const { readInterior,search,readExterior,readConsultant,readPlan,unReadInterior,unReadExterior,unReadConsultant,unReadPlan} = this.state;
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
                    <h3 className="mb-0">Clients</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'interior' })}
              onClick={() => { this.toggle('interior'); }}
            >
              Interior {unReadInterior == 0 ?null:<Badge color="primary" pill>{unReadInterior}</Badge>}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'exterior' })}
              onClick={() => { this.toggle('exterior'); }}
            >
              Exterior {unReadExterior == 0 ?null:<Badge color="primary" pill>{unReadExterior}</Badge>}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'consultant' })}
              onClick={() => { this.toggle('consultant'); }}
            >
              Consultant {unReadConsultant == 0 ?null:<Badge color="primary" pill>{unReadConsultant}</Badge>}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'plans' })}
              onClick={() => { this.toggle('plans'); }}
            >
              Plans {unReadPlan == 0 ?null:<Badge color="primary" pill>{unReadPlan}</Badge>}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="interior">
          <Row>
            <Col sm="12">
              <div className="mt-5">
                  <Row>
                      <Col sm="12" md="6" lg="6">
                      <h4>Interior</h4>
                      </Col>
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
                    <th>S.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    readInterior.filter(data=>data.name.toLowerCase().includes(search.toLowerCase())).map((clients,index)=>(
                      <tr>
                        <td>{index + 1}</td>
                        <td className="text-capitalize">{clients.name} {clients.readingStatus=="unread" ? (<Badge color="primary">New</Badge>) : null} </td>
                        <td>{clients.phone}</td>
                        <td>
                          <i class="far fa-eye" style={{marginRight: "20px",cursor:"pointer"}} onClick={()=>this.imageDetail(clients)}></i>
                          <i class="fas fa-trash-alt" style={{cursor:"pointer"}}></i>
                        </td>
                      </tr>
                    ))}
                    {
                      readInterior.length===0 ? 
                      <div>
                          <h4>No Data Found</h4>
                      </div>
                      : null
                    }
                </tbody>
                      </Table>
                      </Col>
                  </Row>
              </div>
              </Col>
              </Row>
          </TabPane>
          <TabPane tabId="exterior">
          <Row>
            <Col sm="12">
              <div className="mt-5">
                  <Row>
                      <Col sm="12" md="6" lg="6">
                      <h4>Exterior</h4>
                      </Col>
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
                    <th>S.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    readExterior.filter(data=>data.name.toLowerCase().includes(search.toLowerCase())).map((clients,index)=>(
                      <tr>
                        <td>{index + 1}</td>
                        <td className="text-capitalize">{clients.name} {clients.readingStatus=="unread" ? (<Badge color="primary">New</Badge>) : null} </td>
                        <td>{clients.phone}</td>
                        <td>
                          <i class="far fa-eye" style={{marginRight: "20px",cursor:"pointer"}} onClick={this.imageDetail}></i>
                          <i class="fas fa-trash-alt" style={{cursor:"pointer"}}></i>
                        </td>
                      </tr>
                    ))}
                    {
                      readInterior.length===0 ? 
                      <div>
                          <h4>No Data Found</h4>
                      </div>
                      : null
                    }
                </tbody>
                      </Table>
                      </Col>
                  </Row>
              </div>
              </Col>
              </Row>
          </TabPane>
          <TabPane tabId="consultant">
          <Row>
            <Col sm="12">
              <div className="mt-5">
                  <Row>
                      <Col sm="12" md="6" lg="6">
                      <h4>Consultant</h4>
                      </Col>
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
                    <th>S.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    readConsultant.filter(data=>data.name.toLowerCase().includes(search.toLowerCase())).map((clients,index)=>(
                      <tr>
                        <td>{index + 1}</td>
                        <td className="text-capitalize">{clients.name} {clients.readingStatus=="unread" ? (<Badge color="primary">New</Badge>) : null} </td>
                        <td>{clients.phone}</td>
                        <td>
                          <i class="far fa-eye" style={{marginRight: "20px",cursor:"pointer"}} onClick={this.imageDetail}></i>
                          <i class="fas fa-trash-alt" style={{cursor:"pointer"}}></i>
                        </td>
                      </tr>
                    ))}
                    {
                      readInterior.length===0 ? 
                      <div>
                          <h4>No Data Found</h4>
                      </div>
                      : null
                    }
                </tbody>
                      </Table>
                      </Col>
                  </Row>
              </div>
              </Col>
              </Row>
          </TabPane>
          <TabPane tabId="plans">
          <Row>
            <Col sm="12">
              <div className="mt-5">
                  <Row>
                      <Col sm="12" md="6" lg="6">
                      <h4>Plan</h4>
                      </Col>
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
                    <th>S.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    readPlan.filter(data=>data.name.toLowerCase().includes(search.toLowerCase())).map((clients,index)=>(
                      <tr>
                        <td>{index + 1}</td>
                        <td className="text-capitalize">{clients.name} {clients.readingStatus=="unread" ? (<Badge color="primary">New</Badge>) : null} </td>
                        <td>{clients.phone}</td>
                        <td>
                          <i class="far fa-eye" style={{marginRight: "20px",cursor:"pointer"}} onClick={this.imageDetail}></i>
                          <i class="fas fa-trash-alt" style={{cursor:"pointer"}}></i>
                        </td>
                      </tr>
                    ))}
                    {
                      readPlan.length===0 ? 
                      <div>
                          <h4>No Data Found</h4>
                      </div>
                      : null
                    }
                </tbody>
                      </Table>
                      </Col>
                  </Row>
              </div>
              </Col>
              </Row>
          </TabPane>
        </TabContent>
      </div>  
            </CardBody> 
            </Card>
            </div>
            </Row>
            </Container>
            
      </>
    )
}
}
export default Clients;