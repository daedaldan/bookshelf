from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book, Review

class BookSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Book
        fields = ('id', 'title', 'author', 'year', 'genre', 'description')

class ReviewSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    owner = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field="username")

    class Meta:
        model = Review
        fields = ('id', 'title', 'description', 'date')
