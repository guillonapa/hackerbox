import Emoji from 'a11y-react-emoji';

const React = require('react');
const NewsAPI = require('newsapi');

const pageSize = 30;
const newsapi = new NewsAPI(process.env.REACT_APP_NEWS_API_KEY);

export async function componentDidMount() {
    try {
        const response = await newsapi.v2.sources({ language: "en" });
        if (response.status === 'ok') {
            return {
                listOfSources: response.sources
            };
        }
    } catch (err) {
        console.log(err);
    }
    return {};
}

export async function makeNewsApiCall(source, country) {
    try {
        let options;
        // call the API and get stories for default
        if (source === null || source === "") {
          options = { country, pageSize };
        } else {
          options = { sources: [source], pageSize }
        }
        const response = await newsapi.v2.topHeadlines(options);
        if (response.status === 'ok') {
            return {
                source,
                articles: response.articles,
                skeleton: '',
                showSavedStories: false
            };
        }
    } catch (err) {
        console.log(err);
    }
    return {};
}

export async function handleOpenSavedStories() {
    return {};
};

export function handleSaveArticle(title, description, url, imageUrl, source) {
    return () => {}
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
