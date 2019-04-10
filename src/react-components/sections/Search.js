import { Label, MenuItem, Switch } from '@blueprintjs/core';
import { Suggest } from '@blueprintjs/select';

var React = require('react');

export class Search extends React.Component {
    render() {
        return (
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <div style={{display: "flex", alignItems: "center", padding: "10px"}}>
                    <Label style={{marginRight: "20px", marginBottom: "0px"}}>Search for a source:</Label>
                    <Suggest 
                        selectedItem={this.props.currentlySelectedItem}
                        resetOnClose={true}
                        noResults={<MenuItem disabled={true} text="No results." />}
                        popoverProps={{minimal: true, popoverClassName: "searchPopover"}}
                        items={this.props.listOfSources} 
                        itemPredicate={(query, item) => {
                            return item.name.toLowerCase().includes(query.toLowerCase());
                        }}
                        onItemSelect={item => {
                            this.props.makeNewsApiCall(item.id);
                            this.props.handleCurrentlySelectedItem(item);
                        }}
                        itemRenderer={(item, meta) => {
                            return <MenuItem 
                                label={item.country}
                                active={meta.modifiers.active}
                                disabled={meta.modifiers.disabled}
                                key={item.id}
                                text={item.name}
                                onClick={() => {
                                    this.props.makeNewsApiCall(item.id);
                                    this.props.handleCurrentlySelectedItem(item);
                                }}
                            />
                        }}
                        inputValueRenderer={
                            item => {
                                return item === null ? "" : item.name;
                            }
                        }
                    ></Suggest>
                </div>
                    <Switch style={{marginBottom: "0px"}}
                            checked={this.props.includeImages} 
                            label="Include images" 
                            onChange={(val) => this.props.handleIncludeImages()} />
            </div>
        )
    }
}