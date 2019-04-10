import { Card, Elevation, Colors, Button } from '@blueprintjs/core';

var React = require('react');

export class Results extends React.Component {
    render() {
        const { skeleton, articles, includeImages } = this.props;
        return (
            <Card interactive={false} elevation={Elevation.TWO}>
                <h1>Results</h1>
                {
                    articles.map((article, i) => 
                        <Card style={{marginBottom: "15px"}} interactive={false} elevation={Elevation.TWO} key={i}>
                            <div className="card-body">
                                {/* add ".bp3-heading" to h3 */}
                                <div style={{marginRight: "10px"}} className={includeImages ? skeleton : "hide"}>
                                    <img className="card-image" alt="article title" src={article.urlToImage === null ? "gradient.png" : article.urlToImage}/>
                                </div>
                                <div style={{width: "100%"}}>
                                    <div className="card-header">
                                        <h3 className={skeleton}><a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a></h3>
                                        <Button className="bp3-minimal" icon="more" />
                                    </div>
                                    <p className={skeleton} style={{marginRight: "40px"}}>
                                        {article.description}
                                    </p>
                                    <p className={skeleton} style={{marginRight: "40px"}}>
                                        <i style={{color: Colors.GRAY3}}>Source: {article.source.name}</i>
                                    </p>

                                </div>
                            </div>
                        </Card>
                    )
                }
            </Card>
        );
    }
}