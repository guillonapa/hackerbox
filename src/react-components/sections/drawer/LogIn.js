import { InputGroup, Button, Intent, Tooltip } from "@blueprintjs/core";

var React = require("react");

export class LogIn extends React.Component {
    render() {
        const lockButton = (
            <Tooltip content="Show/Hide Password">
              <Button 
                  icon={this.props.showPassword ? "unlock" : "lock"}
                  minimal={true}
                  intent={Intent.WARNING}
                  onClick={this.props.handleLockClick}
                  />
            </Tooltip>
        );

        return (
            <div>
                <InputGroup 
                        className={"log-in"}
                        placeholder="Username"
                        leftIcon="user" />
                    <InputGroup 
                        className={"log-in"}
                        leftIcon="key"
                        placeholder="Password"
                        rightElement={lockButton}
                        type={this.props.showPassword ? "text" : "password"} />
                    <div className={"hb-log-in-button"}>
                        <Button 
                            className={"log-in"}
                            text="Log in"
                            intent={Intent.SUCCESS}
                            rightIcon="log-in" />
                    </div>
            </div>
        );
    }
}