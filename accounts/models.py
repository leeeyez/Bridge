from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, user_id, social_type, name, email, age_range, gender, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(user_id=user_id, social_type=social_type, name=name, email=email, age_range=age_range, gender=gender, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, user_id, social_type, name, email, age_range, gender, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(user_id, social_type, name, email, age_range, gender, password, **extra_fields)


class CustomUser(AbstractBaseUser):
    user_id = models.CharField(verbose_name='소셜사용자_id', max_length=100, primary_key=True, unique=True)
    social_type = models.CharField(verbose_name='소셜 타입', max_length=20)
    name = models.CharField(verbose_name='이름', max_length=40, blank=True, null=True)
    email = models.EmailField(verbose_name='이메일', max_length=100, unique=True)
    phone = models.CharField(verbose_name='전화번호', blank=True, null=True, max_length=13)
    last_login = models.DateTimeField(verbose_name='최근 로그인 일자', blank=True, null=True)
    age_range = models.CharField(verbose_name='연령대', max_length=10, blank=True, null=True)
    gender = models.CharField(verbose_name='성별', max_length=10, blank=True, null=True)
    
    USERNAME_FIELD = 'email'
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    def __str__(self):
        return str(self.email)
