import { defineStore } from 'pinia';
import { UpdateUserInfoBody, UserInfo } from 'src/dto/user/info.dto';
import { api } from 'src/boot/axios';

export const useProfileStore = defineStore('profileStore', {
  state: () => ({
    userInfo: null as UserInfo | null,
    loading: false,
    hasError: false,
  }),

  // getters: {
  //   doubleCount (state) {
  //     return state.userInfo * 2;
  //   }
  // },

  actions: {
    async getUserInfo(): Promise<void> {
      if (this.loading) return;
      this.setLoadingState(true);
      this.setErrorState(false);
      await api
        .get<UserInfo>('megaroute/getUserFormData')
        .then((response) => {
          this.setUserInfo(response.data);
        })
        .catch(() => {
          this.setErrorState(true);
        })
        .finally(() => {
          this.setLoadingState(false);
        });
    },
    async updateUserInfo(body: UpdateUserInfoBody, id: number): Promise<void> {
      if (this.loading) return;
      this.setLoadingState(true);
      this.setErrorState(false);
      await api
        .put<void>(`user/${id}`, body)
        .then()
        .catch(() => {
          this.setErrorState(true);
        })
        .finally(() => {
          this.setLoadingState(false);
        });
    },
    setUserInfo(data: UserInfo): void {
      this.userInfo = data;
    },
    setLoadingState(state: boolean): void {
      this.loading = state;
    },
    setErrorState(state: boolean): void {
      this.hasError = state;
    },
  },
});
