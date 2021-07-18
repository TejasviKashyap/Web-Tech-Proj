import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron
    , Button, Modal, ModalHeader, ModalBody, FormGroup, Form, Input, Label, ButtonGroup,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Firebase from '../firebase/firebase';
import "firebase/auth";
import firebase from 'firebase/app';
//import * as firebase from "firebase/app";


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isLoggedIn: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);


    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });

    }

    handleLogin(event) {
        event.preventDefault();
        this.toggleModal()

        var auth = new Firebase();
        auth.signInWithEmailAndPassword(this.username.value, this.pwd.value).then((data) => {
            localStorage.setItem("isLoggedIn", true);
            this.setState({
                isLoggedIn: !this.state.isLoggedIn
            })
            console.log(data);
            var user = firebase.auth().currentUser;
            console.log(user.email);
            localStorage.setItem("user", user.email);
            this.setState({
                isLoggedIn: !this.state.isLoggedIn
            })

        });
        this.render();
        //alert("Username: "+ this.username.value + "Password: " + this.pwd.value
        //+ "Remember: "+ this.remember.checked);
    }

    handleLogout(event) {
        //event.preventDefault();
        var auth = new Firebase();
        auth.signOut().then((data) => {
            console.log(data);
            if (localStorage.getItem("user")) {
                localStorage.removeItem("user");
            }

            this.setState({
                isLoggedIn: !this.state.isLoggedIn
            })
            localStorage.setItem("isLoggedIn", false);

        }
        );
        this.render();

    }

    handleSignUp(event) {
        //event.preventDefault();
        this.toggleModal()
        console.log(this.suusername.value);
        var auth = new Firebase();
        var self = this;
        auth.createUserWithEmailAndPassword(this.suusername.value, this.supwd.value).then((data) => {
            this.setState({
                isLoggedIn: !this.state.isLoggedIn
            })
            console.log(data);
            var user = firebase.auth().currentUser;
            console.log(user.email);
            localStorage.setItem("user", user.email);
            localStorage.setItem("uid", user.uid);
            this.setState({
                isLoggedIn: !this.state.isLoggedIn
            })
            auth.db.collection('users').doc(data.user.uid).set(
                {
                    "email": user.email,
                    "cart": []
                }
            )
            localStorage.setItem("isLoggedIn", true);

        });
        this.render();
        //alert("Username: "+ this.username.value + "Password: " + this.pwd.value
        //+ "Remember: "+ this.remember.checked);
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="assets/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar variant="pills">
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        <span className="fa fa-info fa-lg"></span> About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/menu">
                                        <span className="fa fa-list fa-lg"></span> Menu
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <span className="fa fa-address-card fa-lg"></span> Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar variant="pills">
                                <NavItem>
                                    {
                                        (!localStorage.getItem("user")) ?
                                            <NavLink className="nav-link" to="/">
                                                <Button color="light" onClick={this.toggleModal}>
                                                    <span className="fa fa-sign-in fa-lg"></span> Login
                                                </Button>
                                            </NavLink> :
                                            <ButtonGroup>
                                                <NavLink className="nav-link" to="/cart">
                                                    <Button color="light">
                                                        <span className="fa fa-shopping-cart fa-lg"></span> Your Cart
                                                    </Button>
                                                </NavLink>
                                                <NavLink className="nav-link" to="/">
                                                    <Button color="light" onClick={this.handleLogout}>
                                                        <span className="fa fa-sign-in fa-lg"></span> Sign Out
                                                    </Button>
                                                </NavLink>
                                            </ButtonGroup>
                                    }

                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-jumbotron col-6 col-sm-6">
                                <h1>Charcuterié</h1>
                                <p><strong>A fine wine and artisan cheese shop, wine bar and cafe located in historic downtown Whitefield, featuring artisanal cheese and charcuterie, smaller production wines, gourmet cafe menu and wine tastings available to order anytime!</strong></p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal className="font-black" isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody>
                        {<Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="pwd">Password</Label>
                                <Input type="password" id="pwd" name="pwd"
                                    innerRef={(input) => this.pwd = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                        innerRef={(input) => this.remember = input} />Remember Me?
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>}
                    </ModalBody>
                    <ModalHeader>Sign Up</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label htmlFor="suusername">Username</Label>
                                <Input type="text" id="suusername" name="suusername"
                                    innerRef={(input) => this.suusername = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="supwd">Password</Label>
                                <Input type="password" id="supwd" name="supwd"
                                    innerRef={(input) => this.supwd = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                        innerRef={(input) => this.remember = input} />Remember Me?
                                </Label>
                            </FormGroup>
                            <Button onClick={this.handleSignUp} value="submit" color="primary">Sign Up</Button>
                        </Form>
                    </ModalBody>

                </Modal>
            </React.Fragment>

        );
    }
}

export default Header;