import { Card, Elevation, Colors } from '@blueprintjs/core';

var React = require('react');

export class Results extends React.Component {
    render() {
        const { skeleton, articles } = this.props;
        return (
            <Card interactive={false} elevation={Elevation.TWO}>
                <h1>Results</h1>
                {
                    articles.map(article => 
                        <Card style={{marginBottom: "15px"}} interactive={false} elevation={Elevation.TWO}>
                        {/* add ".bp3-heading" to h3 */}
                        <h3 className={skeleton}><a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a></h3>
                        <p className={skeleton}>
                            {article.description}
                        </p>
                        <p className={skeleton}>
                            <i style={{color: Colors.GRAY3}}>Source: {article.source.name}</i>
                        </p>
                        </Card>
                    )
                }
            </Card>
        );
    }
}