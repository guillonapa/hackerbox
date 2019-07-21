/* eslint-disable react/jsx-boolean-value */
import { InputGroup, Button, Intent, Tooltip } from '@blueprintjs/core';

const React = require('react');

const LogIn = props => {
  const { showPassword, handleLockClick, handleLogInClick } = props;

  const lockButton = (
    <Tooltip content="Show/Hide Password">
      <Button
        icon={showPassword ? 'unlock' : 'lock'}
        minimal={true}
        intent={Intent.WARNING}
        onClick={handleLockClick}
      />
    </Tooltip>
  );

  return (
    <div>
      <InputGroup className="log-in" placeholder="Username" leftIcon="user" />
      <InputGroup
        className="log-in"
        leftIcon="key"
        placeholder="Password"
        rightElement={lockButton}
        type={showPassword ? 'text' : 'password'}
      />
      <div className="hb-log-in-button">
        <Button
          className="log-in"
          text="Log in"
          intent={Intent.SUCCESS}
          rightIcon="log-in"
          onClick={handleLogInClick}
        />
      </div>
    </div>
  );
};

export default LogIn;
