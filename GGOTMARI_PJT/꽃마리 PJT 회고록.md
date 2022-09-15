# 꽃마리 PJT 회고록

[toc]

## 안된점들 😥

### FE

#### Javascript



---

#### React js



---

#### Next js

##### Link와 a태그를 이용하여 링크 구성하기

- 문제 상황

  - Link태그 사용 후  a 태그 없이 내용 작성

    ```html
    <Link href="abcd">
      <BsHeart className="w-full" />  
    </Link>
    ```

  - 에러 발생

    ```
    Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
    ```

- 해결 방법

  ```html
  <Link href="abcd">
    <a>
      <BsHeart className="w-full" />
    </a>  
  </Link>
  ```

  

---

#### Performance



---

#### UI/UX



---

### BE