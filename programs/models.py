from django.db import models
from django.contrib.auth.models import User


class Program(models.Model):
    image = models.ImageField(verbose_name='이미지', null=True, blank=True, default='')
    title = models.CharField(verbose_name='프로그램명', max_length=20)
    district = models.CharField(verbose_name="지역", max_length=11)
    agency = models.CharField(verbose_name="기관", max_length=15)
    deadline_yy = models.IntegerField(verbose_name="마감일 연")
    deadline_mm = models.IntegerField(verbose_name="마감일 월")
    deadline_dd = models.IntegerField(verbose_name="마감일 일")
    phone = models.CharField(verbose_name="문의처", max_length=13)
    like = models.IntegerField(verbose_name="좋아요 개수", default=0)
    iflike = models.BooleanField(verbose_name="좋아요 여부", default=False)
    category1 = models.CharField(verbose_name='카테고리1', max_length=20)
    category2 = models.CharField(verbose_name="카테고리2", max_length=20)
    applicant = models.IntegerField(verbose_name='신청 가능 인원', default=15)

    def __str__(self):
        return str(self.title)


class MyProgram(models.Model):
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    # process = models.CharField(verbose_name="진행 상태", max_length=6)
    process = '서류전달'
    
    def str(self):
        return f'{self.program} - {self.process}'


class MyLike(models.Model):
    program = models.ForeignKey(Program, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.program)