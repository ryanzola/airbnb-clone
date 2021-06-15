import fetch from 'node-fetch'
import { unwrap, getErrorResponse } from '../../../utils/fetchUtils'
import { getHeaders } from '../../helpers';

export default (algoliaConfig) => {
  const headers = getHeaders(algoliaConfig);

  return {
    bookHome: async (identityId, homeId, start, end) => {
      try {
        return unwrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/bookings`, { 
          headers,
          method: 'POST',
          body: JSON.stringify({
            identityId,
            homeId,
            start,
            end
          })
        }))
      } catch(error) {
        getErrorResponse(error)
      }
    },
    removeHome: async function(identity, homeId) {
      const payload = (await this.getById(identity)).json
      const homes = payload.homeId.filter(id => id !== homeId)
      payload.homeId = homes

      this.create(identity, payload)
    },
    assignHome: async function(identity, homeId) {
      const payload = (await this.getById(identity)).json
      payload.homeId.push(homeId)
      this.create(identity, payload)
    },
    create: async (identity, payload) => {
      try {
        return unwrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, { 
          headers,
          method: 'PUT',
          body: JSON.stringify(payload)
        }))
      } catch(error) {
        getErrorResponse(error)
      }
    },
    getById: async function(identity) {
      try {
        return unwrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, { 
          headers,
        }))
      } catch(error) {
        getErrorResponse(error)
      }
    }
  }
}