import { Drawer, Classes, Tabs, Tab } from '@blueprintjs/core';
import LogIn from './Login';
import Register from './Register';

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
    handleLogInClick
  } = props;

  return (
    <Drawer
      className={theme}
      isOpen={isDrawerOpen}
      onClose={handleDrawerClose}
      icon="dashboard"
      title="Your Dashboard"
    >
      <div className={Classes.DIALOG_BODY}>
        <Tabs
          id="auth-tabs"
          selectedTabId={selectedTabId}
          onChange={handleSelectedTab}
        >
          <Tab
            id="log-in-tab"
            title="Log in"
            panel={
              <LogIn
                showPassword={showPassword}
                handleLockClick={handleLockClick}
                handleLogInClick={handleLogInClick}
              />
            }
          />
          <Tab id="register-tab" title="Register" panel={<Register />} />
        </Tabs>
      </div>
      <div className={Classes.DRAWER_FOOTER}>
        &copy; Guillermo Narvaez (2019)
      </div>
    </Drawer>
  );
};

export default HackerBoxDrawer;
