import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardFooter,CardHeader, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Col, Row, FormFeedback,
Modal, ModalHeader, ModalBody,Label, Badge} from 'reactstrap';
import {Link, useParams} from 'react-router-dom';
import { Control, LocalForm , Errors} from 'react-redux-form';
import { useEffect,useState } from 'react';
import Firebase from '../firebase/firebase';
import "firebase/firestore";
//import low from 'lowdb';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
//const low = require('lowdb');
//const FileSync = require('lowdb/adapters/FileSync');
//const adapter = new FileSync('comments.js');
//const db = low(adapter);
//db.defaults({ users: [] }).write();



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
        this.toggleModal();
        console.log("Current State is: "+ JSON.stringify(values));
        //const comment = {
         //   id: 20
       // };
       // db.get('COMMENTS').push(comment).write();
        //alert("Current State is: "+ JSON.stringify(values));
        let tempObj = Object.assign({}, values);
        let date = new Date(Date.now());
        tempObj.date = date.toDateString();
        let temp = this.props.comments;
        temp.push(tempObj);
        let newDb = new Firebase();
        newDb.db.collection('dishes').doc(localStorage.getItem("dishId")).update({"comments": temp})

    }

    render(){
        return(
            <div>
                <Button outline color="light" onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal className="font-black" isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
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
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text className="form-control" model=".author" id="author" name="author"
                                    placeholder="Your Name" validators = {{required, minLength: minLength(3), maxLength: maxLength(15)}} />
                                    <Errors className="text-danger" model="author" show="touched"
                                     messages = {{
                                         required: 'Required',
                                         minLength: 'Must be greater than 3 characters',
                                         maxLength: 'Must be 15 characters or less'
                                     }}
                                    />
                                </Col>
                            </Row>
                            
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Your Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6"
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
                    <CardTitle>
                        {dish.name}&nbsp; 
                        <Badge color="danger">
                            {dish.label}
                        </Badge>
                    </CardTitle>
                    <CardText>{dish.description}</CardText>
                    <CardText>Price: Rs. {dish.price}/-</CardText>                    
                </CardBody>
                <CardFooter>
                    <Badge color="light">
                       <h6>Category: {dish.category}</h6> 
                    </Badge>
                    
                </CardFooter>
            </Card>                    
        </div>                  
    );
}
   

function RenderComments(props){ 
    console.log(props);
    //let locs = useParams();
   // console.log(locs); 
   const [comments, setComments] = useState([]); 
   useEffect(() => {
    let newDb = new Firebase();
    newDb.db.collection('dishes').doc(localStorage.getItem("dishId")).onSnapshot(data => {
        
        /*let docs = data.docs;
        temp = []
        docs.forEach((doc) => temp.push({ id: doc.id, ...doc.data()}))
        setComments(temp)*/
        console.log(data);
        if(data.exists) {
            setComments(data.data().comments)
        }
    });
    }, []);    
    if (comments.length != 0)
        return (                
            <div className="col-12 col-md-5 m-1"> 
                <h4>Comments</h4>                                                 
                <ul className="list-unstyled">
                    {comments.map((comment,index) => {
                        return(
                            <li  key={index}><p>{comment.comment}</p>
                            <p>-- {comment.author} , { comment.date }</p></li>
                        );
                    })}
                </ul>
                <CommentForm comments = {comments} />                          
            </div>

        );
    else{
        return(
            <div>
                <CommentForm comments = {comments} />
            </div>
        );
    }
        
}

const Dishdetail = (props) => { 
    const [dish, setDish] = useState(null);
        useEffect(() => {
            let newDb = new Firebase();
            newDb.db.collection('dishes').doc(localStorage.getItem("dishId")).get().then(data => {
                
                setDish(data.data());
            });
        }, []);    
    if (dish != null)   
        return (               
            <div className="container">
                <div className="row">
                    <Breadcrumb>                        
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>
                </div>  
                <div className="row">
                    <RenderDish dish = {dish} /> 
                    <RenderComments comments={dish.comments} /> 
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