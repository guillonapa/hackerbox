import Emoji from 'a11y-react-emoji';
import axios from 'axios';

const React = require('react');

// axios instance to call on backend
const axiosInstance = axios.create();

export async function componentDidMount() {
    try {
        const response = await axiosInstance.get(`/home`);
        console.log(response);
        if (response.data.success) {
            return { listOfSources: response.data.data.listOfSources };
        }
    } catch (err) {
        console.log(err);
    }
    return {};
}

export async function makeNewsApiCall(source, country) {
    try {
        const response = await axiosInstance.get(`/news/${country}/${source}`);
        if (response.data.success) {
            return { source: response.data.data.source, articles: response.data.data.articles, skeleton: '', showSavedStories: false }
        }
    } catch (err) {
        console.log(err);
    }
    return {};
}

export async function handleOpenSavedStories() {
    try{
        const response = await axiosInstance.get(`/stories`);
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
        appIsLocal: true
    };
}
