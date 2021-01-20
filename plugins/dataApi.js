export default function(context, inject) {
  const appID = 'ZYTJI836W0';
  const apiKey = 'd098b6d1a118b5c6af424db84a43b747';
  const headers = {
    "X-Algolia-API-Key": apiKey,
    "X-Algolia-Application-Id": appID
  }

  inject('dataApi', {
    getHome,
    getReviewsByHomeID,
    getUserByHomeID,
    getHomesByLocation
  })

  async function getHome(homeID) {
    try {
      return unwrap(await fetch(`https://${appID}-dsn.algolia.net/1/indexes/homes/${homeID}`, { headers }))
    } catch(error) {
      getErrorResponse(error);
    }
  }

  async function getReviewsByHomeID(homeID) {
    try {
      return unwrap(await fetch(`https://${appID}-dsn.algolia.net/1/indexes/reviews/query`, { 
        headers,
        method: 'POST',
        body: JSON.stringify({
          filters: `homeId:${homeID}`,
          hitsPerPage: 6,
          attributesToHighlight: []
        })
      }))
    } catch(error) {
      getErrorResponse(error)
    }
  }

  async function getUserByHomeID(homeID) {
    try {
      return unwrap(await fetch(`https://${appID}-dsn.algolia.net/1/indexes/users/query`, { 
        headers,
        method: 'POST',
        body: JSON.stringify({
          filters: `homeId:${homeID}`,
          attributesToHighlight: []
        })
      }))
    } catch(error) {
      getErrorResponse(error)
    }
  }

  async function getHomesByLocation(lat, lng, radiusInMeters = 1500) {
    try {
      return unwrap(await fetch(`https://${appID}-dsn.algolia.net/1/indexes/homes/query`, { 
        headers,
        method: 'POST',
        body: JSON.stringify({
          aroundLatLng: `${lat},${lng}`,
          aroundRadius: radiusInMeters,
          hitsPerPage: 10,
          attributesToHighlight: []
        })
      }))
    } catch(error) {
      getErrorResponse(error)
    }
  }

  async function unwrap(response) {
    const json = await response.json();
    const { ok, status, statusText } = response;
    return { 
      json,
      ok,
      status,
      statusText
    }
  }

  function getErrorResponse(error) {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: {}
    }
  }
}