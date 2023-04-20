/* direct to spotify auth page to do the auth job */
export const authEndpoint = 'https://accounts.spotify.com/authorize'
/* redirect user back to localhost */
const redirectUri = 'http://localhost:3000/'
/* user client id used for url and connect the application to spotify */
const clientId = '9c5da1d62dd64b3a9d2187be51a49d72'

/* what user can do on spotify-clone (spotify permission scopes) */
const scopes = [
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-top-read',
    'user-modify-playback-state',
];

/* get the access from the url below after authorized */
export const getTokenFromUrl = () => {
    /* for getting the user's superkey (mysupersecrectkey) begin with # - hash 
        ex: localhost:3000/#accessToken=superkey&....&.... 
    from the loginUrl below then use it to verify which page we'll in after authorized at App.js */
    return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
        let parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);

        return initial;
    }, {});
}

/* url to redirect user (clientid) to spotify auth page with localhost port 3000 */
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
