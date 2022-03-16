from django.contrib import admin
from.models import Article

# Register your models here.

# 초기 생성
# admin.site.register(Article)

# 추가 옵션
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('pk', 'title', 'content', 'created_at', 'updated_at')

admin.site.register(Article, ArticleAdmin)

