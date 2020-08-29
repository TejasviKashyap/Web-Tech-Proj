import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';


class Dishdetail extends Component{
    constructor(props){
        super(props);
    }

    renderComments(comments){
        
        
        const comm = comments.map((comm) => {
            return (
                <div >
                    
                    <ul key={comm.id} className="list-unstyled">
                    <li><p>{comm.comment}</p>
                        <p>-- {comm.author} , {comm.date}</p></li>
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
    renderDish(dish){
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
                    <div  className="col-12 col-md-5 m-1">
                        {this.renderComments(dish.comments)}
                        
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

    

    render(){        
        return (               
            <div>                
                {this.renderDish(this.props.selectedDish)}  
            </div>
        )
    }

}

export default Dishdetail;