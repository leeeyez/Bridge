from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import HttpResponse,JsonResponse
from django.contrib.auth.decorators import login_required
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from django.db.models import Q
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json


@api_view(['GET', 'POST'])
def get_programs(request):
    if request.method == 'GET':
        programs = Program.objects.all().order_by('-id')
        serializer = ProgramSerializer(programs, many=True)
        return Response(serializer.data)


@api_view(['POST', 'GET'])
def search_programs(request):
    data = json.loads(request.body)
    district = data.get('district')
    category = data.get('category')
    sorting = data.get('sort')

    programs = Program.objects.all().order_by('-id')

    if district == ' ':
        pass
    elif district:
        programs = programs.filter(district__icontains=district)
    
    if category == '선택 없음':
        pass
    elif category:
        programs = programs.filter(Q(category1__icontains=category) | Q(category2__icontains=category))

    if sorting == '인기순':
        programs = programs.order_by('-like')
    elif sorting == '마감임박순':
        programs = programs.order_by('deadline_yy', 'deadline_mm', 'deadline_dd')

    serializer = ProgramSerializer(programs, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
def get_popular(request):
    if request.method == 'GET':
        top10 = Program.objects.all().order_by('-like')[:10]
        serializer = RecommendSerializer(top10, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def get_imminent(request):
    if request.method == 'GET':
        top10 = Program.objects.order_by('deadline_yy', 'deadline_mm', 'deadline_dd')[:10]
        serializer = RecommendSerializer(top10, many=True)
        return Response(serializer.data)


@api_view(['POST', 'GET'])
def apply_program(request, post_id):
    # 로그인 안 되어 있을 경우 신청 불가
    # if not request.user.is_authenticated:
    #     return redirect(accounts_views.home)

    program = get_object_or_404(Program, pk=post_id)
    MyProgram.objects.get_or_create(program=program)
    return Response({"message": "succeed"})


@api_view(['POST', 'GET'])
def press_heart(request, post_id):
    program = get_object_or_404(Program, pk=post_id)
    if program.iflike:  # 이미 좋아요가 눌린 경우
        program.like -= 1
        program.iflike = False
        MyLike.objects.filter(program=program).delete()
    else:
        program.like += 1
        program.iflike = True
        MyLike.objects.create(program=program)
    program.save()
    return Response({"좋아요 개수": program.like, "좋아요 눌렀는지": program.iflike})

