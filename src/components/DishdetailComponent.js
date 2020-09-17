import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Col, Row, FormFeedback,
Modal, ModalHeader, ModalBody,Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm , Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);




class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });

    }

    handleSubmit(values){
        console.log("Current State is: "+ JSON.stringify(values));
        alert("Current State is: "+ JSON.stringify(values));

    }

    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select className="form-control" model=".rating" id = "rating" name="rating" >
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                     
                                    </ Control.select>
                                   
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text className="form-control" model=".yourname" id="yourname" name="yourname"
                                    placeholder="Your Name" validators = {{required, minLength: minLength(3), maxLength: maxLength(15)}} />
                                    <Errors className="text-danger" model=".yourname" show="touched"
                                     messages = {{
                                         required: 'Required',
                                         minLength: 'Must be greater than 3 characters',
                                         maxLength: 'Must be 15 characters or less'
                                     }}
                                    />
                                </Col>
                            </Row>
                            
                            <Row className="form-group">
                                <Label htmlFor="message" md={12}>Your Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".message" id="message" name="message" rows="6"
                                    className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                        Send Comment
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>

                    </ModalBody>
                </Modal>
            </div>
        );
    }

}


function RenderDish({dish}){
                
    return (                
        <div className="col-12 col-md-5 m-1">                
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    
                </CardBody>
            </Card>                    
        </div>                  
    );
}
   

function RenderComments({comments}){       
    if (comments!= null)
        return (                
            <div className="col-12 col-md-5 m-1"> 
                <h4>Comments</h4>                                                 
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return(
                            <li  key={comment.id}><p>{comment.comment}</p>
                            <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p></li>
                        );
                    })}
                </ul>
                <CommentForm />                          
            </div>

        );
    else{
        return(
            <div></div>
        );
    }
        
}





const Dishdetail = (props) => {     
    if (props.dish != null)   
        return (               
            <div className="container">
                <div className="row">
                    <Breadcrumb>                        
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>  
                <div className="row">
                    <RenderDish dish = {props.dish} /> 
                    <RenderComments comments={props.comments} /> 
                </div>  
            </div>
        );
    else{
        return (
            <div></div>
        );
    }
}



export default Dishdetail;