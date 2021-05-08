import { unwrap, getErrorResponse } from '~/utils/fetchUtils'

export default function({ $config }, inject) {
  const headers = {
    "X-Algolia-API-Key": $config.algolia.key,
    "X-Algolia-Application-Id": $config.algolia.appId
  }

  inject('dataApi', {
    getHome,
    getReviewsByHomeID,
    getUserByHomeID,
    getHomesByLocation,
    getHomes
  })

  async function getHome(homeID) {
    try {
      return unwrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/homes/${homeID}`, { headers }))
    } catch(error) {
      getErrorResponse(error);
    }
  }

  async function getReviewsByHomeID(homeID) {
    try {
      return unwrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/reviews/query`, { 
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
      return unwrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/users/query`, { 
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

  async function getHomesByLocation(lat, lng, start, end, radiusInMeters = 1500 * 15) {
    try {
      const days = []
      for(var day = start; day <= end; day += 86400) {
        days.push(`availability:${day}`)
      }

      return unwrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/homes/query`, { 
        headers,
        method: 'POST',
        body: JSON.stringify({
          aroundLatLng: `${lat},${lng}`,
          aroundRadius: radiusInMeters,
          hitsPerPage: 10,
          filters: days.join(' AND '),
          attributesToHighlight: []
        })
      }))
    } catch(error) {
      getErrorResponse(error)
    }
  }

  async function getHomes() {
    try {
      return unwrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/homes/query`, { 
        headers,
        method: 'POST',
        body: JSON.stringify({
          hitsPerPage: 3,
          attributesToHighlight: []
        })
      }))
    } catch(error) {
      getErrorResponse(error)
    }
  } 
}