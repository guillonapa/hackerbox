/* eslint-disable react/jsx-boolean-value */
import { InputGroup, Button, Intent, Tooltip } from '@blueprintjs/core';

const React = require('react');

const Register = props => {
  const { showPassword, handleLockClick } = props;

  const lockButton = (
    <Tooltip content="Show/Hide Password">
      <Button
        icon={showPassword ? 'unlock' : 'lock'}
        minimal={true} // XXX check this (should be true)
        intent={Intent.WARNING}
        onClick={handleLockClick}
      />
    </Tooltip>
  );

  return (
    <div>
      <InputGroup
        className="log-margin"
        placeholder="Enter your email"
        leftIcon="user"
      />
      <InputGroup
        className="log-margin"
        leftIcon="key"
        placeholder="Enter a password"
        rightElement={lockButton}
        type={showPassword ? 'text' : 'password'}
      />
      <div className="hb-log-in-button">
        <Button
          className="log-margin"
          text="Create Account"
          intent={Intent.SUCCESS}
          rightIcon="new-person"
        />
      </div>
    </div>
  );
};

export default Register;
