// This file can be imported inside the service worker,
// which means all of its functions and variables will be accessible
// inside the service worker.
// The importation is done in the file `service-worker.js`.


class ApiCaller {

  /**
   * GET request
   * @param {string} url - The API URL
   * @param {string} authorization - Authorization HTTP header
   * @returns {Promise<object>} - The API response
   */
  async get(url, authorization) {
    return this._makeRequest(url, 'GET', authorization);
  }

  /**
   * POST request
   * @param {string} url - The API URL
   * @param {object} body - The request payload
   * @param {string} authorization - Authorization HTTP header
   * @returns {Promise<object>} - The API response
   */
  async post(url, body, authorization) {
    return this._makeRequest(url, 'POST', authorization, body);
  }

  /**
   * PUT request
   * @param {string} url - The API URL
   * @param {object} body - The request payload
   * @param {string} authorization - Authorization HTTP header
   * @returns {Promise<object>} - The API response
   */
  async put(url, body, authorization) {
    return this._makeRequest(url, 'PUT', authorization, body);
  }

  /**
   * DELETE request
   * @param {string} url - The API URL
   * @param {string} authorization - Authorization HTTP header
   * @returns {Promise<object>} - The API response
   */
  async delete(url, authorization) {
    return this._makeRequest(url, 'DELETE', authorization);
  }

  /**
   * PATCH request
   * @param {string} url - The API URL
   * @param {object} body - The request payload
   * @param {string} authorization - Authorization HTTP header
   * @returns {Promise<object>} - The API response
   */
  async patch(url, body, authorization) {
    return this._makeRequest(url, 'PATCH', authorization, body);
  }


  /**
   * Make an API call
   * @param {string} url - The API URL
   * @param {string} method - The HTTP method
   * @param {string} authorization - Authorization HTTP header, for example: 'Bearer someapitoken'
   * @param {object} body - The request payload (optional)
   * @returns {Promise<object>} - The API response
   */
  async _makeRequest(url, method, authorization = '', body = null) {
    const requestOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(authorization && { 'Authorization': authorization })
      },
      ...(body && { body: JSON.stringify(body) })
    };

    const fetchObj = await fetch(url, requestOptions);
    if (!fetchObj.ok) {
      throw new Error(`HTTP error! status: ${fetchObj.status}`);
    }
    return await fetchObj.json();
  }


}


export default new ApiCaller();

