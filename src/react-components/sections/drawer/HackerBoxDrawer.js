import { Drawer, Classes, Tabs, Tab } from '@blueprintjs/core';
import { LogIn } from './LogIn';
import { Register } from './Register';

var React = require("react");

export class HackerBoxDrawer extends React.Component {
    render() {
        return (
            <Drawer 
                className={this.props.theme} 
                isOpen={this.props.isDrawerOpen}
                onClose={this.props.handleDrawerClose} 
                icon="dashboard"
                title="Your Dashboard">
                <div className={Classes.DIALOG_BODY}>
                    <Tabs id="auth-tabs" selectedTabId={this.props.selectedTabId} onChange={this.props.handleSelectedTab}>
                        <Tab id="log-in-tab" title="Log in" panel={<LogIn showPassword={this.props.showPassword} handleLockClick={this.props.handleLockClick} />} />
                        <Tab id="register-tab" title="Register" panel={<Register />} />
                    </Tabs>
                </div>
                <div className={Classes.DRAWER_FOOTER}>&copy; Guillermo Narvaez (2019)</div>
            </Drawer>
        );
    }
}