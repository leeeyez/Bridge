from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *
from programs.models import *
from programs.serializers import *


class MyDocumentSerializer(ModelSerializer):
    # user_id = serializers.CharField(source='queryset.email', read_only=True)
    class Meta:
        model = MyDocument
        fields = '__all__'


class MyProgramSerializer(ModelSerializer):
    title = serializers.CharField(source='program.title', read_only=True)
    district = serializers.CharField(source='program.district', read_only=True)

    class Meta:
        model = MyProgram
        fields = ['id', 'title', 'district', 'process']


class MyLikeSerializer(ModelSerializer):
    program = ProgramSerializer()

    class Meta:
        model = MyLike
        fields = ['program']