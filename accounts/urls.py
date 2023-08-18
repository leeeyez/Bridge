from django.urls import path, include
from django.contrib.auth import views
from .views import *

app_name = "accounts"

urlpatterns = [
    path('login/kakao/', get_kakao_login, name='kakao-login'),
    path('login/kakao/user/callback/', get_kakao_user_info, name="kakao-callback"),
    
    path('login/naver/', get_naver_login, name='naver'),
    path('login/naver/user/callback/', get_naver_user_info, name="naver_callback"),
    # path('naver_logout/', naver_logout, name='naver-logout'),
    
    path('login/google/', get_google_login, name='google'),
    path('login/google/user/callback/', get_google_user_info, name="google_callback"),
]
