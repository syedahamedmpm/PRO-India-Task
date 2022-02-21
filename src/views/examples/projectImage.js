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
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import * as http from '../../api/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classnames from 'classnames';
import { Component } from "react";

class projectImage extends Component{
    constructor(){
        super()
        this.state = {
          activeTab: '1',
          allSearch:'',
          projectList:[],
          interiorProjectList:[],
          exteriorProjectList:[],
          consultantProjectList:[],
          planProjectList:[],
          imgModal:false,
          catagory:'',
          imgName:'',
          uploadedImg:'',
          selectedImg:'',
          isLoading:false
        };
       
    }
    componentDidMount(){
      this.getAllProjects()
      this.getInteriorProjects()
      this.getExteriorProjects()
      this.getConsultantProjects()
      this.getPlanProjects()
    }
    getAllProjects = ()=>{
      
    }
    getInteriorProjects = ()=>{
      
    }
    getExteriorProjects = ()=>{
      
    }
    getConsultantProjects = ()=>{
      
    }
    getPlanProjects = ()=>{
      
    }
    toggle = (tab)=> {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }
    searchChange = (event) =>{
      const target = event.target
      const name = target.name
      const value = target.value
      this.setState({
        [name]:value
      })
    }
    imgOpen = ()=>{
      this.setState({
        imgModal:!this.state.imgModal
      })
    }
    handleChange = (e)=>{
      const target = e.target
      const name = target.name
      const value = target.value
      this.setState({
        [name]:value
      })
    }
    imageChange = (e) =>{
      console.log(e.target.files[0])
      this.setState({
        uploadedImg:e.target.files[0]
      })
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) =>{
        var url = e.target.result;
        this.setState({
          selectedImg:url
        })
        console.log(this.state.selectedImg)
      }
    }
    submitProject = () =>{
      console.log(this.state.uploadedImg)
      this.setState({
        isLoading:true
      })
      var formData = new FormData()
      formData.append("galaryImages",this.state.uploadedImg)
      formData.append("name",this.state.imgName)
      formData.append("catagory",this.state.catagory)
      if(this.state.imgName ==""){
        toast.error("Enter the project name")
      }else if(this.state.catagory == ""){
        toast.error("Select the Catagory")
      }else if(this.state.selectedImg == ""){
        toast.error("Select image")
    }
    else{
      http
      .postFormData("galaryImg",formData)
      .then((resp)=>resp.json())
      .then(data =>{
        console.log(data)
        if(data.success){
          toast.success(data.message)
          this.setState({
            isLoading:false,
            imgModal:false,
            imgName:'',
            catagory:'',
            uploadedImg:'',
            selectedImg:''

          })
        }
        else{
          toast.error(data.message)
        }
      })
    }
  }
    render(){
      const {projectList,allSearch,interiorProjectList,exteriorProjectList,consultantProjectList,planProjectList,selectedImg,isLoading,uploadedImg}=this.state
      const baseUrl = http.url()
        return(
            <>
            <Header />
            <Container className="mt--7" fluid>
            <ToastContainer />
            <div class="mt-5"></div>
            <Row>
            <div className="col">
            <Card className="shadow container bg-secondary"> 
              <CardHeader className="border-0">
              <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Project Images</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      size="sm"
                      onClick={this.imgOpen}
                    >
                      Add Image
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              All
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Interior
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Exterior
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Consultant
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '5' })}
              onClick={() => { this.toggle('5'); }}
            >
              Plans
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
              <div className="mt-5"></div>
                <Row>
                  <Col md='6'>
                  <h4>All Project</h4>
                  </Col>
                  <Col md='6'>
                  <input className="form-control-alternative form-control" 
                  type="text" onChange={this.searchChange} 
                  placeholder="Search"
                  value={this.state.allSearch}
                  name="allSearch"
                   />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              {projectList.filter(data=>data.name.toLowerCase().includes(allSearch.toLowerCase())).map(projects =>{
                console.log(projects.id)
                return(
                  <Col sm="12" md="4" lg="3" className="mt-3" key={projects.id}>
                                    <Card>
                                        <CardBody>
                                            <img alt={projects.name} src={baseUrl+projects.image} height="185" width="185" />
                                        </CardBody>
                                        <CardFooter>
                                            {projects.name}
                                        </CardFooter>
                                    </Card>
                                </Col>
              )})}
              <Col md="6">
              {
                
                interiorProjectList.length==0?
                <div>
                  <h4>No Data Found</h4>
                </div>
                :null
              }
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
          <Row>
              <Col sm="12">
              <div className="mt-5"></div>
                <Row>
                  <Col md='6'>
                  <h4>Interior</h4>
                  </Col>
                  <Col md='6'>
                  <input className="form-control-alternative form-control" 
                  type="text" onChange={this.searchChange} 
                  placeholder="Search"
                  value={this.state.allSearch}
                  name="allSearch"
                   />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              {interiorProjectList.filter(data=>data.name.toLowerCase().includes(allSearch.toLowerCase())).map(projects =>{
                console.log(projects.id)
                return(
                  <Col sm="12" md="4" lg="3" className="mt-3" key={projects.id}>
                                    <Card>
                                        <CardBody>
                                            <img alt={projects.name} src={baseUrl+projects.image} height="185" width="185" />
                                        </CardBody>
                                        <CardFooter>
                                            {projects.name}
                                        </CardFooter>
                                    </Card>
                                </Col>
              )})}
              <Col md="6">
              {
                
                projectList.length==0?
                <div>
                  <h4>No Data Found</h4>
                </div>
                :null
              }
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
          <Row>
              <Col sm="12">
              <div className="mt-5"></div>
                <Row>
                  <Col md='6'>
                  <h4>Exterior</h4>
                  </Col>
                  <Col md='6'>
                  <input className="form-control-alternative form-control" 
                  type="text" onChange={this.searchChange} 
                  placeholder="Search"
                  value={this.state.allSearch}
                  name="allSearch"
                   />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              {exteriorProjectList.filter(data=>data.name.toLowerCase().includes(allSearch.toLowerCase())).map(projects =>{
                console.log(projects.id)
                return(
                  <Col sm="12" md="4" lg="3" className="mt-3" key={projects.id}>
                                    <Card>
                                        <CardBody>
                                            <img alt={projects.name} src={baseUrl+projects.image} height="185" width="185" />
                                        </CardBody>
                                        <CardFooter>
                                            {projects.name}
                                        </CardFooter>
                                    </Card>
                                </Col>
              )})}
              <Col md="6">
              {
                
                exteriorProjectList.length==0?
                <div>
                  <h4>No Data Found</h4>
                </div>
                :null
              }
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="4">
          <Row>
              <Col sm="12">
              <div className="mt-5"></div>
                <Row>
                  <Col md='6'>
                  <h4>Consultant</h4>
                  </Col>
                  <Col md='6'>
                  <input className="form-control-alternative form-control" 
                  type="text" onChange={this.searchChange} 
                  placeholder="Search"
                  value={this.state.allSearch}
                  name="allSearch"
                   />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              {consultantProjectList.filter(data=>data.name.toLowerCase().includes(allSearch.toLowerCase())).map(projects =>{
                console.log(projects.id)
                return(
                  <Col sm="12" md="4" lg="3" className="mt-3" key={projects.id}>
                                    <Card>
                                        <CardBody>
                                            <img alt={projects.name} src={baseUrl+projects.image} height="185" width="185" />
                                        </CardBody>
                                        <CardFooter>
                                            {projects.name}
                                        </CardFooter>
                                    </Card>
                                </Col>
              )})}
              <Col md="6">
              {
                
                consultantProjectList.length==0?
                <div>
                  <h4>No Data Found</h4>
                </div>
                :null
              }
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="5">
          <Row>
              <Col sm="12">
              <div className="mt-5"></div>
                <Row>
                  <Col md='6'>
                  <h4>Plan</h4>
                  </Col>
                  <Col md='6'>
                  <input className="form-control-alternative form-control" 
                  type="text" onChange={this.searchChange} 
                  placeholder="Search"
                  value={this.state.allSearch}
                  name="allSearch"
                   />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              {planProjectList.filter(data=>data.name.toLowerCase().includes(allSearch.toLowerCase())).map(projects =>{
                console.log(projects.id)
                return(
                  <Col sm="12" md="4" lg="3" className="mt-3" key={projects.id}>
                                    <Card>
                                        <CardBody>
                                            <img alt={projects.name} src={baseUrl+projects.image} height="185" width="185" />
                                        </CardBody>
                                        <CardFooter>
                                            {projects.name}
                                        </CardFooter>
                                    </Card>
                                </Col>
              )})}
              
              <Col md="6">
              {
                
                
                planProjectList.length==0?
                <div>
                  <h4>No Data Found</h4>
                </div>
                :null
              }
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
            <Modal isOpen={this.state.imgModal} toggle={this.imgOpen} className={this.className}>
            <ModalHeader toggle={this.imgOpen}>Add Image</ModalHeader>
            <ModalBody className="bg-secondary shadow">
              <Row>
              <Col sm="12" md="6" lg="6">
              <FormGroup>
                            <Label for="exampleSelect">Select Catagory</Label>
                            <Input type="select" name="catagory" value={this.state.catagory} onChange={this.handleChange}>
                            <option selected> --Select Catagory--</option>    
                            <option value="plan" >Plan</option>
                            <option value="interior" >Interior</option>
                            <option value="exterior" >Exterior</option>
                            <option value="consultant" >Consultant</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Image Name</Label>
                            <Input type="text" name="imgName" value={this.state.imgName} onChange={this.handleChange} placeholder="Enter Name of Image" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Upload Image</Label>
                            <input id="fileUpload" type="file" name="uploadedImg" onChange={this.imageChange} accept="image/*" />
                            
                        </FormGroup>
              </Col>
              <Col  sm="12" md="6" lg="6">
              <img src={
                       selectedImg == ""
                       ? require("assets/img/JBA/paste.png").default                         
                       : selectedImg
                     
                    } width="100%" />
              </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
          <Button color="primary" onClick={this.submitProject} disabled={isLoading}> {isLoading ? (<Spinner size="sm" color="dark" />) : null }Add Image</Button>{' '}
          <Button color="secondary" onClick={this.imgOpen}>Cancel</Button>
        </ModalFooter>
            </Modal>
        </>
        )
    }
}
export default projectImage;