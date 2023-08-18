from django.shortcuts import render,  redirect
from json import JSONDecodeError
from django.http import JsonResponse
import requests
from rest_framework import status
from .models import *
from love_bridge.settings import SOCIAL_OUTH_CONFIG
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


def home(request):
    return render(request, 'index.html')


# 카카오 로그인
@api_view(['GET'])
@permission_classes([AllowAny, ])
def get_kakao_login(request):
    CLIENT_ID = SOCIAL_OUTH_CONFIG['KAKAO_REST_API_KEY']
    REDIRECT_URL = SOCIAL_OUTH_CONFIG['KAKAO_REDIRECT_URI']
    scope = 'profile_nickname, profile_image,account_email,gender,age_range'
    url = "https://kauth.kakao.com/oauth/authorize?client_id={0}&redirect_uri={1}&response_type=code&scope={2}".format(
        CLIENT_ID, REDIRECT_URL, scope)
    return redirect(url)


@api_view(['GET'])
@permission_classes([AllowAny, ])
def get_kakao_user_info(request):
    CODE = request.query_params['code']
    url = "https://kauth.kakao.com/oauth/token"
    request_data = {
        'grant_type': 'authorization_code',
        'client_id': SOCIAL_OUTH_CONFIG['KAKAO_REST_API_KEY'],
        'redirect_url': SOCIAL_OUTH_CONFIG['KAKAO_REDIRECT_URI'],
        'client_secret': SOCIAL_OUTH_CONFIG['KAKAO_SECRET_KEY'],
        'code': CODE
    }
    headers = {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
    response = requests.post(url, data=request_data, headers=headers)
    token_json = response.json()
    user_url = "https://kapi.kakao.com/v2/user/me"
    auth = "Bearer " + token_json['access_token']
    HEADER = {
        "Authorization": auth,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
    }

    # kakao 회원정보 요청
    user_info_res = requests.get(user_url, headers=HEADER)
    user_info_json = user_info_res.json()
    email = user_info_json['kakao_account']['email']

    try:
        user = CustomUser.objects.get(email=email)
    except CustomUser.DoesNotExist:
        CustomUser.objects.create(
        social_type = 'kakao',
        user_id = user_info_json['id'],
        last_login = user_info_json['connected_at'],
        name = user_info_json['properties']['nickname'],
        email = user_info_json['kakao_account']['email'],
        age_range = user_info_json['kakao_account']['age_range'],
        gender = user_info_json['kakao_account']['gender']
    )
    return redirect('http://localhost:3000/')

# def kakao_logout(access_token):
#     logout_url = "https://kapi.kakao.com/v1/user/logout"
#     auth = "Bearer " + access_token
#     HEADER = {
#         "Authorization": auth
#     }
#     response = requests.post(logout_url, headers=HEADER)
#     return redirect("index.html")


# 네이버 로그인
@api_view(['GET'])
@permission_classes([AllowAny, ])
def get_naver_login(request):
    CLIENT_ID = SOCIAL_OUTH_CONFIG['NAVER_CLIENT_ID']
    REDIRECT_URL = SOCIAL_OUTH_CONFIG['NAVER_REDIRECT_URI']
    url = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id={0}&state=STATE_STRING&redirect_uri={1}".format(
        CLIENT_ID, REDIRECT_URL)
    return redirect(url)


@api_view(['GET'])
@permission_classes([AllowAny, ])
def get_naver_user_info(reqeust):
    CODE = reqeust.GET.get("code")
    url = "https://nid.naver.com/oauth2.0/token"
    request_data = {
        'grant_type': 'authorization_code',
        'client_id': SOCIAL_OUTH_CONFIG['NAVER_CLIENT_ID'],
        'client_secret': SOCIAL_OUTH_CONFIG['NAVER_CLIENT_SECRET'],
        'code': CODE,
        'state': reqeust.GET.get("state")
    }
    response = requests.post(url, data=request_data)
    token_json = response.json()
    user_url = "https://openapi.naver.com/v1/nid/me"
    auth = "Bearer " + token_json['access_token']
    HEADER = {
        "Authorization": auth,
    }

    # naver 회원정보 요청
    user_info_res = requests.get(user_url, headers=HEADER)
    user_info_json = user_info_res.json()
    email = user_info_json['response']['email']

    try:
        user = CustomUser.objects.get(email=email)
    except CustomUser.DoesNotExist:
        CustomUser.objects.create(
        social_type = 'naver',
        user_id = user_info_json['response']['id'],
        name = user_info_json['response']['name'],
        email = user_info_json['response']['email'],
        phone = user_info_json['response']['mobile'],
        age_range = user_info_json['response']['age'],
        gender = user_info_json['response']['gender']
    )
    return redirect('http://localhost:3000/')


# @api_view(['GET'])
# def naver_logout(request):
#     CLIENT_ID = SOCIAL_OUTH_CONFIG['NAVER_CLIENT_ID']
#     REDIRECT_URL = SOCIAL_OUTH_CONFIG['NAVER_REDIRECT_URI']
#     url = "https://nid.naver.com/oauth2.0/token"
#     request_data = {
#         'grant_type': "delete",
#         'client_id': SOCIAL_OUTH_CONFIG['NAVER_CLIENT_ID'] ,
#         'client_secret': SOCIAL_OUTH_CONFIG['NAVER_CLIENT_SECRET'],
#     }
#     response = requests.post(url, data=request_data)
#     token_json = response.json()
#     HEADER = {
#         "access_token": token_json['access_token']
#     }
#     naver_logout_url = requests.post(url, data=request_data, headers=HEADER)
#     return redirect(naver_logout_url)


# 구글 로그인
@api_view(['GET'])
@permission_classes([AllowAny, ])
def get_google_login(request):
    scope = "https://www.googleapis.com/auth/userinfo.email"
    CLIENT_ID = SOCIAL_OUTH_CONFIG['GOOGLE_CLIENT_ID']
    REDIRECT_URL = SOCIAL_OUTH_CONFIG['GOOGLE_REDIRECT_URI']
    url = "https://accounts.google.com/o/oauth2/v2/auth?client_id={0}&response_type=code&redirect_uri={1}&scope={2}".format(
        CLIENT_ID, REDIRECT_URL, scope)
    return redirect(url)


@api_view(['GET'])
@permission_classes([AllowAny, ])
def get_google_user_info(reqeust):
    CODE = reqeust.GET.get("code")
    url = "https://oauth2.googleapis.com/token"
    request_data = {
        'client_id': SOCIAL_OUTH_CONFIG['GOOGLE_CLIENT_ID'],
        'client_secret': SOCIAL_OUTH_CONFIG['GOOGLE_CLIENT_SECRET'],
        'code': CODE,
        'grant_type': 'authorization_code',
        'redirect_uri': SOCIAL_OUTH_CONFIG['GOOGLE_REDIRECT_URI'],
        'state': reqeust.GET.get("state")
    }
    response = requests.post(url, data=request_data)
    token_json = response.json()
    user_url = "https://www.googleapis.com/oauth2/v2/userinfo"
    auth = "Bearer " + token_json['access_token']
    HEADER = {
        "Authorization": auth,
    }
    
    # google 회원정보 요청
    user_info_res = requests.get(user_url, headers=HEADER)
    user_info_json = user_info_res.json()
    email = user_info_json['email']

    try:
        user = CustomUser.objects.get(email=email)
    except CustomUser.DoesNotExist:
        CustomUser.objects.create(
        social_type = 'google',
        user_id = user_info_json['id'],
        email = user_info_json['email'],
    )
    return redirect('http://localhost:3000/')