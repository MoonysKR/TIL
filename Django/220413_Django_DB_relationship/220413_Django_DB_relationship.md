# DB02

- Model Relationship 1
- Customizing authentication in Django
- Model Relationship 2

---

### Model Relationship 1

- Foreign Key

  - Foreign Key 개념

    - 외래 키 (외부 키)
    - 관계형 데이터베이스에서 한 테이블의 필드 중 다른 테이블의 행을 식별할 수 있는 키
    - 참조하는 테이블 속성(필드)에 해당하고, 이는 참조되는 테이블의 기본키(Primary Key)를 가리킴
    - 참조하는 테이블의 외래 키는 참조되는 테이블 행 1개에 대응됨
      - 이 때문에  참조하는 테이블에서 참조되는 테이블의 존재하지 않는 행을 참조할 수 없음
    - 참조하는 테이블의 행 여러 개가 참조되는 테이블의 동일한 행을 참조할 수 있음

    ![image-20220413090758653](220413_Django_DB_relationship.assets/image-20220413090758653.png)

  - Foreign Key 특징

    - 키를 사용하여 부모 테이블의 유일한 값을 참조 (참조 무결성)
    - 외래 키의 값이 반드시 부모 테이블의 기본 키일 필요는 없지만 유일한 값이어야 함
    - [참고] 참조 무결성
      - 데이터 베이스 관계 모델에서 관련된 2개의 테이블 간의 일관성을 말함
      - 외래 키가 선언된 테이블의 외래 키 속성(열)의 값은 그 테이블의 부모가 되는 테이블의 기본 키 값으로 존재해야 함

  - `ForeignKey` field

    - A many-to-one relationship
    - 2개의 위치 인자가 반드시 필요
      1. 참조하는 model class
      2. on_delete 옵션
    - migrate 작업 시 필드 이름에 _id를 추가하여 데이터 베이스 열 이름을 만듦
    - [참고] 재귀 관계 (자신과 1:N)

    ```python
    # articles/models.py
    
    class Comment(models.Model):
        article = models.ForeignKey(Article, on_delete=models.CASCADE)
        content = models.CharField(max_length=200)
        created_at = models.DateTimeField(auto_now_add=True)
        updated_at = models.DateTimeField(auto_now=True)
    
        def __str__(self):
            return self.content
    ```

  - `ForeignKey` arguments - '`on_delete`'

    - 외래 키가 참조하는 객체가 사라졌을 때 외래 키를 가진 객체를 어떻게 처리할 지를 정의
    - Database Integreity(데이터 무결성)을 위해서 매우 중요한 설정
    - on_delete 옵션에 사용 가능한 값들
      - CASCADE : 부모 객체 (참조된 객체)가 삭제 됐을 때 이를 참조하는 객체도 삭제
      - ~~PROTECT~~
      - ~~SET_NULL~~
      - ~~SET_DEFAULT~~
      - ~~SET()~~
      - ~~DO_NOTHING~~
      - ~~RESTRICT~~

  - [참고] 데이터 무결성

    - 데이터의 정확성과 일관성을 유지하고 보증하는 것을 가리키며, 데이터베이스나 RDBMS 시스템의 중요한 기능임
    - 무결성 제한의 유형
      1. 개체 무결성(Entity integrity)
         - PK의 개념과 관련
         - 모든 테이블이 PK를 가져야 하며 PK로 선택된 열은 고유한 값이어야 하고 빈 값은 허용치 않음을 규정
      2. **참조 무결성(Referential integrity)**
         - **FK(외래 키) 개념과 관련**
         - **FK 값이 데이터 베이스의 특정 테이블의 PK값을 참조하는 것**
      3. 범위(도메인) 무결성 (Domain integrity)
         - 정의된 형식(범위)에서 관계형 데이터베이스의 모든 컬럼이 선언되도록 규정

  - 데이터베이스의 ForeignKey 표현

    - 만약 ForeignKey 인스턴스를 abcd로 생성했다면 abcd_id로 만들어짐
    - 하지만 명시적인 모델관계 파악을 위해 참조하는 클래스 이름의 소문자(단수형)로 작성하는 것이 바람직함 (1:N)  (M:N을 복수형으로 표현)

  - **1:N 관계 related manager**

    - 역참조('comment_set')
      - Article(1) -> Comment(N)
      - article.comment 형태로는 사용할 수 없고, article`.comment_set` manager가 생성됨
      - 게시글에 몇 개의 댓글이 작성되었는지 Django ORM이 보장할 수 없기 때문
        - article은 comment가 있을 수도 있고, 없을 수도 있음
        - `실제로 Article 클래스에는 Comment와의 어떠한 관계도 작성되어 있지 않음`
    - 참조('article')
      - Comment(N) -> Aritlce(1)
      - 댓글의 경우 어떠한 댓글이든 반드시 자신이 참조하고 있는 게시글이 있으므로, comment.article과 같이 접근할 수 있음
      - 실제 ForeignKey 또한 Comment 클래스에서 작성됨

  - `ForeignKey` arguments = '`related_name`'    // <u>M:N에서 주로 바꾸니 1:N에서는 사용하지 않는 것을 권장</u>

    - 역참조 시 사요할 이름 ('model_set' manager)을 변경할 수 있는 옵션

    

    - 위와같이 변경하면 article.comment_set은 더이상 사요할 수 없고, `article.comments`로 대체됨
    - [주의] 역참조 시 사용할 이름 수정 후, migration 과정 필요

- Comment CREATE

  - CommentForm 작성

  ```python
  # articles/forms.py
  
  from django import forms
  from .models import Article, Comment
  
  
  class ArticleForm(forms.ModelForm):
  	...
  
  
  class CommentForm(forms.ModelForm):
  
      class Meta:
          model = Comment
          fields = '__all__'
  ```

  ```python
  # articles/views.py
  
  from .forms import ArticleForm, CommentForm
  
  @require_safe
  def detail(request, pk):
      article = get_object_or_404(Article, pk=pk)
      comment_form = CommentForm()
      context = {
          'article': article,
          'comment_form': comment_form,
      }
      return render(request, 'articles/detail.html', context)
  ```

  ```django
  # articles/detail.html
  
  {% extends 'base.html' %}
  
  {% block content %}
    <h1>DETAIL</h1>
    ...
    <hr>
    <form action="" method="POST">
      {% csrf_token %}
      {{ comment_form }}
      <input type="submit">
    </form>
  {% endblock content %}
  ```

  - 수정필요!!

  ![image-20220413103352557](220413_Django_DB_relationship.assets/image-20220413103352557.png)

  ```python
  # articles/forms.py
  
  from django import forms
  from .models import Article, Comment
  
  
  class ArticleForm(forms.ModelForm):
  	...
  
  
  class CommentForm(forms.ModelForm):
  
      class Meta:
          model = Comment
          fields = ('content',)  <<<<<<<<<<<<<<<<<<<<<
  ```

  - 댓글 작성 로직

  ```python
  # articles/views.py
  
  from django.urls import path
  from . import views
  
  
  app_name = 'articles'
  urlpatterns = [
      path('', views.index, name='index'),
      path('create/', views.create, name='create'),
      path('<int:pk>/', views.detail, name='detail'),
      path('<int:pk>/delete/', views.delete, name='delete'),
      path('<int:pk>/update/', views.update, name='update'),
      path('<int:pk>/comments/', views.comment_create, name='comments_create'),    <<<<<<<<<<<<
  ]
  ```

  ```django
  # articles/detail.html
  
  {% extends 'base.html' %}
  
  {% block content %}
    <h1>DETAIL</h1>
  	...
    <hr>
    <form action="{% url 'articles:comments_create' %}" method="POST">
      {% csrf_token %}
      {{ comment_form }}
      <input type="submit">
    </form>
  {% endblock content %}
  ```

  - 인증된 사용자의 경우만 댓글 작성

  ```python
  # articles/views.py
  
  @require_POST
  def comment_create(request, pk):
      if request.user.is_authenticated:
          # article = Article.objects.get(pk=pk)
          article = get_object_or_404(Article, pk=pk)
          comment_form = CommentForm(request.POST)
          if comment_form.is_valid():
              comment = comment_form.save(commit=False)
              comment.article = article
              comment.save()
          return redirect('articles:detail', article.pk)
      return redirect('accounts:login')
  ```

  - The `save()` method
    - save(commit=False)
      - Create, but don't save the new instance
      - 아직 `데이터베이스에 저장되지 않은 인스턴스를 반환`
      - 저장하기 전에 `객체에 대한 사용자 지정 처리를 수행할 때` 유용하게 사용

- Comment READ

  ```python
  # articles/ viewspy
  
  from .models import Article, Comment
  
  def detail(request, pk):
      article = get_object_or_404(Article, pk=pk)
      comment_form = CommentForm()
      # 조회한 article의 모든 댓글 조회(역참조)
      comments = article.comment_set.all() 
      context = {
          'article': article,
          'comment_form': comment_form,
          'comments': comments,
      }
      return render(request, 'articles/detail.html', context)
  ```

  ```django
  # articles/detail.html
  
  {% extends 'base.html' %}
  
  {% block content %}
    <h1>DETAIL</h1>
    ...
    <hr>
    <h4>COMMENTS</h4>
    <ul>
      {% for comment in comments  %}
        <li>
          {{ comment.content }}
        </li>
      {% endfor %}
    </ul>
    <hr>
    ...
  {% endblock content %}
  
  ```

- Comment DELETE

  ```python
  # articles/urls.py
  
  from django.urls import path
  from . import views
  
  
  app_name = 'articles'
  urlpatterns = [
      path('', views.index, name='index'),
      path('create/', views.create, name='create'),
      path('<int:pk>/', views.detail, name='detail'),
      path('<int:pk>/delete/', views.delete, name='delete'),
      path('<int:pk>/update/', views.update, name='update'),
      path('<int:pk>/comments/', views.comment_create, name='comment_create'),
      path('<int:article_pk>/comments/<int:comment_pk>/delete', views.comment_delete, name='comment_delete'),    <<<<<<<<<<<<<<<<<<
  ]
  ```

  ```python
  # articles/views.py
  
  @require_POST
  def comment_delete(request, article_pk, comment_pk):
      comment = get_object_or_404(Comment, pk=comment_pk)
      # article = comment.article.pk
      # 리턴값에 article_pk가 아니라 article로 전달
      comment.delete()
      return redirect('articles:detail', article_pk)
  ```

  ```django
  # articles/detail.html
  
  {% extends 'base.html' %}
  
  {% block content %}
    <h1>DETAIL</h1>
    ...
    <hr>
    <h4>COMMENTS</h4>
    <ul>
      {% for comment in comments  %}
        <li>
          {{ comment.content }}
          <form action="{% url 'articles:comment_delete' article.pk comment.pk %}" method="POST">
            {% csrf_token %}
            <input type="submit" value="DELETE">
          </form>
        </li>
      {% endfor %}
    </ul>
    ...
  {% endblock content %}
  
  ```

  - 인증된 사용자의 경우에만 댓글 작성 및 삭제

  ```python
  # articles/views.py
  
  @require_POST
  def comment_delete(request, article_pk, comment_pk):
      if request.user.is_authenticated:
          # comment = Comment.objects.get(pk=comment_pk)
          comment = get_object_or_404(Comment, pk=comment_pk)
          # article = comment.article.pk
          # 리턴값에 article_pk가 아니라 article로 전달
          comment.delete()
          return redirect('articles:detail', article_pk)
  ```

---

### Customizing authentication in Django

- Substituting a custom User model

  - User 모델 대체하기

    - 일부 프로젝트에서는 Django의 `내장 User 모델이 제공하는 인증 요구사항이 적절하지 않을 수 있음`
      - ex) username 대신 email을 식별 토큰으로 사용하는 것이 더 적합한 사이트
    - 장고는 User를 참조하는데 사용하는 **AUTH_USER_MODEL**값을 제공하여, default user model을 `재정의(override)` 할 수 있도록 함
    - 장고는 새 프로젝트를 시작하는 경우 기본 사용자 모델이 충분하더라도, `커스텀 User 모델을 설정하는 것을 강력하게 권장`(highly recommended)
      - **단, 프로젝트의 모든 migrations 혹은 첫 migrate를 실행하기 전에 이 작업을 마쳐야 함**

  - AUTH_USER_MODEL

    - User를 나타내는데 사용하는 모델
    - 프로젝트가 `진행되는 동안 변경할 수 없음`
    - 프로젝트 시작 시 설정하기 위한 것이며, 참조하는 모델은 첫번째 마이그레이션에서 사용할 수 있어야 함
    - 기본값 : 'auth.User' (auth 앱의 User 모델)
    - [참고] 프로젝트 중간(mid-project)에 AUTH_USER_MODEL 변경하기
      - 모델 관계에 영향을 미치기 때문에 훨씬 더 어려운 작업이 필요
      - 즉, 중간 변경은 권장하지 않으므로 초기에 설정하는 것을 권장

  - Custom User 모델 정의하기

    - 관리자 권한과 함께 완전한 기능을 갖춘 User 모델을 구현하는 기본 클래스인 AbstractUser를 상속받아 새로운 User 모델 작성

    ```python
    # accounts/models.py
    
    from django.contrib.auth.models import AbstractUser
    
    class User(AbstractUser):
        pass
    ```

    - 기존에 장고가 사용하는 User 모델이었던 auth앱의 User 모델을 accounts 앱의 User 모델을 사용하도록 변경

    ```python
    # settings.py
    
    AUTH_USER_MODEL = 'accounts.User'
    ```

    - admin site에 Custom User 모델 등록
      - admin으로 로그인 했을 때 사용자들 나타남!

    ```python
    # accounts/admin.py
    
    from django.contrib import admin
    from django.contrib.auth.admin import UserAdmin
    from .models import User
    
    admin.site.register(User, UserAdmin)
    ```

    - 프로젝트 중간에 진행했기 때문에 데이터베이스를 초기화 한 후 마으그레이션 진행
    - 초기화 방법
      1. db.sqlite3파일 삭제
      2. migrations 파일 모두 삭제 (파일명에 숫자가 붙은 팡리만 삭제)

- Custom user & Built-in auth forms

  - 회원가입 시도 후 아래와 같은 에러 발생

  ![image-20220413143106969](220413_Django_DB_relationship.assets/image-20220413143106969.png)

  - UserCreationForm과 UserChangeForm은 기종 내장 User 모델을 사용한 ModelForm이기 때문에 커스텀 User 모델로 대체해야함

  - Custom Built-in Auth Forms

    - 기존 User 모델을 사용하기 때문에 커스텀 User 모델로 다시 작성하거나 확장해야 하는 forms
      - UserCreationForm
      - UserChangeForm
    - 이처럼 커스텀 User 모델이 AbstractUser의 하위 클래스인 경우 다음과 같은 방식으로 form을 확장

    ```python
    # accounts/fomrs.py
    
    from django.contrib.auth.forms import UserChangeForm, UserCreationForm
    from myapp.models import CustomUser
    from django.contrib.auth import get_user_model
    
    class CustomUserCreationForm(UserCreationForm):
    
        class Meta(UserCreationForm.Meta):
            model = CustomUser
            fields = UserCreationForm.Meta.fields + ('email',)
    ```

    - UserCreationForm 확장

    ```python
    # accounts/fomrs.py
    
    from django.contrib.auth.forms import UserChangeForm, UserCreationForm
    from django.contrib.auth import get_user_model
    
    class CustomUserCreationForm(UserCreationForm):
    
        class Meta:
            model = get_user_model()
            fields = UserCreationForm.Meta.fields + ('email',)
    ```

    - signup view 함수 코드 수정
      - 수정 후 회원가입 재시도

    ```python
    # accounts/views.py
    
    from .forms import CustomUserChangeForm, CustomUserCreationForm
    
    
    ...
    
    @require_http_methods(['GET', 'POST'])
    def signup(request):
        if request.user.is_authenticated:
            return redirect('articles:index')
    
        if request.method == 'POST':
            form = CustomUserCreationForm(request.POST)		<<<<<<<<<<<<
            if form.is_valid():
                user = form.save()
                auth_login(request, user)
                return redirect('articles:index')
        else:
            form = CustomUserCreationForm()		<<<<<<<<<<<<<<<<
        context = {
            'form': form,
        }
        return render(request, 'accounts/signup.html', context)
    
    ...
    ```

  - get_user_model()

    - 현재 프로젝트에서 활성화된 사용자 모델 (active user model)을 반환
      - User 모델을 커스터마이징한 상황에서는 Custom User모델을 반환
    - 이 때문에 장고는 User 클래스를 직접 참조하는 대신 django.contrib.auth.get_user_model()을 사용하여 참조해야 한다고 강조

---

### Model Relationship 2

- User - Article (1:N)

  - User 모델 참조하기

    1. settings.AUTH_USER_MODEL
       - User 모델에 대한 외래 키 또는 다대다 관계를 정의할 때 사용해야 함
       - models.py에서 User 모델을 참조할 때 사용
    2. get_user_model()
       - 현재 활성화(active)된 User 모델을 반환
         - 커스터마이징한 User 모델이 있는 경우는 Custom User 모델, 그렇지 않으면 User를 반환
         - User를 직접 참조하지 않는 이유
       - models.py가 아닌 다른 모든 곳에서 User 모데를 참조할 때 사용

  - User와 Article 간 모델 관계 정의 후 migration

    ```python
    # articles/models.py
    
    from django.conf import settings
    
    class Article(models.Model):
        user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ```

    - null값이 허용되지 않는 user_id 필드가 별도의 값 없이 article에 추가되려 하기 때문

    - 1을 입력 후 enter

      - '현재 화면ㅅ에서 기본값을 설정하겠다'라는 의미

    - 1을 입력 후 enter

      - '기존 테이블에 추가되는 user_id 필드의 값을 1로 설정하겠다'라는 의미

      ![image-20220413145708797](220413_Django_DB_relationship.assets/image-20220413145708797.png)

    - migrate 과정 마무리

  - 게시글 출력 필드 수정

    - 게시글 작성 페이지에서 불필요한 필드가 출력되는 것을 확인

    ![image-20220413170819959](220413_Django_DB_relationship.assets/image-20220413170819959.png)

    - ArticleForm의 출력 필드 수정 후 게시글 작성 재시도

    ```python
    # articles/forms.py
    
    
    class ArticleForm(forms.ModelForm):
    
        class Meta:
            model = Article
            exclude = ('user',)
    ```

    - 게시글 작성시 NOT NULL contsraint failed: articles_article.user_id 에러 발생
    - 게시글 작성 시 작성자 정보 (article.user)가 누락되었기 때문

    ![image-20220413171011657](220413_Django_DB_relationship.assets/image-20220413171011657.png)

  - Create

    - 게시글 작성 시 작성자 정보(article.user) 추가 후 게시글 작성 재시도

    ```python
    # articles/views.py
    
    @login_required
    @require_http_methods(['GET', 'POST'])
    def create(request):
        if request.method == 'POST':
            form = ArticleForm(request.POST)
            if form.is_valid():
                article = form.save(commit=False)		<<<<<<<<<
                article.user = request.user		<<<<<<<<
                article.save()
                return redirect('articles:detail', article.pk)
        else:
            form = ArticleForm()
        context = {
            'form': form,
        }
        return render(request, 'articles/create.html', context)
    ```

  - DELETE

    - 자신이 작성한 게시글만 삭제 가능하도록 설정

    ```python
    # articles/views.py
    
    @require_POST
    def delete(request, pk):
        article = get_object_or_404(Article, pk=pk)
        if request.user.is_authenticated:
            if request.user == article.user:		<<<<<<
                article.delete()
        return redirect('articles:index')
    ```

  - UPDATE

    - 자신이 작성한 게시글만 수정 가능하도록 설정

    ```python
    # articles/views.py
    
    @login_required
    @require_http_methods(['GET', 'POST'])
    def update(request, pk):
        article = get_object_or_404(Article, pk=pk)
        if request.user == article.user:		<<<<<<<<<<<<
            if request.method == 'POST':
                form = ArticleForm(request.POST, instance=article)
                if form.is_valid():
                    article = form.save()
                    return redirect('articles:detail', article.pk)
            else:
                form = ArticleForm(instance=article)
        else:		<<<<<<<<<<<<
            return redirect('articles:index')		<<<<<<<<<<
        context = {
            'article': article,
            'form': form,
        }
        return render(request, 'articles/update.html', context)
    ```

  - READ

    - 게시글 작성 user가 누구인지 index.html에서 출력하기

    ```django
    # articles/index.html
    
    {% extends 'base.html' %}
    
    {% block content %}
      <h1>Articles</h1>
      ...
      <hr>
      {% for article in articles %}
        <p>작성자: {{ article.user }}</p>		<<<<<<<<<<<<
        <p>글 번호: {{ article.pk }}</p>  
        <p>글 제목: {{ article.title }}</p>
        <p>글 내용: {{ article.content }}</p>
        <a href="{% url 'articles:detail' article.pk %}">DETAIL</a>
        <hr>
      {% endfor %}
    {% endblock content %}
    
    ```

    - 해당 게시글의 작성자가 아니라면, 수정/삭제 버튼을 출력하지 않도록 처리

    ```django
    # articles/detail.html
    
    {% extends 'base.html' %}
    
    {% block content %}
      <h1>DETAIL</h1>
      ...
      <h4>COMMENTS</h4>
      <ul>
        {% for comment in comments  %}
          <li>
            {{ comment.user }} - {{ comment.content }}
            {% if request.user == comment.user %}		<<<<<<<<
              <form action="{% url 'articles:comment_delete' article.pk comment.pk %}" method="POST">
                {% csrf_token %}
                <input type="submit" value="DELETE">
              </form>
            {% endif %}			<<<<<<<
          </li>
        {% endfor %}
      </ul>
      <hr>
     ...
    {% endblock content %}
    

- User - Comment (1:N)

  - User와 Comment 간 모델 관계 정의 후 migration

  ```python
  # articles/models.py
  
  from django.conf import settings
  
  class Comment(models.Model):
      article = models.ForeignKey(Article, on_delete=models.CASCADE)
      user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)		<<<<<<<<<<
  ```

  - User와 Comment 간 모델 관계 정의 후 migration

    - null값이 허용되지 않는 user_id 필드가 별도의 값 없이 article에 추가되려 하기 때문

    - 1을 입력 후 enter

      - '현재 화면ㅅ에서 기본값을 설정하겠다'라는 의미

    - 1을 입력 후 enter

      - '기존 테이블에 추가되는 user_id 필드의 값을 1로 설정하겠다'라는 의미

      ![image-20220413145708797](220413_Django_DB_relationship.assets/image-20220413145708797.png)

    - migrate 과정 마무리

  - 댓글 출력 필드 수정

    - 댓글 작성 페이지에서 불필요한 필드가 출력되는 것을 확인

    ![image-20220413171927393](220413_Django_DB_relationship.assets/image-20220413171927393.png)

    - 댓글 작성 시 user ForeignKeyField를 출력하지 않도록 설정

    ```python
    # articles/forms.py
    
    class CommentForm(forms.ModelForm):
    
        class Meta:
            model = Comment
            fields = ('content',)
    ```

    - 댓글 작성시 NOT NULL contsraint failed: articles_comment.user_id 에러 발생
    - 댓글 작성 시 작성자 정보 (comment.user)가 누락되었기 때문

    ![image-20220413172128781](220413_Django_DB_relationship.assets/image-20220413172128781.png)

  - CREATE

    - 댓글 작성 시 작성자 정보(request.user) 추가 후 댓글 작성 재시도

    ```python
    # articles/views.py
    
    @require_POST
    def comment_create(request, pk):
        if request.user.is_authenticated:
            # article = Article.objects.get(pk=pk)
            article = get_object_or_404(Article, pk=pk)
            comment_form = CommentForm(request.POST)
            if comment_form.is_valid():
                comment = comment_form.save(commit=False)
                comment.article = article
                comment.user = request.user		<<<<<<<<<<<<
                comment.save()
            return redirect('articles:detail', article.pk)
        return redirect('accounts:login')
    ```

  - READ

    - 댓글 작성자 출력하기
    - 비로그인 User에게는 댓글 form 출력 숨기기

    ```django
    # articles/detail.html
    
    {% extends 'base.html' %}
    
    {% block content %}
      <h1>DETAIL</h1>
      ...
      <h4>COMMENTS</h4>
      <ul>
        {% for comment in comments  %}
          <li>
            {{ comment.user }} - {{ comment.content }}		<<<<<<<<<<<
            {% if request.user == comment.user %}
              <form action="{% url 'articles:comment_delete' article.pk comment.pk %}" method="POST">
                {% csrf_token %}
                <input type="submit" value="DELETE">
              </form>
            {% endif %}
          </li>
        {% endfor %}
      </ul>
      <hr>
      {% if request.user.is_authenticated %}		<<<<<<<<<
        <form action="{% url 'articles:comment_create' article.pk %}" method="POST">
          {% csrf_token %}
          {{ comment_form }}
          <input type="submit">
        </form>
      {% else %}		<<<<<<<<<<<<<<<<<<<<
        <a href="{% url 'accounts:login' %}">[댓글을 작성하려면 로그인하세요.]</a>		<<<<<<<<<<<<<
      {% endif %}		<<<<<<<<<<<<<<<
    {% endblock content %}
    ```

  - DELETE

    - 자신이 작성한 댓글만 삭제 버튼을 볼 수 있도록 수정

    ```django
    # articles/detail.html
    
    {% extends 'base.html' %}
    
    {% block content %}
      <h1>DETAIL</h1>
      ...
      <h4>COMMENTS</h4>
      <ul>
        {% for comment in comments  %}
          <li>
            {{ comment.user }} - {{ comment.content }}
            {% if request.user == comment.user %}		<<<<<<<<<<<<<<<<
              <form action="{% url 'articles:comment_delete' article.pk comment.pk %}" method="POST">		<<<<<<<<<<<<<<<<
                {% csrf_token %}		<<<<<<<<<<<
                <input type="submit" value="DELETE">		<<<<<<<<<<<<<<<
              </form>		<<<<<<<<<<<<<<<
            {% endif %}		<<<<<<<<<<<<<<<
          </li>
        {% endfor %}
      </ul>
      <hr>
      {% if request.user.is_authenticated %}
        <form action="{% url 'articles:comment_create' article.pk %}" method="POST">
          {% csrf_token %}
          {{ comment_form }}
          <input type="submit">
        </form>
      {% else %}
        <a href="{% url 'accounts:login' %}">[댓글을 작성하려면 로그인하세요.]</a>
      {% endif %}
    {% endblock content %}
    
    ```

    - 자신이 작성한 댓글만 삭제할 수 있도록 수정

    ```python
    # articles/views.py
    
    @require_POST
    def comment_delete(request, article_pk, comment_pk):
        if request.user.is_authenticated:
            # comment = Comment.objects.get(pk=comment_pk)
            comment = get_object_or_404(Comment, pk=comment_pk)
            # article = comment.article.pk
            # 리턴값에 article_pk가 아니라 article로 전달
            if request.user == comment.user:		<<<<<<<<<<<<<<<<
                comment.delete()
            return redirect('articles:detail', article_pk)
    ```

    