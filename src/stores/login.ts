import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { LoginResponse } from 'src/dto/auth/login.dto';
import { User } from 'src/dto/user/user.dto';

export const useLoginStore = defineStore('login', {
  state: () => ({
    loginData: {
      phoneNumber: '',
      nationalCode: '',
    },
    loading: false,
    hasError: false,
    formIsValid: false,
    userData: null as User | null,
  }),

  getters: {
    profileImage(state) {
      return state.userData?.photo || null;
    },
  },

  actions: {
    setLoginData(phoneNumber: string, nationalCode: string) {
      this.loginData = {
        nationalCode,
        phoneNumber,
      };
    },
    async login(): Promise<void> {
      if (this.loading) return;
      this.setLoadingState(true);
      this.setErrorState(false);
      await api
        .post<LoginResponse>('login', {
          mobile: this.loginData.phoneNumber,
          password: this.loginData.nationalCode,
        })
        .then((response) => {
          this.setUserData(response.data.data.user);
          this.storeToken(
            response.data.data.token_type +
              ' ' +
              response.data.data.access_token
          );
          this.storeUserData(response.data.data.user);
          api.defaults.headers.common['Authorization'] =
            response.data.data.token_type +
            ' ' +
            response.data.data.access_token;
          this.router.push({
            path: '/profile',
            name: 'profile',
          });
        })
        .catch(() => {
          this.setErrorState(true);
          this.removeToken();
        })
        .finally(() => {
          this.setLoadingState(false);
        });
    },
    setLoadingState(state: boolean): void {
      this.loading = state;
    },
    setFormValidationState(state: boolean): void {
      this.formIsValid = state;
    },
    setErrorState(state: boolean): void {
      this.hasError = state;
    },
    setUserData(data: User): void {
      this.userData = data;
    },
    storeUserData(data: User): void {
      localStorage.setItem('user-data', JSON.stringify(data));
    },
    restoreUserData(): void {
      this.userData =
        JSON.parse(localStorage.getItem('user-data') as string) ?? null;
    },
    storeToken(token: string): void {
      localStorage.setItem('token', JSON.stringify(token));
    },
    removeToken(): void {
      localStorage.removeItem('token');
    },
    restoreToken(): void {
      if (localStorage.getItem('token')) {
        const token: string = JSON.parse(
          localStorage.getItem('token') as string
        );
        api.defaults.headers.common['Authorization'] = token;
      }
    },
  },
});
