import { Navbar, Alignment, Button } from "@blueprintjs/core";
var React = require('react');
export class HackerBoxNavbar extends React.Component {
    render() {
        return (
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>HackerBox</Navbar.Heading>
                    <Navbar.Divider />
                    <Button 
                        className="bp3-minimal" 
                        icon="home" 
                        text="Home" 
                        onClick={() => {
                            
                        }} />
                    <Button className="bp3-minimal" icon="help" text="Help" />
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <Button className="bp3-minimal" icon="menu" />
                </Navbar.Group>
            </Navbar>
        );
    }
}
