import Emoji from 'a11y-react-emoji';
import axios from 'axios';

const React = require('react');
const BuildDate = require('./BuildDate');

// axios instance to call on backend
const axiosInstance = axios.create();

const log = message => axiosInstance.post('/log', { message });
const debug = message => axiosInstance.post('/debug', { message });

export async function componentDidMount() {
    try {
        log('Componend did mount... getting list of sources.');
        const response = await axiosInstance.get('/home');
        debug(`(/home): [success: ${response.data.success}, listOfSources: ${response.data.data.listOfSources}]`);
        if (response.data.success) {
            return { listOfSources: response.data.data.listOfSources };
        }
    } catch (err) {
        log(`(ERROR): ${err}`);
    }
    return {};
}

export async function makeNewsApiCall(source, country) {
    try {
        const route = `/news/${country}/${source === null ? '' : `${source}`}`;
        log(`Making newsapi call: ${route}`);
        const response = await axiosInstance.get(route);
        debug(`(${route}): [success: ${response.data.success}, source: ${response.data.data.source}, articles: ${response.data.data.articles}]`);
        if (response.data.success) {
            return { source: response.data.data.source, articles: response.data.data.articles, skeleton: '', showSavedStories: false }
        }
    } catch (err) {
        log(`(ERROR): ${err}`);
    }
    return {};
}

export async function handleOpenSavedStories() {
    try{
        log('Getting saved stories');
        const response = await axiosInstance.get(`/stories`);
        debug(`(/stories): [success: ${response.data.success}, savedStories: ${response.data.data}]`);
        if (response.data.success) {
            return { savedStories: response.data.data, skeleton: '' };
        }
    } catch (err) {
        log(`(ERROR): ${err}`);
    }
    return {};
};

export function handleSaveArticle(title, description, url, imageUrl, source) {
    return () => {
        log(`Saving article: '${title}'`);
        debug(`Article to save: [title: ${title}, description: ${description}, url: ${url}, imageUrl: ${imageUrl}, source: ${source}]`);
        axiosInstance.post(
            `/save`,
            {
                title,
                description,
                url,
                imageUrl,
                source
            }
        );
    };
};

export function handleDeleteArticle(title, description, url, imageUrl, source) {
    return async () => {
        log(`Removing article: '${title}'`);
        debug(`Article to remove: [title: ${title}, description: ${description}, url: ${url}, imageUrl: ${imageUrl}, source: ${source}]`);
        const response = await axiosInstance.post(
            `/remove`,
            {   
                title,
                description,
                url,
                imageUrl,
                source
            }
        );
        debug(`Remove response: ${JSON.stringify(response)}`);
        if (response.data === 200) {
            return true;
        }
        return false;
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
                Hackerbox is a platform where your news reading happens. There&apos;s a lot of amazing blogs and sites out there, but it&apos;s hard to keep up with all 
                the content. Hackerbox is a place where you can find and read articles from a myriad of sources, or save them for later reads. Enjoy!
            </p>
            <p>
                Try Hackerbox with your first <Emoji symbol="☕" /> &nbsp;in the morning.
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
        appIsLocal: true,
        buildDate: BuildDate.buildDate()
    };
}
