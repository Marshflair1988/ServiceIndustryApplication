const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
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
  }

  async login(credentials) {
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
  }

  async logout() {
    const response = await fetch(`${this.baseURL}/auth/logout`, {
      method: 'POST',
      headers: this.getHeaders(),
    });

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    return this.handleResponse(response);
  }

  async getCurrentUser() {
    const response = await fetch(`${this.baseURL}/auth/me`, {
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  async updateProfile(profileData) {
    const response = await fetch(`${this.baseURL}/auth/profile`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(profileData),
    });

    return this.handleResponse(response);
  }

  // Services API calls
  async getServices(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${this.baseURL}/services${
      queryString ? `?${queryString}` : ''
    }`;

    const response = await fetch(url, {
      headers: this.getHeaders(false), // Services are public
    });

    return this.handleResponse(response);
  }

  async getService(id) {
    const response = await fetch(`${this.baseURL}/services/${id}`, {
      headers: this.getHeaders(false), // Services are public
    });

    return this.handleResponse(response);
  }

  async createService(serviceData) {
    const response = await fetch(`${this.baseURL}/services`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(serviceData),
    });

    return this.handleResponse(response);
  }

  async updateService(id, serviceData) {
    const response = await fetch(`${this.baseURL}/services/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(serviceData),
    });

    return this.handleResponse(response);
  }

  async deleteService(id) {
    const response = await fetch(`${this.baseURL}/services/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  async getServicesByProvider(providerId) {
    const response = await fetch(
      `${this.baseURL}/services/provider/${providerId}`,
      {
        headers: this.getHeaders(false), // Public endpoint
      }
    );

    return this.handleResponse(response);
  }

  async getServiceCategories() {
    const response = await fetch(`${this.baseURL}/services/categories/list`, {
      headers: this.getHeaders(false), // Public endpoint
    });

    return this.handleResponse(response);
  }

  // User API calls
  async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${this.baseURL}/users${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  async getUser(id) {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  async updateUser(id, userData) {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(userData),
    });

    return this.handleResponse(response);
  }

  async deleteUser(id) {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  async getUserStats() {
    const response = await fetch(`${this.baseURL}/users/stats/overview`, {
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  // Health check
  async healthCheck() {
    const response = await fetch(`${this.baseURL}/health`);
    return this.handleResponse(response);
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
