import { Navbar, Alignment, Button } from '@blueprintjs/core';

const React = require('react');

const HackerBoxNavbar = props => {
  const {
    makeNewsApiCall,
    handleCurrentlySelectedItem,
    handleOpen,
    handleDrawerOpen,
    handleOpenSavedStories
  } = props;

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
            makeNewsApiCall(null);
            handleCurrentlySelectedItem(null);
          }}
        />
        <Button
          className="bp3-minimal"
          icon="bookmark"
          text="Saved Stories"
          onClick={() => {
            handleOpenSavedStories();
          }}
        />
        <Button
          className="bp3-minimal"
          icon="help"
          text="Help"
          onClick={() => {
            handleOpen();
          }}
        />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button
          className="bp3-minimal"
          icon="menu"
          onClick={() => handleDrawerOpen()}
        />
      </Navbar.Group>
    </Navbar>
  );
};

export default HackerBoxNavbar;
