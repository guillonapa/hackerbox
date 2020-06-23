/* eslint-disable react/jsx-boolean-value */
import { Label, MenuItem, Switch } from '@blueprintjs/core';
import { Suggest } from '@blueprintjs/select';

const React = require('react');

const Search = props => {
    const {
        currentlySelectedItem,
        listOfSources,
        makeNewsApiCall,
        handleCurrentlySelectedItem,
        includeImages,
        handleIncludeImages
    } = props;

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                <Label style={{ marginRight: '20px', marginBottom: '0px' }}>
                    Search for a source:
                </Label>
                <Suggest
                    selectedItem={currentlySelectedItem}
                    resetOnClose={true} // XXX should be true
                    noResults={<MenuItem disabled={true} text="No results." />} // XXX disabled={true}
                    popoverProps={{ minimal: true, popoverClassName: 'searchPopover' }}
                    items={listOfSources}
                    itemPredicate={(query, item) => {
                        return item.name.toLowerCase().includes(query.toLowerCase());
                    }}
                    onItemSelect={item => {
                        makeNewsApiCall(item.id);
                        handleCurrentlySelectedItem(item);
                    }}
                    itemRenderer={(item, meta) => {
                        return (
                            <MenuItem
                                label={item.country}
                                active={meta.modifiers.active}
                                disabled={meta.modifiers.disabled}
                                key={item.id}
                                text={item.name}
                                onClick={() => {
                                    makeNewsApiCall(item.id);
                                    handleCurrentlySelectedItem(item);
                                }}
                            />
                        );
                    }}
                    inputValueRenderer={item => {
                        return item === null ? '' : item.name;
                    }}
                />
            </div>
            <Switch style={{ marginBottom: '0px' }} checked={includeImages} label="Include images" onChange={() => handleIncludeImages()}/>
        </div>
    );
};

export default Search;
