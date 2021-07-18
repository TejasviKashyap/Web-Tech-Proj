import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, CardBlock,CardSubtitle, Breadcrumb, BreadcrumbItem, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Firebase from '../firebase/firebase';
import "firebase/firestore";

function addToCart(item) {
    console.log(item);
    let newDb = new Firebase();
    newDb.db.collection('users').doc(localStorage.getItem("uid")).get().then(data => {
        let tempCart = data.data().cart;
        let flag = 0;
        tempCart.map(
            (ele) => {
                if (ele.name == item.name) {
                    flag++;
                    ele.qty = item.qty;
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
    const [isLogged, setIsLogged] = useState(localStorage.getItem("isLoggedIn"));
    const [qty, setQty] = useState(0);
    useEffect(() => {
        setIsLogged(localStorage.getItem("isLoggedIn"));
    });

    return (
        <Card>
            <CardTitle >{dish.name}</CardTitle>
            <CardSubtitle>Price: Rs. {dish.price}/-</CardSubtitle>
            <Link to={`/menu/${dish.id}`} onClick={() => { localStorage.setItem("dishId", dish.id) }}>
                <CardImg top width="100%" src={dish.image} alt={dish.name} />
            </Link>
            {
                (isLogged == "true") &&
                (
                    <CardText>
                        <InputGroup>
                            <Input onChange={(event) => { setQty(event.target.value) }} className="dark-input" />
                            <InputGroupAddon addonType="append">
                                <Button color="light" onClick={() => { addToCart({ ...dish, qty: Number(qty) }) }}>Add to Cart</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </CardText>
                )
            }
        </Card>
    );
}

const Menu = (props) => {
    const [dishes, setDishes] = useState([]);
    useEffect(() => {
        let newDb = new Firebase();
        newDb.db.collection('dishes').get().then(data => {
            let docs = data.docs;
            let temp = []
            docs.forEach((doc) => temp.push({ id: doc.id, ...doc.data() }))
            setDishes(temp)
        });
    }, []);
    console.log(dishes);
    const menu = dishes.map((dish) => {
        return (
            <div key={dish.id} className="col-6 col-md-3 " >
                <RenderMenuItem dish={dish} />
            </div>

        );
    });
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                {menu}
            </div>
        </div>

    );

}

export default Menu;