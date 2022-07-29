# PLANTinum PJT 회고록

[toc]



## 안된점들😢

### FE🌄

#### CSS

##### div 태그에 span태그를 수평 중앙정렬🎈

```html
<template>
  <div class="boxes">
    <!-- first box -->
    <div class=first-box>
      <div class="row">
        <div class="col-md-3 home-logo">
          <router-link :to="{ name: 'home' }">
            <span>
              Plantinum
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  ...
</template>
```

```css
  .home-logo {
    text-align: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-decoration: none;
  }
```

- 포인트
  - 스타일에도 넣을 수 있고,
  - 클래스에 d-flex justify-content-center로도 가능!



---

##### 버튼에 스타일 주기🎆

```html
<template>
  <div class="boxes">
    <div class="first-box">
      ...
      <div class="btnbox row" v-if="!isLoggedIn">
        <!-- <div class="btnbox row"> -->
          <div class="btn-border col-6">
            <div class="login d-flex justify-content-center">
              <router-link :to="{ name: login }">
                <button class="btn">로그인</button>
              </router-link>
            </div>
          </div>
        </div>
      ...
    </div>
  </div>  
</template>
```

```css
  .btn{
    border-radius: 5px;
    height: 44px;
    font-size: 1rem;
    background-color: #b2c9ab;
    color: white;
    width: 100%;
  }

  .btnbox a {
    width: 50%;
  }
```

- 기능

  1. 버튼 클릭하면 해당 링크로 이동

- 포인트

  1. 버튼 생성 후 위치를 정하기 위해 justify-content-center

  2. 높이(height) 조절

  3. border-radius를 통해 버튼 둥글기 조절

  4. 부모  div인 btn-border가 가지고 있는 col-6에서 버튼의 너비(width)를 100%로 꽉 채운 후, 그 속에 있는 a 태그 역할을 하는 router-link의 너비(width)는  50%로 채움



---

##### 배경 이미지 투명도 조절🧨

```css
<style scoped>
.profile {
  background-image: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('@/assets/ProfileView/background_img.jpg');
  background-size: cover;
  height: 1117px;
}
</style>
```

- 기능
  - 배경 `이미지만` 투명으로 설정하고 싶다!
  - **opacity로 조절하면 글자도 투명해짐...ㅠㅠ**



---

##### input[type="file"] 커스터마이징🎉

```vue
<template>
  ...
  <div class="profile-pic d-flex justify-content-center">
    <label for="pic-file">
      <span class="material-symbols-outlined">
        photo_camera
   	  </span>
      <span>
        사진 변경하기
      </span>
    </label>
      <input type="file" id="pic-file">
    </div>
  ...
</template>
```

- 기능
  - 기존 멋없는 input 태그가 없어지고,
  - label로 묶인 항목이 표시됨



---

#### Vue.js

##### v-on click을 활용해 렌더링되는 화면 교체하기🎇

```vue
<template>
  ...
  <span @click="changeMyleaf82">
      내 잎팔이 글
  </span>
  ...
</template>
<script>
export default {
  name: 'ProfileDetail',
  data() {
    return {
      myleaf82: false,
    }
  },
  methods: {
    changeMyleaf82() {
      this.myleaf82 = !this.myleaf82
    },
  }
}    
</script>
```

- 기능
  - 버튼 클릭시 관련 정보 보여주기
    - 로그인 및 회원정보 수정 | 내가 등록한 게시글 

- 포인트
  1. 보여줄 화면을 인식하는 값(myleaf82)을 데이터에 저장
  2. methods에 그 값을 변경해주는 changeMyleaf82() 함수 지정
     - ~~method~~ --> methods...
  3. 클릭시 이동시켜줄 span 태그 지정



---

##### vuex 관리하기(로그인 , 로그아웃 사이클)🎃

```js
import router from '@/router'
import axios from 'axios'
import drf from '@/api/drf'

export const Account = {
  // state: {
  // },
  // getters: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  state: {
    token: localStorage.getItem('token') || '' ,
    currentUser: {},
    authError: null,
    profile: {},
  },

  getters: {
    isLoggedIn: state => !!state.token,
    currentUser: state => state.currentUser,
    authError: state => state.authError,
    authHeader: state => ({ Authorization: `Token ${state.token}`}),
    profile: state => state.profile,
  },

  mutations: {
    SET_TOKEN: (state, token) => state.token = token,
    SET_CURRENT_USER: (state, user) => state.currentUser = user,
    SET_AUTH_ERROR: (state, error) => state.authError = error,
    SET_PROFILE: (state, profile) => state.profile = profile,
  },

  actions: {
      
    // mutations을 호출할 actions
    saveToken({ commit }, token) {
      commit('SET_TOKEN', token)
      localStorage.setItem('token', token)
    },

    removeToken({ commit }) {
      commit('SET_TOKEN', '')
      localStorage.setItem('token', '')
    },

    resetCurrentUser({ commit }) {
      commit('SET_CURRENT_USER', {})
    },

    resetProfile({ commit }) {
      commit('SET_PROFILE', {})
    },

    // 홈페이지에서 로그인이나 로그아웃 버튼이 눌릴 때 시행될  actions
    login({ commit, dispatch }, credentials) {
      axios ({
        url: drf.accounts.login(),
        method: 'post',
        data: credentials
      })
      .then(res => {
        const token = res.data.key
        dispatch('saveToken', token)
        dispatch('fetchCurrentUser')
        dispatch('fetchProfile')
        router.push({ name: 'home' })
      })
      .catch(err => {
        console.error(err.response.data)
        commit('SET_AUTH_ERROR', err.response.data)
      })
    },

    logout({ getters, dispatch }) {
      axios({
        url: drf.accounts.logout(),
        method: 'post',
        headers: getters.authHeader,
      })
      .then(() => {
        dispatch('removeToken')
        dispatch('resetCurrentUser')
        dispatch('resetProfile')
        alert('logout 되었습니다')
        router.push({ name: 'home' })
      })
      // 에러 발생 시 어떻게 할 지 고민해야 함
      .catch(err => {
        alert('잘못된 접근입니다.')
        console.log(err.response)
      })
    },

      
    // 로그인시 내부적으로 작동할 actions 
    fetchCurrentUser({ commit, getters, dispatch }) {
      if (getters.isLoggedIn) {
        axios({
          url: drf.accounts.currentUserInfo(),
          method: 'get',
          headers: getters.authHeader,
        })
        .then(res => commit('SET_CURRENT_USER', res.data))
        .catch(err => {
          if (err.response.status === 401) {
            dispatch('removeToken')
            router.push({ name: 'login' })
          }
        })
      }
    },

    fetchProfile({ commit, getters },) {
      axios({
        url: drf.accounts.profile(),
        method: 'get',
        headers: getters.authHeader,
      })
      .then(res => {
        commit('SET_PROFILE', res.data)
      })
      .catch(err => {
        if (err.response.status === 404) {
          router.push({ name: 'NotFound404' })
        }
      })
    },
  }
}
```

- 기능
  - 로그인 시 사용자 정보 및 프로필 페이지에 활용될 정보 받아옴
  - 로그아웃 시 토큰, 사용자 정보, 프로필 정보를 지워서 해당 페이지에 접근해도 띄어주는 정보가 없어짐
    - 1차적으로 접근을 못하게 막아야함



- 포인트

  1. 로그인 클릭했을 때, 백엔드로 credentials로 묶어 로그인 정보와 함께 axios 요청을 보냄

  2. 백엔드에서 response를 보내줌
  3. 받아온 토큰 값을 saveToken actions를 호출해 state의 token에저장해주고,
     1. saveToken actions는 SET_TOKEN mutations를 호출해 state의 token 값을 수정
  4.  fetchCurrentUser actions를 실행함
     1. 로그인이 되어있다면 백엔드에 유저 정보를 요청함
     2. 받아온 유저정보를 SET_CURRENT_USER mutations를 호출해 state의 currentUser 값을 수정
  5. fetchProfile actions를 실행함
     1. 위와 같은 형태
  6. router.push를 통해 home이름을 가진 라우터로 이동시킴(로그인 후 홈화면 이동)
  7. 에러가 발생했다면 어스에러 실행...

---

##### 로그인시 로그인, 회원 정보 vuex store에 저장하여 유지하고 로그아웃시 삭제🎊

- App.vue(가장 상위항목에서 실행)
  - 하위항목에서 항상 차있음
- logout actions를 실행하면서 resetToken과 resetCurrentUser, resetProfile을 실행하여 store에서 삭제



---

### BE🌅
