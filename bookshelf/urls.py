"""
URL configuration for bookshelf project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache

from rest_framework.authtoken.views import obtain_auth_token

from books import views

# Create view to render index.html template generated from React frontend.
index = never_cache(TemplateView.as_view(template_name='index.html'))

urlpatterns = [
    path('admin/', admin.site.urls),
    # Create, edit, delete, and access Review data
    path('reviews/create/', views.create_review_view, name='create_review'),
    path('reviews/edit/', views.edit_review_view, name='edit_review'),
    path('reviews/delete/<str:review_id>/', views.delete_review_view, name='delete_review'),
    path('reviews/user/<str:username>/', views.get_user_reviews_view, name='get_user_reviews'),
    path('reviews/all/user/', views.get_all_user_reviews_view, name='get_all_user_reviews'),
    path('reviews/all/book/', views.get_all_book_reviews_view, name='get_all_book_reviews'),
    # User authentication
    path('user/register/', views.CreateUserView.as_view(), name='register'),
    path('user/token_auth/', obtain_auth_token, name='token_auth'),
    # Serve the React frontend at the root base URL of the website.
    re_path('', index, name='index'),
]
