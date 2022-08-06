# PLANTinum PJT 회고록

[toc]



## 안된점들😢

### FE🌄

#### Javascript

##### 반복문(for) 복습하기🎏

- for

  - 세미콜론(;)으로 구분되는 세 부분으로 구성

    - initialization
      - 최초 반복문 진입 시 1회만 실행되는 부분

    - condition
      - 매 반복 시행 전 평가되는 부분

  - expression
    - 매 반복 시행 이후 평가되는 부분

  ```javascript
  for (initialization; condition; expression) {
      // do something
  }
  
  // 예시
  for (let i = 0; i < 6; i++) {
      console.log(i)
  }
  
  
  ```

- for ... in

  - `객체(object)의 속성(key)`들을 순회할 때 사용
  - 배열도 순회 가능하지만 `권장하지 않음`
  - 시행할 코드는 중괄호 안에 작성
  - 블록스코프 생성

  ```javascript
  for (variable in object) {
      // do something
  }
  
  // 예시
  const capitals = {
      korea: 'seoul'
      france: 'paris'
      USA: 'washigton D.C.'
  }
  
  for (let capital in capitals) {
      console.log(capital)  // korea, france, USA
  }
  ```

- for ... of

  - `반복가능한(iterable) 객체`를 순회하며 값을 꺼낼 때 사용
  - 실행할 코드는 중괄호 안에 작성
  - 블록스코프 생성

  ```javascript
  for (variable of iterables) {
      // do something
  }
  
  // 예시
  
  const fruits = ['딸기', '바나나', '메론']
  
  for (let fruit of fruits) {
      fruit = fruit + '!'
      console.log(fruit)
  }
  
  for (const fruit of fruits) {
      // fruit 재할당 불가
      console.log(fruit)
  }
  ```

- (참고) for ... in VS for ... of

  - for ... in (객체 순회 적합)
  - for ... of (배열 순회 적합)



---

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

##### Vue.js에서 다음 주소찾기 api 활용하기🎄

```vue
<template>
...
  <div class="card-text pb-5">
    <input type="text" class="card-input mx-4" v-model="info.addr" id="sample6_address">
    <input type="text" class="card-input mx-4" v-model="info.zip_code" id="sample6_postcode">
    <input type="button" @click="findAddr" value="주소찾기">
  </div>
...
</template>

<script>
...

  methods: {
    findAddr() {
      new window.daum.Postcode({
          oncomplete: (data) => {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
              if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                  this.info.addr = data.roadAddress;
              } else { // 사용자가 지번 주소를 선택했을 경우(J)
                  this.info.addr = data.jibunAddress;
              }
              this.info.zip_code = data.zonecode

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
              document.getElementById('sample6_postcode').value = data.zonecode;
              document.getElementById("sample6_address").value = this.info.addr;
          }
      }).open();
  }

...
</script>
```

- 기능
  - 주소찾기 버튼 클릭시 주소 검색 팝업창 오픈
  - 검색 후 선택한 주소 input 태그로 불러오기
  - v-model로 연동하여 연결



- 포인트
  - [다음 주소 검색 api](https://postcode.map.daum.net/guide) ... 친절하게 설명 됨
  - this. 을 사용하기 위해
    - `oncomplete: function(data) {...}`을 `oncomplete:(data) => {...}`으로 변경



---

##### vue router에 params 적용시 발생하는 `Uncaught (in promise) Error: Missing required param "username"` 해결하기🎋

- 문제 발생 포인트

  - router-link를 사용할 때 params로 getters에 저장된 currentUser.username을 전송하려 했음
    - 개발자 도구 vue-devtools에는 currentUser가 채워져있음...
  - 하지만 DOM이 그려질 때 이를 받아오는 것보다 탭이 먼저 렌더링되어 에러 발생
  - created, mounted, watch 등 여러 수단을 써보았지만 해결 안됨
  - `console.log() 찍으면 2회가 찍히는데 처음엔 undefined 다음엔 username이 정확하게 찍힘`
    - 이를 통해 '두 번' 불러와지고 그 사이에 오류가 뜨는구나 유추
  
- 해결 방법

  - v-if 문을 걸어서 username이 존재하는지 여부를 판단하고 router-link를 렌더링하는 방식을 채택

    ```vue
    <template>
      ...
        <div class="new-box" v-if="!!username">
          <router-link :to="{ name: 'myplant', params: { username } }">
              <button class="btn">내 식물</button>
          </router-link>
        </div>
      ...
    </template>
    ```




---

##### select tag에서 값(option)이 선택되었을 때 서버로 요청보내기(@change 핸들러 사용)🎍

```vue
<template>
  <select class="sido mr-1" @change="beforeFetchSigungu($event)">
    <option selected>지역을 선택해주세요</option>
    <option v-for="(loc) in sido" :key="loc.pk" :value="loc.sido">{{ loc.sido }}</option>
  </select>
</template>

<script>
...    
  data() {
    return {
      info: {
          sido = ''
      }  
    }
  } 
...
  methods: {
    beforeFetchSigungu(event) {
      const sido = event.target.value
      this.info.sido = sido
    },      
  },
...      
</script>
```

- 기능
  - 주소를 검색할 때 드랍박스에서 지역(시, 도)을 선택하고, 동네(시, 군, 구)를 고르는 형식
  - 고를 때마다 data의 info에 담아주어 나중에 요청을 보낼 예정
- 포인트
  - select 태그의 option은 @click이 먹히지 않는다...
    - 처음에 이 방식으로 시도했으나 함수자체가 실행이 되지않아 당황
  - change 핸들러를 통해 event를 받아오고
  - console.log를 찍어가며 어디에 원하는 데이터가 있는지 파악해야 함



---

##### script에서 store로 dispatch(함수) 실행 시 데이터 넘길 때 주의사항🎎

- 데이터는 객체 형태로 넘겨야 한다!

  - 파이썬처럼 중괄호로 감싸면 객체로 인식하지 않음
  - 따로 변수에 할당하기

- 잘못된 예시들

  ```vue
  <script>
  export default {
    data() {
      retrun {
        info: {
          ...블라블라
        }
      }
    }
    ...
    methods: {
      ...
      beforeUpdateLeaf82(credentials) {
          ...
          this.updateLeaf82(credentials, this.info)
      // credentials는 template에서 받는 값, this.info는 data 에 저장된 값
      }
    },
  </script>
  ```

  ```vue
  <script>
  export default {
    data() {
      retrun {
        info: {
          ...블라블라
        }
      }
    }
    ...
    methods: {
      ...
      beforeUpdateLeaf82(credentials) {
          ...
          this.updateLeaf82({credentials, this.info})
      // credentials는 template에서 받는 값, this.info는 data 에 저장된 값
      // 중괄호 해봤자 넘어가서 어차피 객체로 인식못함  
      }
    },
  </script>
  ```

- 좋은 예시

  ```vue
  <script>
  export default {
    ...
    methods: {
      ...
      beforeUpdateLeaf82(credentials) {
          ...
          const updateInfo = {
            credentials,
            info: this.info
          }
          this.updateLeaf82(updateInfo)
      }
    },
  </script>
  ```



---

### BE🌅
