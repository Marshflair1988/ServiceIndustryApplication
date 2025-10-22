const API_URL =
  process.env.REACT_APP_BACKEND_URL ||
  (window.location.hostname === 'localhost'
    ? 'http://localhost:5001/api'
    : 'https://your-backend-url.herokuapp.com/api');

class ApiService {
  constructor() {
    this.baseURL = API_URL;
  }

  // Helper method to get headers with auth token
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  }

  // Authentication API calls
  async register(userData) {
    try {
      const response = await fetch(`${this.baseURL}/auth/register`, {
        method: 'POST',
        headers: this.getHeaders(false),
        body: JSON.stringify(userData),
      });

      const data = await this.handleResponse(response);

      if (data.success && data.data.token) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }

      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async login(credentials) {
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: this.getHeaders(false),
        body: JSON.stringify(credentials),
      });

      const data = await this.handleResponse(response);

      if (data.success && data.data.token) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }

      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async logout() {
    try {
      const response = await fetch(`${this.baseURL}/auth/logout`, {
        method: 'POST',
        headers: this.getHeaders(true),
      });

      const data = await this.handleResponse(response);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return data;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { success: false, message: error.message };
    }
  }

  async getCurrentUser() {
    try {
      const response = await fetch(`${this.baseURL}/auth/me`, {
        method: 'GET',
        headers: this.getHeaders(true),
      });

      return await this.handleResponse(response);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async updateProfile(profileData) {
    try {
      const response = await fetch(`${this.baseURL}/auth/profile`, {
        method: 'PUT',
        headers: this.getHeaders(true),
        body: JSON.stringify(profileData),
      });

      const data = await this.handleResponse(response);

      if (data.success && data.data.user) {
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }

      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // User Endpoints
  async getAllUsers(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString
        ? `${this.baseURL}/users?${queryString}`
        : `${this.baseURL}/users`;

      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(true),
      });

      return await this.handleResponse(response);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getUserById(id) {
    try {
      const response = await fetch(`${this.baseURL}/users/${id}`, {
        method: 'GET',
        headers: this.getHeaders(true),
      });

      return await this.handleResponse(response);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async updateUser(id, userData) {
    try {
      const response = await fetch(`${this.baseURL}/users/${id}`, {
        method: 'PUT',
        headers: this.getHeaders(true),
        body: JSON.stringify(userData),
      });

      return await this.handleResponse(response);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async deleteUser(id) {
    try {
      const response = await fetch(`${this.baseURL}/users/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders(true),
      });

      return await this.handleResponse(response);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getUserStats(id) {
    try {
      const response = await fetch(`${this.baseURL}/users/${id}/stats`, {
        method: 'GET',
        headers: this.getHeaders(true),
      });

      return await this.handleResponse(response);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Service Endpoints
  async getAllServices(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString
        ? `${this.baseURL}/services?${queryString}`
        : `${this.baseURL}/services`;

      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(true),
      });

      return await this.handleResponse(response);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getServiceById(id) {
    try {
      const response = await fetch(`${this.baseURL}/services/${id}`, {
        method: 'GET',
        headers: this.getHeaders(true),
      });

      return await this.handleResponse(response);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async createService(serviceData) {
    try {
      const response = await fetch(`${this.baseURL}/services`, {
        method: 'POST',
        headers: this.getHeaders(true),
        body: JSON.stringify(serviceData),
      });

      return await this.handleResponse(response);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async updateService(id, serviceData) {
    try {
      const response = await fetch(`${this.baseURL}/services/${id}`, {
        method: 'PUT',
        headers: this.getHeaders(true),
        body: JSON.stringify(serviceData),
      });

      return await this.handleResponse(response);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async deleteService(id) {
    try {
      const response = await fetch(`${this.baseURL}/services/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders(true),
      });

      return await this.handleResponse(response);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getServicesByProvider(providerId) {
    try {
      const response = await fetch(
        `${this.baseURL}/services/provider/${providerId}`,
        {
          method: 'GET',
          headers: this.getHeaders(true),
        }
      );

      return await this.handleResponse(response);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getServiceCategories() {
    try {
      const response = await fetch(`${this.baseURL}/services/categories/list`, {
        method: 'GET',
        headers: this.getHeaders(true),
      });

      return await this.handleResponse(response);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async uploadProfilePicture(userId, file) {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await fetch(
        `${this.baseURL}/users/${userId}/profile-picture`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        }
      );

      return await this.handleResponse(response);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async deleteProfilePicture(userId) {
    try {
      const response = await fetch(
        `${this.baseURL}/users/${userId}/profile-picture`,
        {
          method: 'DELETE',
          headers: this.getHeaders(true),
        }
      );

      return await this.handleResponse(response);
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

const apiService = new ApiService();
export default apiService;
