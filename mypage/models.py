import os
from django.db import models
from accounts.models import *

class MyDocument(models.Model):
    # user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='user', default='2966447342')
    # file1 = models.FileField(verbose_name='가족관계증명서', null=False, upload_to="", blank=True)
    # file2 = models.FileField(verbose_name='주민등록등본', null=False, upload_to="", blank=True)
    # file3 = models.FileField(verbose_name='장애인등록증', null=False, upload_to="", blank=True)
    # file4 = models.FileField(verbose_name='정부기관심사결과지', null=False, upload_to="", blank=True)

    # def get_file1name(self):
    #     return os.path.basename(self.file1.name)
    # def get_file2name(self):
    #     return os.path.basename(self.file2.name)
    # def get_file3name(self):
    #     return os.path.basename(self.file3.name)
    # def get_file4name(self):
    #     return os.path.basename(self.file4.name)
    file1 = models.CharField(verbose_name='가족관계증명서', max_length=300)
    file2 = models.CharField(verbose_name='주민등록등본', max_length=300)
    file3 = models.CharField(verbose_name='장애인등록증', max_length=300)
    file4 = models.CharField(verbose_name='정부기관심사결과지', max_length=300)

    def str(self):
        return f'{self.file1} - {self.file2} - {self.file3} - {self.file4}'
