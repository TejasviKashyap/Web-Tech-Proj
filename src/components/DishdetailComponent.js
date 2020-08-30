import React from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';



    
   

    function RenderComments({comments}){
        
        
        const comm = comments.map((comm) => {
            return (
                <div key={comm.id}> 
                                                 
                    <ul className="list-unstyled">
                    <li ><p>{comm.comment}</p>
                        <p>-- {comm.author} , {new Intl.DateTimeFormat('en-US', { year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comm.date)))}</p></li>
                    </ul>    
                                   
                </div>

            )
            
        });
        return(
            <div>
                <h4>Comments</h4>
                {comm}
            </div>
        )
    }
    function RenderDish({dish}){
        if (dish != null){
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">                
                        <Card>
                            <CardImg width="100%" src={dish.image} alt={dish.name}/>
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                                
                            </CardBody>
                        </Card>                    
                    </div>         
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={dish.comments} />                        
                    </div>
                </div>
                 
            );
        }
        else{
            return (
                <div></div>
            )
        }


    }

    

    const Dishdetail = (props) => {        
        return (               
            <div className="container">  
                            
                <RenderDish dish = {props.dish} />  
            </div>
        )
    }



export default Dishdetail;