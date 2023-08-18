from django.shortcuts import render, redirect, get_object_or_404
from rest_framework.response import Response
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework import viewsets
import json
from .models import *
from programs.models import *
from .serializers import *
from programs.serializers import *


def home(request):
    return render(request, 'index.html')


@api_view(['GET', 'POST'])
def get_my_documents(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        family = data.get('file1')
        id_card = data.get('file2')
        certification = data.get('file3')
        judgement = data.get('file4')

        my_document, created = MyDocument.objects.get_or_create()
        my_document.file1 = family
        my_document.file2 = id_card
        my_document.file3 = certification
        my_document.file4 = judgement
        my_document.save()
        return Response({"message": "succeed"})

    elif request.method == 'GET':
        my_documents = MyDocument.objects.all()
        serializers = MyDocumentSerializer(my_documents, many=True)
        return Response(serializers.data)


@api_view(['GET'])
def get_my_programs(request):
    if request.method == 'GET':
        my_programs = MyProgram.objects.all().order_by('-id')
        serializer = MyProgramSerializer(my_programs, many=True)
        return Response(serializer.data)


@api_view(['DELETE'])
@require_http_methods(["DELETE"])
def delete_my_program(request, post_id):
    if request.method == 'DELETE':
        my_program = MyProgram.objects.get(pk=post_id)
        my_program.delete()
        return HttpResponse(status=204)


@api_view(['GET'])
def get_like_programs(request):
    if request.method == 'GET':
        my_like = MyLike.objects.all().order_by('-id')
        serializer = MyLikeSerializer(my_like, many=True)
        return Response(serializer.data)