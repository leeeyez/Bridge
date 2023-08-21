from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from accounts import views as accounts_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', accounts_views.home, name='home'),
    path('accounts/', include('accounts.urls', namespace='accounts')),
    path('programs/', include('programs.urls', namespace='programs')),
    path('mypage/', include('mypage.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
