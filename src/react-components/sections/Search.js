import { Label, MenuItem } from '@blueprintjs/core';
import { Suggest } from '@blueprintjs/select';

var React = require('react');

export class Search extends React.Component {
    render() {
        return (
            <div style={{display: "flex", alignItems: "center", padding: "10px"}}>
                <Label style={{marginRight: "20px", marginBottom: "0px"}}>Search for a source:</Label>
                <Suggest 
                popoverProps={{minimal: true}}
                items={["Associated Press", "CNN", "Daily Mail"]} 
                onItemSelect={console.log("hello")}
                itemRenderer={(items, meta) => {
                    console.log(items, meta);
                    return <MenuItem 
                    label={"USA"}
                    key={items[0]}
                    text={items}
                    onClick={console.log("click")}
                    />
                }}
                inputValueRenderer={item => item[1]}
                ></Suggest>
            </div>
        )
    }
}