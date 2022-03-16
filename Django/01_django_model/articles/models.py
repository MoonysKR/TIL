from turtle import title
from django.db import models
# models라는 장고의 내장 모듈내에 Model클래스 활용 예정

# Create your models here.
# 앱의 단수 형태로 테이블을 생성
class Article(models.Model):
    # 스키마 작성 (컬럼 = 데이터 타입)
    # 문자열 타입 => CharField(필수인자: max_length=값) / TextField()
    title = models.CharField(max_length=10)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
