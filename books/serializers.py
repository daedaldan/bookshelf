from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book, Review

# Serializers convert Django model instances into JSON that can be sent to the frontend through HTTPS requests.

class UserSerializer(serializers.ModelSerializer):
    """
    This serializer converts the data for a User in Django to JSON.
    """
    class Meta:
        model = User
        # Serialize/deserialize the User's email, username, and password
        fields = ('email', 'username', 'password')
        # Set the password field to write_only to prevent exposure through API
        extra_kwargs = {'password': {"write_only": "True"}}

    def create(self, validated_data):
        """
        Creates a new User instance given username and password data from the frontend.

        Parameters:
        validated_data: The user info processed by the serializer.

        Returns:
        instance: The newly created instance of the User.
        """
        password = validated_data.pop('password', None)
        # Initialize the model instance with the validated data
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
    # Include the username of the User who authored the Review in the serialized data
    owner = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field="username")

    class Meta:
        model = Review
        fields = ('id', 'title', 'description', 'date', 'owner')
