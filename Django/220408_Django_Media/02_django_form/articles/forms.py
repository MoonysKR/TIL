
from django import forms
from .models import Article

class ArticleForm(forms.ModelForm):
    
    class Meta:
        model = Article
        fields = '__all__'

# class ArticleForm(forms.Form):
#     REGION_A = 'SL'
#     REGION_B = 'DJ'
#     REGION_C = 'GJ'
#     REIONS_CHOICES = [
#         (REGION_A, '서울'),
#         (REGION_B, '대전'),
#         (REGION_C, '광주')
#     ]
#     title = forms.CharField(max_length=10)
#     content = forms.CharField(widget=forms.PasswordInput)
#     region = forms.ChoiceField(widget=forms.CheckboxSelectMultiple, choices=REIONS_CHOICES)