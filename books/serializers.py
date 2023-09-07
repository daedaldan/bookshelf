from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book, Review

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {"write_only": "True"}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance

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
