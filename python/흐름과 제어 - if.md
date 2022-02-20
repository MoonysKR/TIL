### 흐름과 제어 - if 

1. if 문

- 어떤 조건을 만족하는 경우, 명령문을 수행하기 위해 사용

- 결과는 T/F 반영
- T -> 명령문 수행 F -> 벗어남
- if 조건식 :

​			명령문(코드블록)

​			명령문(코드블록)

​			명령문(코드블록)

```python
score = 80
if score >= 60 : 
	print('%d 점' % score) # %d 문자형 포맷 코드
	print('합격입니다')
```

- 코드의 동일 수준에서의 동일 들여쓰기 주의하기

```python
score = 80
if score >= 60 : 
    result = '합격입니다.'
    print(result)
    
score = 80
if score >= 60 : result = '합격입니다.'; print(result)
    
score = 80
if score >= 60 : 
    result = '합격입니다.'; print(result)
    
    [결과]
    합격입니다.
```

- 문장의 끝을 표시하는 ; 생략 가능 / 둘 이상의 문장을 한 줄에 기술할 경우 명시적 기술

```python
result = '불합격입니다'

score = 80
if score >= 60 : 
    result = '합격입니다.'
    
print(result)

	[결과]
    합격입니다.

    
    
result = '불합격입니다'

score = 50
if score >= 60 : 
    result = '합격입니다.'
    
print(result)

	[결과]
    불합격입니다
```



2. if ~ else 문

- 어떤 조건을 만족하는 경우의 명령문과 만족하지 않았을 경우의 명령문을 상호 배타적으로 수행하고자 할 때 사용

```python
score = 80
if score >= 60 : 
    print('합격입니다.')
else:
    print('불합격입니다.')
    
    [결과]
    합격입니다.
    
score = 50
if score >= 60 : 
    print('합격입니다.')
else:
    print('불합격입니다.')
    
    [결과]
    불합격입니다.
```

- if문의 블럭과 else문의 동작은 상호 배타적
- if문과 else문의 들여쓰기는 반드시 동일해야 함

```python
score = 50
if score >= 60 : 
    print('합격입니다.')
else:
    print('불합격입니다.')
    
    [결과]
    불합격입니다.
    
    
score = 80
result = '합격입니다.' if score >= 60 else "불합격입니다."
    
    [결과]
    합격입니다.
```



3. if ~ elif ~ else 문

- 2개 이상의 다중 조건을 처리하고자 할 때 사용

```python
score = 70
if score >= 90:
    grade = 'A'
elif 80 <= score <90:
    grade = 'B'
elif 70 <= score <80:
    grade = 'C'
elif 60<= score < 70:
    grade = 'D'
else score <60
	grade ='F'
print('%d 점은 %s 등급입니다.' % (score, grade)) #정수형 score에 대한 %d 포맷 코드와 문자열 grade에 대한 %s 포맷 코드 적용

[결과]
70점은 C등급입니다.



score = int(input('점수를 입력하세요:')) #함수인자, 문자열 전달 -> 표준출력에 문자열 출력 -> 표준입력으로부터 입력된 값 반환, int를 통해 정수형으로 변경
if score >= 90:
    grade = 'A'
elif 80 <= score <90:
    grade = 'B'
elif 70 <= score <80:
    grade = 'C'
elif 60<= score < 70:
    grade = 'D'
else score <60
	grade ='F'
print('%d 점은 %s 등급입니다.' % (score, grade)) #정수형 score에 대한 %d 포맷 코드와 문자열 grade에 대한 %s 포맷 코드 적용

[결과]
점수를 입력하세요: 88
88점은 B등급입니다.
```

