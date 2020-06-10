import React from 'react';
import './App.css';
import { Container, Button, Divider, Link, Typography, CircularProgress } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textVisible: false,
            loading: false,
            success: false,
            catFact: ""
        };
    }

    show = () => {
        this.setState({
            textVisible: true
        });
    };

    getCatFact = () => {
        this.setState({
            loading: true
        });
        fetch('https://cat-fact.herokuapp.com/facts/random')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    catFact: result.text,
                    loading: false,
                    success: true
                });
            });
    };

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/someotherurl">
                            <Container>
                                <Typography variant="h4" align="center">Hello there! I am just a subpage.</Typography>
                            </Container>
                        </Route>
                        <Route path="/">
                            <div className="App">
                                <Container>
                                    <Typography variant="h4" align="left">Simplest test</Typography>
                                    <Button id="button1" className="button1" variant="contained" color="primary" onClick={this.show}>Click Me!</Button>
                                    <Typography id="text1" variant="body2" className={this.state.textVisible && 'visible'}>I am here!</Typography>
                                </Container>
                                <Divider variant="middle"/>
                                <Container>
                                    <Typography variant="h4" align="left">Navigation</Typography>
                                    <Link id="link1" href="/someotherurl">
                                        Click Me!
                                    </Link>
                                    <Typography variant="body2">I am here!</Typography>
                                </Container>
                                <Divider variant="middle"/>
                                <Container className="hidden-element-container">
                                    <Typography variant="h4" align="left">Hidden element</Typography>
                                    <Button id="button2" className="button1" variant="contained" color="primary">Click me!</Button>
                                    <div className="nasty-div">Screw you!</div>
                                </Container>
                                <Divider variant="middle"/>
                                <Container className="hidden-element-container">
                                    <Typography variant="h4" align="left">Network Request</Typography>
                                    <Button id="button4" className="button1" variant="contained" color="primary" onClick={this.getCatFact}>Give me a Cat fact!</Button>
                                    <CircularProgress className={this.state.loading && 'visible-loading'}/>
                                    <Typography id="text4" variant="body2" className={this.state.success && 'success'}>{this.state.catFact}</Typography>
                                </Container>
                                <Divider variant="middle"/>
                            </div>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }

}

export default App;
