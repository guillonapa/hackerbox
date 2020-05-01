import Emoji from 'a11y-react-emoji';
import axios from 'axios';

const React = require('react');

const pageSize = 30;
// const newsapi = new NewsAPI(newsapikey);
const SERVER_URL = 'http://localhost:3001';

export async function componentDidMount() {
    // const { source } = this.state;
    // this.makeNewsApiCall(source);
    try {
        const response = await axios.get(`${SERVER_URL}/sources`);
        if (response.data.success) {
            return {
                listOfSources: response.data.sources
            };
        }
    } catch (err) {
        console.log(err);
    }
    return {};
    // newsapi.v2.sources({ language: "en" }).then(response => { this.setState({ listOfSources: response.sources }) });
}

export async function makeNewsApiCall(source, country) {
    try {
        const response = await axios.get(`${SERVER_URL}/stories`, {
                params: {
                    source,
                    country,
                    pageSize
                }
            });
        if (response.data.success) {
            return {
                source,
                articles: response.data.stories,
                skeleton: '',
                showSavedStories: false
            };
        }
    } catch (err) {
        console.log(err);
    }
    return {};

    // let options;
    // // call the API and get stories for default
    // if (source === null || source === "") {
    //   options = { country, pageSize };
    // } else {
    //   options = { sources: [source], pageSize }
    // }
    // newsapi.v2.topHeadlines(options).then(response => {
    //   // for dramatic effect
    //   setTimeout(() => { this.setState({ source, articles: response.articles, skeleton: "" }); }, 1000); 
    // });
}

export async function handleOpenSavedStories() {
    try {
        const response = await axios.get(`${SERVER_URL}/saved-stories`, { params: { user: 'guillonapa' } });
        if (response.data.success) {
            return { savedStories: response.data.data, skeleton: '' };
        }
    } catch (err) {
        console.log(err);
    }
    return {};
};

export function handleSaveArticle(title, description, url, imageUrl, source) {
    return () => {
        axios.post(`${SERVER_URL}/save`, {
            user: 'guillonapa',
            title,
            description,
            url,
            imageUrl,
            source
        });
    };
};

export function handleOpenArticle(link) {
    return () => {
        window.open(link, '_blank');
    };
}

export function helpMessage() {
    return (
        <div>
            <p>
                Hacker Box is a platform where all your hacker reading comes to a
                place. There&apos;s a ton of amazing blogs and sites, but
                it&apos;s hard to keep up with all the cool content. Hacker Box is
                a place where you can find and read awesome material, or save it
                for later reads!
            </p>
            <p>
                We recommend checking out Hacker Box with your first cup of coffee in the morning. Cheers! <Emoji symbol="☕" />
            </p>
        </div>
    );
}

export function initialState() {
    return {
        skeleton: 'bp3-skeleton',
        articles: Array(10).fill({
            author: '___',
            title: '___',
            description: '___',
            url: '___',
            urlToImage: 'assets/images/gradient.png',
            source: {
                id: '___',
                name: '___'
            }
        }),
        source: '',
        country: 'us',
        // pageSize: 30,
        theme: 'bp3-dark',
        listOfSources: [],
        isDialogOpen: false,
        isDrawerOpen: false,
        includeImages: true,
        currentlySelectedItem: null,
        showPassword: false,
        selectedTab: 'log-in-tab',
        showSavedStories: false,
        savedStories: [],
        loggedIn: false,
        logInDiv: 'show-block',
        logOutDiv: 'hide',
        appIsLocal: false
    };
}
