<template>
  <q-page padding>
    <div class="column items-center justify-center">
      <q-avatar
        v-if="loginStore.profileImage"
        color="primary"
        text-color="white"
        class="q-mb-md"
        size="200px"
      >
        <img :src="loginStore.profileImage" alt="" />
      </q-avatar>
      <q-avatar
        v-else
        icon="person"
        color="primary"
        text-color="white"
        class="q-mb-md"
      >
      </q-avatar>
      <span class="text-subtitle2 q-mb-md">{{ userName }}</span>
    </div>
    <q-form align="center" ref="form" autofocus @submit="updateUserInfo()">
      <div class="row wrap justify-around">
        <q-input
          filled
          class="q-mb-md col-md-5 col-xs-12"
          v-model="firstName"
          label="Your first name *"
          lazy-rules
          :rules="[(val) => val.length > 2 || 'Please insert your name']"
          name="first name"
          :disable="!editMode"
        />
        <q-input
          filled
          class="q-mb-md col-md-5 col-xs-12"
          v-model="lastName"
          label="Your last name *"
          lazy-rules
          :rules="[(val) => val.length > 2 || 'Please insert your last name']"
          name="last name"
          :disable="!editMode"
        />
        <q-input
          filled
          class="q-mb-md col-md-5 col-xs-12"
          v-model="address"
          label="Your address *"
          lazy-rules
          :rules="[(val) => val.length > 15 || 'Please insert your address']"
          name="address"
          :disable="!editMode"
        />
        <q-input
          filled
          class="q-mb-md col-md-5 col-xs-12"
          v-model="school"
          label="Your school *"
          lazy-rules
          :rules="[(val) => val.length > 5 || 'Please insert your school']"
          name="school"
          :disable="!editMode"
        />
        <q-select
          color="teal"
          filled
          class="q-mb-md col-md-5 col-xs-12"
          v-model="province"
          :options="profileStore.userInfo?.data.provinces"
          option-value="id"
          option-label="title"
          label="Province"
          :disable="!editMode"
          lazy-rules
          :rules="[(val) => val !== '' || 'Please select your Province']"
        >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-select>
        <q-select
          color="teal"
          filled
          class="q-mb-md col-md-5 col-xs-12"
          v-model="city"
          :options="cities"
          option-value="id"
          option-label="title"
          label="City"
          :disable="!editMode || cities.length === 0"
          lazy-rules
          :rules="[(val) => val !== '' || 'Please select your City']"
        >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-select>
        <q-select
          color="teal"
          filled
          class="q-mb-md col-md-5 col-xs-12"
          v-model="major"
          :options="profileStore.userInfo?.data.majors"
          option-value="id"
          option-label="title"
          label="Majority"
          :disable="!editMode"
          lazy-rules
          :rules="[(val) => val !== '' || 'Please select your Majority']"
        >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-select>
        <q-select
          color="teal"
          filled
          class="q-mb-md col-md-5 col-xs-12"
          v-model="grade"
          :options="profileStore.userInfo?.data.grades"
          option-value="id"
          option-label="title"
          label="Grade"
          :disable="!editMode"
          lazy-rules
          :rules="[(val) => val !== '' || 'Please select your Grade']"
        >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-select>
        <q-select
          color="teal"
          filled
          class="q-mb-md col-md-11 col-xs-12"
          v-model="gender"
          :options="profileStore.userInfo?.data.genders"
          option-value="id"
          option-label="title"
          label="Gender"
          :disable="!editMode"
          lazy-rules
          :rules="[(val) => val !== '' || 'Please select your Gender']"
        >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-select>
      </div>
      <template v-if="!editMode">
        <q-btn
          outline
          color="primary"
          padding="xs lg"
          label="Edit"
          type="button"
          :loading="loginStore.loading"
          @click="editMode = true"
        ></q-btn>
      </template>
      <template v-else>
        <q-btn
          outline
          class="q-mr-md"
          color="primary"
          padding="xs lg"
          label="Submit"
          type="submit"
          :loading="loginStore.loading"
          @click="editMode = true"
        ></q-btn>
        <q-btn
          outline
          color="primary"
          padding="xs lg"
          label="Cancel"
          type="button"
          :loading="loginStore.loading"
          @click="editMode = false"
        ></q-btn>
      </template>
    </q-form>
  </q-page>
</template>

<script lang="ts" setup>
import { QForm, useQuasar } from 'quasar';
import { City, GlobalDataModel, Info } from 'src/dto/user/info.dto';
import { useLoginStore } from 'src/stores/login';
import { useProfileStore } from 'src/stores/profile';
import { ComputedRef, Ref, computed, onMounted, ref } from 'vue';
const profileStore = useProfileStore();
const loginStore = useLoginStore();
const quasarInstance = useQuasar();
const userName: ComputedRef<string> = computed(() => {
  if (loginStore.userData?.first_name) return loginStore.userData?.first_name;
  if (loginStore.userData?.mobile) return loginStore.userData?.mobile;
  return 'hello guest';
});
const cities: ComputedRef<City[]> = computed(() => {
  return profileStore.userInfo?.data.cities.filter(
    (city) => city.province.id === province.value?.id
  ) as City[];
});
const firstName: Ref<string> = ref('');
const lastName: Ref<string> = ref('');
const address: Ref<string> = ref('');
const school: Ref<string> = ref('');
const major: Ref<Info | null> = ref(null);
const grade: Ref<Info | null> = ref(null);
const gender: Ref<Info | null> = ref(null);
const province: Ref<GlobalDataModel | null> = ref(null);
const city: Ref<City | null> = ref(null);
const editMode: Ref<boolean> = ref(false);
const form: Ref<QForm | null> = ref(null);
onMounted(async () => {
  loginStore.restoreUserData();
  await profileStore.getUserInfo();
  fillForm();
});

function fillForm(): void {
  firstName.value = loginStore.userData?.first_name || '';
  lastName.value = loginStore.userData?.last_name || '';
  address.value = loginStore.userData?.address || '';
  major.value = loginStore.userData?.major || null;
  grade.value = loginStore.userData?.grade || null;
  gender.value = loginStore.userData?.gender || null;
  province.value = loginStore.userData?.shahr.province || null;
  city.value = loginStore.userData?.shahr || null;
  school.value = loginStore.userData?.school || '';
}

async function updateUserInfo(): Promise<void> {
  loginStore.restoreToken();
  await (form.value as QForm).validate().then(async (response) => {
    if (response) {
      profileStore
        .updateUserInfo(
          {
            address: address.value,
            first_name: firstName.value,
            gender_id: Number(gender.value?.id),
            grade_id: Number(grade.value?.id),
            last_name: address.value,
            major_id: Number(major.value?.id),
            school: school.value,
            shahr_id: Number(city.value?.id),
          },
          Number(loginStore.userData?.id)
        )
        .then(() => {
          editMode.value = false;
          quasarInstance.notify({
            progress: true,
            color: 'primary',
            textColor: 'white',
            message: 'Your profile successfully updated',
          });
        });
    }
  });
}
</script>
