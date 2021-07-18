import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Input, InputGroup, InputGroupAddon, Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Firebase from '../firebase/firebase';
import "firebase/firestore";

function LoadCart(item) {
    console.log(item);
    let newDb = new Firebase();
    newDb.db.collection('users').doc(localStorage.getItem("uid")).get().then(data => {
        let tempCart = data.data().cart;
        let flag = 0;
        tempCart.map(
            (ele) => {
                if (ele.name == item.name) {
                    flag++;
                    ele.qty += item.qty;
                }

            }
        )
        if (flag == 0) {
            tempCart.push(item);
        }
        newDb.db.collection('users').doc(localStorage.getItem("uid")).update({ "cart": tempCart }).then(() => {
            alert("Items added to cart!");
        }
        );

    });
}

function RenderMenuItem({ dish, onClick }) {
    return (
        <Card>
            <CardTitle >{dish.name}</CardTitle>
            <Link to={`/menu/${dish.id}`} onClick={() => { localStorage.setItem("dishId", dish.id) }}>
                <CardImg top width="100%" src={dish.image} alt={dish.name} />
            </Link>
            <CardText>
                Quantity = {dish.qty}
            </CardText>
            <ButtonGroup>
                <Link to="/menu">
                    <Button color="primary">
                        Change Qty.
                    </Button>
                </Link>
                <Button color="danger" onClick={onClick}>
                    Remove Item
                </Button>
            </ButtonGroup>
        </Card>
    );
}

const Cart = () => {
    const [dishes, setDishes] = useState([]);
    const [amount, setAmount] = useState(0);
    const [showAmt, setShowAmt] = useState(false);
    useEffect(() => {
        let newDb = new Firebase();
        newDb.db.collection('users').doc(localStorage.getItem("uid")).onSnapshot(data => {
            let temp = data.data().cart;
            let tempAmt = 0;
            setDishes(temp);
            temp.map((ele) => tempAmt += (ele.price*ele.qty))
            setAmount(tempAmt);
        });
    }, []);
    console.log(dishes);
    const menu = dishes.map((dish, index) => {
        return (
            <div key={dish.id} className="col-6 col-md-3 " >
                <RenderMenuItem dish={dish} onClick={() => handleRemove(index)} />
            </div>

        );

    });
    const handleRemove = (index) => {
        console.log(index);
        setDishes(dishes.splice(index, 1));
        let newDb = new Firebase();
        newDb.db.collection('users').doc(localStorage.getItem("uid")).update({ "cart": dishes }).then(
            () => {
                setDishes(dishes);
            }
        );

    }
    const handleClear = () => {
        let newDb = new Firebase();
        newDb.db.collection('users').doc(localStorage.getItem("uid")).update({ "cart": [] }).then(
            () => {
                setDishes([]);
                alert("Order Placed Succesfully!")
            }
        );


    }
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Cart</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Your Cart</h3>
                    <hr />
                </div>
            </div>
            {
                dishes.length != 0 ?
                    <div className="ml-auto">

                        <div className="row">
                            {menu}
                        </div>
                        <div className="row align-self-center">
                            <div className="col-12 d-flex flex-column align-self-center justify-content-center">
                                <Button color="success" onClick={() => { setShowAmt(true) }}>
                                    Generate Bill
                                </Button>
                                {
                                    (showAmt) &&
                                    (
                                        <div>
                                            <div className=" text-center w-100">Total Amount = Rs. {amount}/-</div>
                                            <div className="d-flex flex-col align-self-center justify-content-center">
                                                <Button color="light" onClick={handleClear}>
                                                    Place Order!
                                                </Button>
                                            </div>
                                        </div>
                                    )

                                }
                            </div>
                        </div>
                    </div> :
                    <div className="row">
                        No items added!
                    </div>
            }
        </div>

    );

}

export default Cart;