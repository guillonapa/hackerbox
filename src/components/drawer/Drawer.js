import { Button, Classes, Colors, Drawer, Intent, Tabs, Tab } from '@blueprintjs/core';
import LogIn from './Login';
import Register from './Register';
import preval from 'preval.macro';

const React = require('react');

const HackerBoxDrawer = props => {
    const {
        theme,
        isDrawerOpen,
        handleDrawerClose,
        selectedTabId,
        handleSelectedTab,
        showPassword,
        handleLockClick,
        handleLogInClick,
        handleLogOutClick,
        logInDiv,
        logOutDiv
    } = props;

    const logOutDivStyle = `hb-log-in-button ${logOutDiv}`;

    return (
        <Drawer className={theme} isOpen={isDrawerOpen} onClose={handleDrawerClose} icon="dashboard" title="Your Dashboard">
            <div className={Classes.DIALOG_BODY}>
                <div className={logOutDivStyle}>
                    <Button text="Log out" intent={Intent.DANGER} rightIcon="log-out" onClick={handleLogOutClick}/>
                </div>
                <div className={logInDiv}>
                    <Tabs id="auth-tabs" selectedTabId={selectedTabId} onChange={handleSelectedTab}>
                        <Tab id="log-in-tab" title="Log in" panel={
                            <LogIn showPassword={showPassword} handleLockClick={handleLockClick} handleLogInClick={handleLogInClick}/>
                        }/>
                        <Tab id="register-tab" title="Register" panel={<Register />}/>
                    </Tabs>
                </div>
            </div>
            <div className={Classes.DRAWER_FOOTER} style={{ color: Colors.GRAY3 }}>
                v1.0.0 ({preval`module.exports = new Date().toISOString();`})
            </div>
        </Drawer>
    );
};

export default HackerBoxDrawer;
