from django.contrib import admin

from .models import Book, Review

# Register Book and Review models to enable editing through Django admin interface
admin.site.register(Book)
admin.site.register(Review)
