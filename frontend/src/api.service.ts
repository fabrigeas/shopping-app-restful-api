import axios from 'axios';
import { API_BASE_URL, API_ROUTES } from './constants';
import { User } from './types';

export type Endpoint = 'offers' | 'users';

const cookie = document.cookie
  .split(';')
  .find(t => t.startsWith('Authorization='))
  ?.split('=')
  .pop();

export default {
  signIn(email: string, password: string): Promise<User> {
    return axios
      .post(API_ROUTES.SIGN_IN, {
        email,
        password,
      })
      .then(({ data }) => {
        const { user, tokenData, cookie } = data;

        sessionStorage.setItem('token', tokenData.token);
        sessionStorage.setItem('user', JSON.stringify(user));
        document.cookie = cookie.replace('HttpOnly;', '');

        return user;
      });
  },
  signUp(user: User): Promise<User> {
    return axios.post(API_ROUTES.SIGN_UP, user).then(({ data }) => {
      const { user } = data;

      sessionStorage.setItem('user', JSON.stringify(user));

      return user;
    });
  },
  signOut() {
    return axios({
      url: API_ROUTES.SIGN_OUT,
      method: 'post',
      headers: {
        Authentication: cookie,
      },
    });
  },
  get(endpoint: string) {
    return axios({
      url: `${API_BASE_URL}/${endpoint}`,
      method: 'get',
      headers: {
        'Access-Token': sessionStorage.getItem('token'),
        Authentication: cookie,
      },
    });
  },
  getOfferById(id: string) {
    return axios({
      url: `${API_BASE_URL}/offers/${id}`,
      method: 'get',
      headers: {
        'Access-Token': sessionStorage.getItem('token'),
        Authentication: cookie,
      },
    });
  },
  post(endpoint: Endpoint, data: any) {
    return axios({
      url: `${API_BASE_URL}/${endpoint}`,
      method: 'post',
      headers: {
        'Access-Token': sessionStorage.getItem('token'),
        Authentication: cookie,
      },
      data,
    });
  },
  delete(url: string) {
    return axios({
      url,
      method: 'delete',
      headers: {
        'Access-Token': sessionStorage.getItem('token'),
        Authentication: cookie,
      },
    });
  },
  put(url: string, data: any) {
    return axios({
      url,
      method: 'put',
      headers: {
        'Access-Token': sessionStorage.getItem('token'),
        Authentication: cookie,
      },
      data,
    });
  },
  uploadFile(offerId: string, file: File): Promise<string> {
    const formData = new FormData();

    formData.append('file', file, file.name);

    return axios({
      url: `${API_BASE_URL}/files/${offerId}`,
      method: 'put',
      data: formData,
      headers: {
        'Content-Type': 'image/jpeg',
        Authentication: cookie,
      },
    }).then(({ data }) => {
      return data.originalFilename;
    });
  },
  deleteFile(offerId: string, filename?: string) {
    return axios({
      url: `${API_BASE_URL}/files/${offerId}`,
      method: 'delete',
      headers: {
        'Access-Token': sessionStorage.getItem('token'),
        Authentication: cookie,
        filename,
      },
    });
  },
};
