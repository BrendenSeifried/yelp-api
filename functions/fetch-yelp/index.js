const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

const handler = async (event) => {
  const zip = event.queryStringParameters.zip;
  console.log(zip);
  try {
    const resp = await fetch(`https://api.yelp.com/v3/businesses/`, {
      header: {
        Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`,
      },
    });
    const data = await resp.json();
    const json = JSON.stringify(data);

    return {
      statusCode: 200,
      body: json,
    };
  } catch (error) {
    console.log(error);
    return {
      satusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
  // add code here to fetch data from yelp API
  // be sure to include the parameters from event.queryStringParameters
};

module.exports = { handler };
