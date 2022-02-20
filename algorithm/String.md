# String

### 1. 문자열

### 2. 패턴 매칭

#### - 고지식한 패턴 검색 알고리즘

#### - 카프-라빈 알고리즘

#### - KMP 알고리즘

#### - 보이어-무어 알고리즘

### 3. 문자열 암호화

### 4. 문자열 압축

---

1. 문자의 표현

- ASCII (American Standard Code fo Information)
  - 문자열을 저장하기 위한 표현이 지역별로 달랐는데 혼동을 피하기 위해 표준안 제작

- 유니코드
  - 국가 간 정보를 주고 받을 때 발생한 문제를 해결하기 위해 만든 국제 표준
  - in web
    - 8bit ~ 32bit (1 Byte * 4)
  - in windows, java
    - 16bit ~ 32bit (2 Byte * 2)
  - in unix
    - 32bit (4 Byte * 1)
- 문자열 분류

![image-20220216094449532](C:\Users\MOONYS\AppData\Roaming\Typora\typora-user-images\image-20220216094449532.png)

- [참고]

  - ```python
    # 차이가 뭘까???
    s1 = list(input())
    s2 = input()
    print(s1)
    print(s2)
    print(s1[0])
    print(s2[0])
    
    # 123  <- input
    # 123  <- input
    # ['1', '2', '3']
    # 123
    # abc  <- input
    # abc  <- input
    # a
    # a
    
    # 문자열은 접근은 가능하지만 수정은 안됨.
    s1[0] = 'd'  <- 쌉가능
    s2[0] = 'd'  <- 안댐
    
    ```

  - ```python
    # strlen() 함수 만들어 보기
    def strlen(s):
        # '\0'을 만나면 '\0'을 제외한 글자수를 리턴
        # while을 써서 함수 완성
        i = 0
        while s[i] != '\0':
            i += 1
        return i
        
    a = ['a', 'b', 'c', '\0']
    print(strlen(a))
    ```

  - 문자열 뒤집기

  ```python
  # 자기 문자열에서 뒤집는 방법이 있고 새로운 빈 문자열을 만들어 소스의 뒤에서 부터 읽어서 타겟에 쓰는 방법이 있겠따.
  # 자기 문자열을 이용할 수 있는 경우는 swap을 위한 임시 변수가 필요하며 반복 수행을 문자열 길이의 반만을 수행해야 한다.
  # 문자열 길이 9
  # 9 / 2 = 4.5
  # 4회 반복 (가운데는 냅두기)
  # 파아썬은 reverse 함수 혹은 slice notation을 이용하여 구현하면 된다.
  ```

  - 문자열 비교

  ```python
  # s1과 나머지 문자열을 ==, is로 비교한 결과를 확인
  s1 = 'abc'
  s2 = 'abc'
  s3 = 'def'
  s4 = s1
  s5 = s1[:2] + 'c'
  s6 = sq[:3]
  
  print(s1 == s2)
  print(s1 is s2)
  print(s5)
  print(s1 == s5)
  print(s1 is s5)
  print(s1 == s6)
  print(s1 is s6)
  
  # True
  # True
  # abc
  # Ture
  # False
  # True
  # True
  
  # ==은 내용만 같으면 True
  # is 는 참조에 대해서 비교 , id를 비교
  # s1과 s2는 같은 곳을 보고 있음
  # s5는 새로운 참조를 만듬
  # 그런데 슬라이싱 복사는 같은 id
  ```

  - 문자열 숫자를 정수로 변환하기

  ```python
  # int()와 같은 atoi()함수 만들기
  def atoi(s):
      i = 0
      for x in s:
          i = i*10 + ord(x)-ord('0')
      return i
  
  s = '123'
  a = atoi(s)
  print(a + 1)
  
  # ASCII 넘버
  # 0 - 48
  # 1 - 49
  # 2 - 50
  # 3 - 51

2. 패턴 매칭

- 고지식한 알고리즘(Brute Force)
  - 본문문자열을 처음부터 끝까지 차례대로 순회하면서 패턴 내의 문자들을 일일이 비교하는 방식으로 동작
  - 최악의 경우 시간 복잡도는 텍스트의 모든 위치에서 패턴을 비교해야 하므로 O(MN)이 됨



3. 