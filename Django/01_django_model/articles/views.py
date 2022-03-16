from django.shortcuts import render, redirect
from .models import Article  # models.py에서 Article 클래스 호출

# Create your views here.
def index(request):
    # 전체 게시글 조회(오름차순), 변수명 복수로 하는 센스(단일 객체가 아니기 때문에)
    # articles = Article.objects.all()

    # 게시글 조회(내림차순 1) => python으로 조작
    # articles = Article.objects.all()[::-1]

    # 게시글 조회(내림차순 2) => DB가 조작
    # 컬럼 앞에 -를 붙이면 뒤집음, 일반적으로 빠름!
    articles = Article.objects.order_by('-pk')
    
    # 조회해서 할당한 쿼리셋 데이터를 context로 넘김
    context = {
        'articles': articles
    }

    return render(request, 'articles/index.html', context)

def new(request):
    # Throw와 동일
    return render(request, 'articles/new.html')

def create(request):
    # Catch와 동일
    title = request.POST.get('title')
    content = request.POST.get('content')

    # 1번 형태 저장 // 탈락
    # article = Article()
    # article.title = title
    # article.content = content
    # article.save()

    # 2 
    # 인스턴스 생성 후 저장까지 텀이 있음
    # 데이터를 받았을 때 올바른 데이터가 아니라면?
    # 유효성 검사 테스트를 진행할 예정!!!
    article = Article(title=title, content=content)
    article.save()

    # 3 // 탈락
    # Article.objects.create(title=title, content=content)

    # 성공페이지 보여주기 리턴 / redirect => 재호출 함수(추가 필요)
    # return redirect('/articles/')
    return redirect('articles:detail', article.pk)

def detail(request, pk):
    article = Article.objects.get(pk=pk)
    context = {
        'article': article
    }
    return render(request, 'articles/detail.html', context)

def delete(request, pk):
    article = Article.objects.get(pk=pk)
    
    # article.delete()
    # return redirect('articles:index')
    # get post 둘 다 작동하기 떄문에 조건문 추가
    # print(request.method)
    # GET
    if request.method == 'POST': 
        article.delete()
        return redirect('articles:index')
    else:
        return redirect('articles:detail', article.pk)

def edit(request, pk):
    article = Article.objects.get(pk=pk)
    context = {
        'article':article
    }
    return render(request, 'articles/edit.html', context)

def update(request, pk):
    article = Article.objects.get(pk=pk)
    # 기존 값을 바꾸어주는 작업
    article.title = request.POST.get('title')
    article.content = request.POST.get('content')
    article.save()

    # 수정 후 디테일 url 재호출
    return redirect('articles:detail', article.pk)