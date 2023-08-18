from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import *

app_name = "programs"

urlpatterns = [
    path('popular/', get_popular, name="popular"),
    path('imminent/', get_imminent, name="imminent"),
    path('list/', get_programs, name="programs"),
    path('list/<int:post_id>/', apply_program, name="registration"),
    path('search/', search_programs, name='search'),
    path('mylike/<int:post_id>/', press_heart, name="press_heart"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)