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

##### 문자열로 저장된 숫자를 인트로 반환하기 및 숫자인지 판별하기🎁

```javascript
const a = '100000'

// 문자열 -> 인트
parseInt(a)

// 들어오는 값이 인트인가?
Number.isInteger(a)  //false
Number.isInteger(parseInt(a))  //true
```

- 사용처

  - 가격을 입력할 때 문자열로 숫자를 저장하기로 되어있을 때,

    - 최대 가격이 정해져있을 때 최대값 넘는지 판별
    - 숫자 판별 후 문자열이면 alert로 '숫자만 입력가능합니다.' 띄어주기




---

##### 객체(Object)에서 속성 제거(delete)🎗

```javascript
var sampleObject = {
    id : '12345',
    plantname : 'flower',
    price : '10000'
}

console.log(sampleObject)
// {id: '12345', plantname: 'flower', price: '10000'}

delete sampleObject.price
console.log(sampleObject)
// {id: '12345', plantname: 'flower'}
```

- 사용처
  - 검색할 때 data 값에 빈 문자열이나 null 값을 넣는데, api를 이용할 때에 빈 값은 채워 넣지 않음
  - 빈 값을 제거하고 params에 할당하여 넘김



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

##### search-bar 검색버튼 input tag 안에 들어간 것 같은 효과 주기🎐

```vue
<template>
...
  <div class="search-box col-sm-8 col-md-4 col-12 d-flex justify-content-center">
    <input class="search-input" type="text" v-model="info.plantname" placeholder="식물명을 입력해주세요" @keyup.enter="beforeSearch()">        
    <button class="search-btn" type="submit" @click="beforeSearch()">
      <span class="material-symbols-outlined d-flex align-items-center justify-content-center">search</span>
    </button>
  </div>
...
</template>

<style>
.search-box {
  position: relative;
  border-radius: 0.5rem;
  box-shadow: 0rem 0rem 1rem #d2d2d2;
}

.search-input {
  width: 90%;
  height: 2.5rem;
  border: 0;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  font-size: 1.2rem;
}

.search-btn {
  width: 10%;
  border: 0;
  background-color: white;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  color: black;
}
</style>
```

- 효과
  - 서치바에 그림자를 두어 입체감 주기
    - 최상단 div에 주고 싶은 border-radius와 box-shadow  입력
  - 인풋 좌측만 border-radius
  - 버튼 우측만 border-radius
  - 버튼 배경 색 white로 변경



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

- **해결방법(추가, 쉬움)**

  - currentUser를 불러올 수는 있으나 특정 깊이 이상으로 가면 불러오지 못함
  - state나 getters에 원하는 값을 얕게 작성

  ```js
  import router from '@/router'
  import axios from 'axios'
  import drf from '@/api/drf'
  
  export const Account = {
    state: {
  	...
      currentUser: {},
      username: '',
      ...
    },
  
    getters: {
  	...
      currentUser: state => state.currentUser,
      username: state => state.username,
      ...
    },
  
    mutations: {
      ...
      SET_CURRENT_USER: (state, user) => {
        state.currentUser = user
        state.username = user.username
      },
      ...
    },
  
    actions: {
      ...
  }
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

##### vuex를 사용할 때 created를해도 getters를 받아오지 못할 때 해결법(`watch 사용`)🎑

```vue
<script>
import { mapGetters , mapActions } from 'vuex'

export default {
  name: 'Leaf82Detail',
  data() {
    return {
      user: {
      },
      addr: {
      },
      info: {
        id: null,
        user: {
          nickname: '',
          photo: '',
          pk: null,
          username: '',
        },
        addr: {
          id: null,
          sido: '',
          sigungu: '',
        },
        plantname: '',
        photo: '',
        created_at: '',
        content: '',
        price: '',
        category_class: '',
        status_class: '',
        posting_addr: null
      },
      deleteInfo: {
        username: this.$route.params.username,
        posting_addr: this.$route.params.posting_addr
      }
    }
  },
  methods: {
    ...mapActions(['deleteLeaf82']),
    fillData() {
      this.user = this.leaf82Detail.user
      this.addr = this.leaf82Detail.addr
      this.info = this.leaf82Detail
      this.info.price = this.info.price.toLocaleString('ko-KR')
    }
  },
  computed: {
    ...mapGetters(['leaf82Detail', 'currentUser']),
  },
  watch: {
    leaf82Detail() {
      this.fillData()
    }
  }
}
</script>
```

- 발생한 에러
  - created때 상위components에서 fetchLeaf82Detail actions를 호출해 getters의  leaf82Detail을 채워줬으나, 받지 못함..
  - 콘솔창에 오류 발생, 렌더링 하면 데이터 날라감
- 해결책
  - `watch`
    - getters의 leaf82Detail값을 쳐다보고 있다가 변화가 발생하면,
    - data에 준비한 값을 채우고 그 값을 이용해 template에 띄어주는 방식



---

##### socket.io를 활용해서 채팅 구현하기🧧(미완성)



---

##### 이미지 업로드 시 보내고 받는 방법🎀

- 기능
  
  - 사진 선택 시 이미지를 우선적으로 보여줌
    - 사용자가 접근 후 모든 파일로 이동 가능(이미지가 아니라면 alert로 막아야 함)
  
  - 사진이 업로드 되기 전에는 기본이미지 보여주기
    - 최초에는 S3에서 생성된 url을 초기값으로 설정
  - 사진이 업로드 되면서 blob url 생성 후 대체 이미지 보여주기
    - 이미지와 글 클릭하면 파일 첨부 기능(라벨로 묶자)
    - 미리보기 변수가 필요하겠다!
  - 사진 백엔드로 보내기
    - 백엔드에서 S3로 파일 변환 후 이미지 url 저장
  
- 코드

  ```vue
  <template>
  ...
    <div class="left">
      <div class="img-box d-flex justify-content-center">
        <img :src="preview" alt="등록될 사진입니다.">
      </div>
      <div class="img-add-box d-flex justify-content-center pt-2">
        <label for="pic-file" class="img-add mb-0">
          <span class="material-symbols-outlined">
            photo_camera
          </span>
          <span>
            사진 변경하기
          </span>
        </label>
        <input type="file" id="pic-file" @change="onInputImage()" accept="image/*" ref="leaf82Image">
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions , mapGetters } from 'vuex'
  
  export default {
    name: 'Leaf82NewForm',
    data() {
      return {
        credentials: {
          // 사진을 담아 보낼 변수 photo
          photo: '',
          ...
        },
        // 이미지 미리보기를 위한 변수
        // 디폴트는 백에서 S3로 생성한 이미지 url
        // 밑에서 첨부된 사진이 바뀔 때 이미지 url을 만들어 바꿔줄 예정
        preview: 'https://plantinum.s3.ap-northeast-2.amazonaws.com/static/monstera.jpg'
      }
    },
    methods: {
      ...mapActions(['fetchSido', 'fetchSigungu', 'createLeaf82']),
      ...
      beforecreateLeaf82(credentials) {
        if (credentials.plantname === '') {
          alert('이름을 입력해주세요.')
        } else if (credentials.price === '' || !Number.isInteger(parseInt(credentials.price))) {
          alert('가격을 확인해주세요.')
        } else if (credentials.sigungu === '') {
          alert('주소를 선택해주세요.')
        } else if (credentials.content === '') {
          alert('식물을 소개해주세요')
        } else {
          this.createLeaf82(credentials)
        }
      },
      onInputImage() {
        // data 값에 있는 photo 변수를 ref를 통해 이미지 파일에 접근
        this.credentials.photo = this.$refs.leaf82Image.files[0]
        // 임시 이미지 url 생성 (blob으로 없어지는 임시 데이터)
        const url = URL.createObjectURL(this.credentials.photo)
        // 이미지를 로드해주는 preview 변수에 담아줌
        this.preview = url
      },
    },
    ...
  }
  </script>
  ```

- 포인트

  - 이미지 미리보기 url 만들기 : `URL.createObjectURL(사진 파일)`
  - 이미지 미리보기를 위한 data 값 지정 : `preview`
  - 사진 선택 시 우선적으로 이미지 파일 선택하게 하기 : `accept="image/*"`



---

##### router-link로 이동할 때 스크롤 위치 최상단으로 이동하기(기본값으로는 스크롤 위치로 이동)🎞

```js
// src/router/index.js

// 함수 추가 전
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


// 함수 추가 후
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(){
    return { top: 0 }
  },
});
```

- 문제점
  - 스크롤이 내려가 있는 상태에서 라우터를 통해 다른 페이지로 이동
    - 스크롤 위치가 그대로 페이지가 바뀜
- 해결
  - 페이지 이동 시 스크롤이 최상단으로 올라감



---

##### viewport 너비를 기준으로 화면 스타일 적용🎟

- 기능
  - 휴대폰 사이즈일때 배경 이미지 변경

```vue
<template>
<div class="boxes">
    <!-- first box를 바인딩해서 조건에따라 값을 변경 -->
    <div :class="firstBox">
      ...
    </div>
    ...
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      // 초기 너비는 윈도우의 이너 너비
      width: window.innerWidth,
      // 기본값으로는 'first-box' 설정
      firstBox: 'first-box',
    }
  },
  methods: {
    // 현재 너비를 수정해줄 함수
    handleResize() {
      this.width = window.innerWidth;
    },
    // 너비값이 바뀔 때마다 실행시켜줄 함수
    mobileOrPc() {
      if (this.width <= 576) {
        this.firstBox = 'first-box-mobile'
      } else {
        this.firstBox = 'first-box'
      }
    },
  },
  // 시작화면이 모바일인지 피씨인지 판별하기위해 초기 설정
  created() {
    this.mobileOrPc()
  },
  // 마운티드에 설정
  mounted() {
    window.addEventListener('resize', this.handleResize);
	},
  // 비포언마운트에 설정
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  //width 값이 바뀔 때마다 모바일인지 피씨인지 판별하는 함수 실행
  watch: {
    width() {
      this.mobileOrPc()
    }
  }
}
</script>

<style>
.first-box {
  height: 1117px;
  background: url("../assets/HomeView/background_img.jpg") bottom left;
  background-size: cover;
}

.first-box-mobile {
  height: 800px;
  background: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('../assets/HomeView/main_pic_1.jpg') bottom left;
  background-size: cover;
}
</style>
```



---

#### PERFORMANCE🎫

##### 성능 검사 dev tool `Lighthouse`🎠

- performance 높이기 위해 필요한 것

  - 요청 수 줄이기
  - 이미지 최적화
  - CDN 사용
  - 모바일 코드 먼저 짜기
  - CSS, JS, HTML 파일 줄이기
  - 비동기 처리
  - 플러그인 줄이기
  - 웹사이트 캐시 사용하기

  ...



---

##### vue cli 사용시 font는 app.vue에 걸어서 사용하는 것 보다 각 .vue파일에 적용하는 것이 성능적으로 더 좋음🎡

app.vue => 31%

HomeView.vue => 58%



---

##### performance 고려 사항 우선순위🎠

1. 이미지, 동영상 등 파일 크기 조절
2. CSR 보다는 SSR로 페이지 구성하기
3. 사용하지 않는 데이터는 사용할 때 받아오기
   - props 등 데이터 간소화
   - components 이용시 적절한 배분 고려 필요

4. 웹팩 공부해서 적용하기



---

#### UI/UX🎡

##### 등록버튼은 우측하단이 국룰!🎢

##### 검색 및 필터 활용시 

- 로직 명확하게(오류 없이)
- 검색 및 필터는 한곳에 모아서 모듈화(유저는 자기가 어떤 필터를 걸었는지 기억하지 않는다)
- reset 버튼 추가 고려!



---

### BE🌅
