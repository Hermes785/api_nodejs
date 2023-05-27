const dotenv = require('dotenv').config();

module.exports.Setting = () => {


    const url_linkedin_id = process.env.LINKEDIN_CLIENT_ID;
    const url_linkedin_callback = process.env.LINKEDIN_CALLBACK_URL;
    const url_linkedin_key = process.env.LINKEDIN_CLIENT_SECRET;

    const url_google_id = process.env.GOOGLE_CLIENT_ID;
    const url_google_callback = process.env.GOOGLE_CALLBACK_URL;
    const url_google_key = process.env.GOOGLE_CLIENT_SECRET;

    const url_home = process.env.HOME_URL;

    const url_facebook_id = process.env.FACEBOOK_CLIENT_ID;
    const url_facebook_callback = process.env.FACEBOOK_CALLBACK_URL;
    const url_facebook_key = process.env.FACEBOOK_CLIENT_SECRET;

    const port = process.env.PORT;

    const session_secret = process.env.SESSION_SECRET;

    const key_secret = process.env.secretKey;

    const database_url = process.env.MONGO_URI;

    return {
        url_linkedin_id,
        url_linkedin_callback,
        url_linkedin_key,
        url_google_id,
        url_google_callback,
        url_google_key,
        url_home,
        url_facebook_id,
        url_facebook_callback,
        url_facebook_key,
        port,
        session_secret,
        key_secret,
        database_url
    };
};
