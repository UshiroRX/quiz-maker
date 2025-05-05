import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

interface RegisterData {
  username: string;
  password: string;
}

class AuthService {
  async register(userData: RegisterData) {
    try {
      console.log(userData);
      const response = await axios.post(
        `${apiUrl}/auth/register`,
        new URLSearchParams({
          username: userData.username,
          password: userData.password,
        }),
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async login(credentials: RegisterData) {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        new URLSearchParams({
          username: credentials.username,
          password: credentials.password,
        }),
      );
      if (response.data) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        await this.getProfile(response.data.access_token);
      }
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  async getProfile(token: string) {
    try {
      const response = await axios.post(`${apiUrl}/auth/profile`, {
        access_token: token,
      });
      localStorage.setItem("user", response.data.username);
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
