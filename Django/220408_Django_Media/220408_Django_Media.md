### Handling HTTP requests

- Django에서 HTTP요청을 처리하는 방법

  1. Django shortcut functions

  2. View decorators

- Django shortcuts functions

  - django.shortcuts 패키지는 개발에 도움이 될 수 있는 여러 함수와 클래스 제공

  - render()

  - redirect()

  - get_object_or_404()

    ```python
    # views.py
    
    from django.shortcuts import get_object_or_404, render, redirect
    
    
    def detail(request, pk):
        # article = Article.objects.get(pk=pk)
        article = get_object_or_404(Article, pk=pk)  # <<<<
        context = {
            'article': article,
        }
        return render(request, 'articles/detail.html', context)
    
    
    def delete(request, pk):
        # article = Article.objects.get(pk=pk)
        article = get_object_or_404(Article, pk=pk)  # <<<<
        if request.method == 'POST':
            article.delete()
            return redirect('articles:index')
        else:
            return redirect('articles:detail', article.pk)
    
    
    def update(request, pk):
        if request.method == 'POST':
            # article = Article.objects.get(pk=pk)
            article = get_object_or_404(Article, pk=pk)  # <<<<
            form = ArticleForm(request.POST, instance=article)
            if form.is_valid():
                article = form.save()
                return redirect('articles:detail', article.pk)
        else:
            article = Article.objects.get(pk=pk)
            form = ArticleForm(instance=article)
        context = {
                'article': article,
                'form': form
        }
        return render(request, 'articles/update.html', context)
    ```

    - 모델 manager인 objects에서 get()을 호출하지만, 해당 객체가 없을 경우 DoesNotExist 예외 대신 Http 404를 raise
    - get()의 경우 조건에 맞는 데이터가 없을 경우 예외를 발생시킴
      - 코드 실행 단계에서 발생한 예외 및 에러에 대해서 브라우저는 http status code 500으로 인식함
      - `상황에 따라 적절한 예외처리`를 하고 클라이언트에게 `올바른 에러 상황을 전달하는 것` 또한 개발의 중요한 요소 중 하나

  - get_list_or_404()

- Django View decorators

  - Django는 다양한 HTTP 기능을 지원하기 위해 view함수에 적용할 수 있는 여러 데코레이터를 제공

  - [참고] Decorator(데코레이터)
    - 어떤 함수에 기능을 추가하고 싶을 때, 해당 함수를 수정하지 않고 기능을 연장해주는 함수
    - 즉, 원본 ㅎ마수를 수정하지 않으면서 추가 기능만을 구현할 때 사용
    
  - Allowed HTTP methods
    - 요청 method에 따라 view함수에 대한 엑세스를 제한
    - 요청이 조건을 충족시키지 못하면 HttpResponseNotAllowed를 return (405 Method Not Allowed)
    - require_http_methods(), require_POST(), require_safe(), ~~require_GET()~~
    
  - require_http_methods()
    - view함수가 특정한 method 요청에 대해서만 허용하도록 하는 데코레이터
    
    ```python
    # views.py
    
    from django.views.decorators.http import require_http_methods  # <<<<
    
    @require_http_methods(['GET', 'POST'])  # <<<<
    def create(request):
        ...
    
    
    @require_http_methods(['GET', 'POST'])  # <<<<
    def update(request, pk):
        ...
    ```
    
  - require_POST()
    - view 함수가 POST method 요청만 승인하도록 하는 데코레이터
    
    ```python
    # views.py
    
    from django.views.decorators.http import require_http_methods, require_POST, require_safe  # <<<<
    
    @require_POST  # <<<<
    def delete(request, pk):
        # article = Article.objects.get(pk=pk)
        article = get_object_or_404(Article, pk=pk)
        article.delete()
        return redirect('articles:index')
        # if request.method == 'POST':
        #     article.delete()
        #     return redirect('articles:index')
        # else:
        #     return redirect('articles:detail', article.pk)
    ```
    
  - require_safe()
    - view 함수가 GET 및 HEAD method만 허용하도록 요구하는 데코레이터
    - Django는 require_GET 대신 require_safe를 사용하는 것을 권장
    
    ```python
    # views.py
    
    from django.views.decorators.http import require_http_methods, require_POST, require_safe  # <<<<
    
    @require_safe  # <<<<
    def detail(request, pk):
        # article = Article.objects.get(pk=pk)
        article = get_object_or_404(Article, pk=pk)
        context = {
            'article': article,
        }
        return render(request, 'articles/detail.html', context)
    ```
  
- 결론

  - HTTP 요청에 따라 적절한 예외처리 혹은 데코레이터를 사용해 서버를 보호하고 클라이언트에게 정확한 상황을 제공하는 것의 중요성

---

### Media Files

1. Image Upload

2. Image Resizing

- Media file
  - 미디어 파일
  - 사용자가 웹에서 업로드하는 정적 파일 (user-uploaded)
  - 유저가 업로드한 모든 정적 파일
  
- Model field
  - ImageField()
    - 이미지 업로드에 사용하는 모델 필드
    - FileField를 상속받는 서브 클래스이기 때문에 FileField의 모든 속성 및 메서드를 사용 가능하며, 더해서 사용자에 의해 어보드 된 객체가 유효한 이미지인지 검사함
    - ImageField 인스턴스는 최대 길이가 100자인 문자열로 DB에 생성되며, max_length 이자를 사용하여 최대 길이를 변경할 수 있음
    - [주의] 사용하려면 반드시 [Pillow](https://pillow.readthedocs.io/en/latest/) 라이브러리가 필요
    
  - FileField()
    - 파일 업로드에 사용하는 모델 필드
    - 2개의 선택인자를 가지고 있음
      1. upload_to
      2. ~~storage~~
    
  - ImageField 작성
    - upload_to='images/'
      - 실제 이미지가 저장되는 경로를 지정
    - blank=True
      - 이미지 필드에 빈 값(빈 문자열)이 허용되도록 설정 (이미지를 선택적으로 업로드 할 수 있도록)
    
    ```python
    # models.py
    
    from django.db import models
    
    # Create your models here.
    class Article(models.Model):
        title = models.CharField(max_length=10)
        content = models.TextField()
        created_at = models.DateTimeField(auto_now_add=True)
        updated_at = models.DateTimeField(auto_now=True)  # <<<<
        image = models.ImageField(upload_to='images/', blank=True)
    
        def __str__(self):
            return self.title
    ```
    
  - `upload_to` argument
  
    - 업로드 디렉토리와 파일이름을 설정하는 2가지 방법을 제공
      1. 문자열 값이나 경로 지정
         - 파이썬의 strtime() 형식이 포함될 수 있으며, 이는 파일 업로드 날짜/시간으로 대체됨
         
         ```python
         # models.py
         
         class MyModel(models.Model):
             # MEDIA_ROOT/uploads/ 경로로 파일 업로드
             upload = models.FileField(uploade_to='uploads/')
             # or
             # MEDIA_ROOT/uploads/2022/01/01/ 경로로 파일 업로드
             upload = models.FileField(upload_to='uploads/%Y/%m/%d/')
         ```
         
         - [참고] time 모듈의 strftime()
           - time.strftime(format[, t])
           - 날짜 및 시간 객체를 문자열 표현으로 변환하는데 사용됨
           - 하나이상의 형식화된 코드 입력을 받아 문자열 표현을 반환
         
      2. 함수 호출
         - 반드시 2개의 인자(instance, filename)를 사용함
           1. instance
              - FileField가 정의된 모델의 인스턴스
              - 대부분 이 객체는 아직 데이터베이스에 저장되지 않았으므로 PK값이 아직 없을 수 있음
           2. filename
              - 기존 파일에 제공된 파일 이름
           
           ```python
           # models.py
           
           def articles_image_path(instance, filename):
               #'MEDIA_ROOT/image_<pk>/' 경로에 '<filename>' 이름으로 업롣
               return f'image_{instance.pk}/{filename}'
           
           
           class Article(models.Model):
               image = models.ImageField(upload_to=articles_image_path)
           ```
  
  - Model field option -"blank"
  
    - 기본 값 : False
    - True인 경우 필드를 비워둘 수 있음
      - DB에는 ''(빈 문자열)이 저장됨
    - 유효성 검사에서 사용됨(is_valid)
      - 모델 필드에 blank=True를 작성하면 from 유효성 검사에서 빈 값을 입력할 수 있음
  
  - Model filed option - "null"
  
    - 기본 값 : False
    - True인 경우 장고는 빈 값에 대해 DB에 NULL로 저장
    - `주의 사항`
      - CharFiled, TextField와 같은 `문자열 기반 필드에는 사용하는 것을 피해야 함 (이미지 필드도 문자열)`
      - 문자열 기반 필드에 True로 설정 시 '데이터 없음(no data)'에 "빈문자열(1)"과 "NULL(2)"의 2가지 가능한 값이 있음을 의미하게 됨
      - 대부분의 경우 "데이터 없음"에 대해 두 개의 가능한 값을 갖는 것은 중복되는 것이며, 장고는 NULL이 아닌 빈문자열을 사용하는 것이 규칙
  
  - blank & null  비교
  
    - blank
      - Validation-related
    - null
      - Database-related
    - 문자열 기반 및 비문자열 기반 필드 모두에 대해 null option은 DB에만 영향을 미치므로, form에서 빈 값을 허용하려면 `blank=True`를 설정해야함
  
  - ImageField(or FileField)를 사용하기 위한 몇 가지 단계
    1. seetings.py 에 `MEDIA_ROOT`, `MEDIA_URL` 설정
    2. `upload_to` 속성을 정의하여 업로드된 파일에 사용한 MEDIA_ROOT의 하위 경로를 지정
    3. 업로드 된 파일의 경로른 장고가 제공하는 `'url'`속성을 통해 얻을 수 이씀
  
- MEDIA_ROOT

  - 사용자가 업로드한 파일(미디어 파일)들을 보관할 디렉토리의 절대 경로
  - 장고는 성능을 위해 업로드 파일은 데이터 베이스에 저장하지 않음
    - 실제 데이터 베이스에 저장되는 것은 `파일의 경로`
  - [주의] MEDIA_ROOT는 STATIC_ROOT와 반드시 다른 경로로 지정해야함

- MEDIA_URL

  - MEDIA_ROOT에서 제공되는 미디어를 처리하는 URL
  - 업로드된 파일의 주소(URL)를 만들어 주는 역할
    - 웹 서버 사용자가 사용하는  public URL
  - 비어있지 않은 값으로 설정한다면 반드시 slash(/)로 끝나야 함
  - [주의] MEDIA_URL은 STATIC_URL과 반드시 다른 경로로 지정해야함

- 개발 단계에서 사용자가 업로드 한 파일 제공하기

  - settings.MEDIA_URL
    - 업로드 된 파일의 URL
  - settings.MEDIA_ROOT
    - MEDIA_URL을 통해 참조하는 파일의 실제 위치

- 이미지 업로드 (CREATE)

  ```python
  # create.html
  
  {% extends 'base.html' %}
  
  
  {% block content %}
    <h1>NEW</h1>
    <hr>
    <form action="{% url 'articles:create' %}" method="POST" enctype="multipart/form-data">
      {% csrf_token %}
      {{ form.as_p }}
      {% comment %} <label for="title">Title: </label>
      <input type="text" id="title" name="title"><br>
      <label for="content">Content: </label>
      <textarea name="content" id="content" cols="30" rows="10"></textarea> {% endcomment %}
      <input type="submit">
    </form>
    <a href="{% url 'articles:index' %}">back</a>
  {% endblock content %}
  ```

  ```python
  # views.py
  
  def create(request):
      if request.method == 'POST':
          form = ArticleForm(request.POST, request.FILES)
          if form.is_valid():
              article = form.save()        
              return redirect('articles:detail', article.pk)
      else:
          form = ArticleForm()
      context = {
          'form': form
      }
      return render(request, 'articles/create.html', context)
  ```

  - form 태그 - enctype(인코딩) 속성
    1. mulipart/form-data
       - 파일/이미지 업로드 시에 반드시 사용해야 함 (전송되는 데이터의 형식을 지정)
       - \<input type="file">을 사용할 경우에 사용
    2. ~~application/x-www-form-urlencoded~~
       - ~~(기본값) 모든 문자 인코딩~~
    3. ~~text/plain~~
       - ~~인코딩을 하지 않은 문자 상태로 전송~~
       - ~~공백은 '+' 기호로 변환하지만, 특수 문자는 인코딩 하지 않음~~~~
  - input 요소 - accept 속성
    - 입력 허용할 파일 유형을 나타내는 문자열
    - 쉼표로 구분된 "고유 파일 유형 지정자 (unique file type specifiers)"
    - `파일을 검증하는 것은 아님`
      - accep 속성 값을 image라고 하더라도 비디오나 오디오 및 다른 형식 파일을 제출할 수 있음)
    - 고유파일 유형 지정자
      - \<input type="file">에서 선택할 수 있는 파일의 종류를 설명하는 문자열

- 이미지 업로드 (READ)

  ```django
  {% extends 'base.html' %}
  
  {% block content %}
    <h1>DETAIL</h1>
    <h3>{{ article.pk }}번째 글</h3>
    {% if article.image %}
      <img src="{{ article.image.url }}" alt="{{ article.image }}">
    {% endif %}
    <hr>
    <p>제목 : {{ article.title }}</p>
    <p>내용 : {{ article.content }}</p>
    <p>작성 시각 : {{ article.created_at }}</p>
    <p>수정 시각 : {{ article.updated_at }}</p>
    <hr>
    <a href="{% url 'articles:update' article.pk %}">수정</a>
    <form action="{% url 'articles:delete' article.pk %}" method="POST">
      {% csrf_token %}
      <input type="submit" value="삭제">
    </form>
    <a href="{% url 'articles:index' %}">back</a>
  {% endblock content %}
  
  ```

  - article.image.url
    - 업로드 파일의 경로
  - article.image
    - 업로드 파일의 파일 이름
  - STATIC_URL과 MEDIA_URL
    - static, media 파일 모두 서버에 요청해서 조회하는 것
      - 서버에 요청하기 위해서는 url이 필요
  - 누군가 동일한 이름의 파일을 업로드 한다면, 이름에 임의의 해쉬값을 부여해서 바꿈

- 이미지 업로드 (UPDATE)

  ```python
  # views.py
  
  def update(request, pk):
      if request.method == 'POST':
          # article = Article.objects.get(pk=pk)
          article = get_object_or_404(Article, pk=pk)    
          form = ArticleForm(request.POST, request.FILES, instance=article)
          if form.is_valid():
              article = form.save()
              return redirect('articles:detail', article.pk)
      else:
          article = Article.objects.get(pk=pk)
          form = ArticleForm(instance=article)
      context = {
              'article': article,
              'form': form
      }
      return render(request, 'articles/update.html', context)
  ```

  ```django
  # update.html
  
  {% extends 'base.html' %}
  
  {% block content %}
    <h1>UPDATE</h1>
    <hr>
    <form action="{% url 'articles:update' article.pk %}" method="POST"  enctype="multipart/form-data">
      {% csrf_token %}
      {{ form.as_p }}
      <input type="submit">
    </form>
    <a href="{% url 'articles:detail' article.pk %}">BACK</a>
  {% endblock content %}
  ```

  - 이미지 수정하기
    - 이미지는 바이너리 데이터(하나의 덩어리)이기 때문에 텍스트처럼 일부만 수정하는 것은 불가능
    - 때문에 새로운 사진으로 덮어 씌우는 방식을 사용

- 이미지 Resizing

  - 실제 원본 이미지를 서버에 그대로 업로드 하는 것은 서버의 부담이 큰 작업
  - \<img> 태그에서 직접 사이즈를 조정할 수 있지만(width와 height 속성 사용), 업로드 될 때 이미지 자체를 resizing 하는 것을 고려하기
  - django-imagekit 라이브러리 활용
    - django-imagekit 설치
    - INSTALLED_APPS에 추가

