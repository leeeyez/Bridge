from rest_framework.serializers import ModelSerializer
from .models import Program


class ProgramSerializer(ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'


class RecommendSerializer(ModelSerializer):
    class Meta:
        model = Program
        fields = ['id', 'image', 'title', 'district']