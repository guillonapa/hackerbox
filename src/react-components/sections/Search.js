import { Label, MenuItem } from '@blueprintjs/core';
import { Suggest } from '@blueprintjs/select';

var React = require('react');

export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentlySelectedItem: null
        }
    }
    render() {
        return (
            <div style={{display: "flex", alignItems: "center", padding: "10px"}}>
                <Label style={{marginRight: "20px", marginBottom: "0px"}}>Search for a source:</Label>
                <Suggest 
                    selectedItem={this.state.currentlySelectedItem}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    popoverProps={{minimal: true, popoverClassName: "searchPopover"}}
                    items={this.props.listOfSources} 
                    itemPredicate={(query, item) => {
                        return item.name.toLowerCase().includes(query.toLowerCase());
                    }}
                    onItemSelect={item => {
                        this.props.makeNewsApiCall(item.id);
                        this.setState({currentlySelectedItem: item});
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
                                this.setState({currentlySelectedItem: item});
                            }}
                        />
                    }}
                    inputValueRenderer={
                        item => {
                            return item.name;
                        }
                    }
                ></Suggest>
            </div>
        )
    }
}