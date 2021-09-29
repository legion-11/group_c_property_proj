import http from "../http-common";

class UserDataService {

  signIn(data) {
    return http.post(`/signIn`, data);
  }

  signUp(data) {
    return http.post(`/signUp`, data);
  }

  signOut() {
    return http.get(`/logout`);
  }

  getUser() {
    return http.get(`/getUser`);
  }
}

export default new UserDataService();