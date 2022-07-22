# PLANTinum PJT 회고록

[toc]

---

### 안된점들😢

---

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

