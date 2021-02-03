const axios = require("axios");
const { InternalError, BadRequestError } = require('../services/error');

class Client {
  static async get(url, headers) {
    try {
      const config = { headers };
      const response = await axios.get(url, config);
      return response.data;
    } catch (e) {
      this.handleErrors(e);
    }
  }

  static async post(url, body, headers) {
    try {
      const config = { headers };
      const response = await axios.post(url, body, config);
      return response.data;
    } catch (e) {
      this.handleErrors(e);
    }
  }

  static async put(url, body, headers) {
    try {
      const config = { headers };
      const response = await axios.put(url, body, config);
      return response.data;
    } catch (e) {
      this.handleErrors(e);
    }
  }

  static async delete(url, headers) {
    try {
      const config = { headers };
      const response = await axios.delete(url, config);
      return response.data;
    } catch (e) {
      this.handleErrors(e);
    }
  }
  static handleErrors(e) {
    if (e.response && e.response.status) {
      const status = parseInt(e.response.status)
      if (299 < status && status < 400) {
        throw new BadRequestError(e.message);
      } else if (399 < status && status < 500) {
        throw new BadRequestError(e.message);
      }
    }
    throw new InternalError(e.message);
  }
}

module.exports = Client;
