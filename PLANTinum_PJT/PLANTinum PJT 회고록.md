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

### BE🌅
