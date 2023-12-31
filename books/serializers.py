from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book, Review

# Serializers convert Django model instances into JSON that can be sent to the frontend through HTTPS requests.

class UserSerializer(serializers.ModelSerializer):
    """
    This serializer converts the data for a User in Django to JSON and vice versa.
    """
    class Meta:
        model = User
        # Serialize/deserialize the User's email, username, and password
        fields = ('email', 'username', 'first_name', 'last_name', 'password')
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
    """
    This serializer converts the data for a Book in Django to JSON and vice versa.
    """
    id = serializers.ReadOnlyField()

    class Meta:
        model = Book
        fields = ('id', 'title', 'author', 'year', 'genre', 'description', 'cover')

class ReviewSerializer(serializers.ModelSerializer):
    """
    This serializer converts the data for a Review in Django to JSON and vice versa.
    """
    id = serializers.ReadOnlyField()
    book = BookSerializer()

    class Meta:
        model = Review
        fields = ('id', 'title', 'description', 'date', 'owner', 'book')

    def create(self, validated_data):
        """
        Creates a new Review given the review and book data from the frontend.

        If the Book being reviewed already exists, link the Review to the existing Book.
        Otherwise, create a new Book object.

        Parameters:
        validated_data: The review info processed by the serializer.

        Returns:
        review: The newly created instance of the review.
        """
        # Pop the book's information from validated_data.
        book_data = validated_data.pop("book")

        # Check if any instances of the book being reviewed already exist.
        existing_book = Book.objects.filter(title=book_data["title"], author=book_data["author"]).first()

        if existing_book:
            # If an instance of the book being reviewed already exists, create the Review and link it to the Book.
            review = Review(title=validated_data["title"],
                            description=validated_data["description"],
                            date=validated_data["date"],
                            owner=self.context["request"].user,
                            book=existing_book)
            review.save()

            return review
        else:
            # If no instance of the book being reviewed already exists, create the Book.
            new_book = Book.objects.create(title=book_data["title"],
                                           author=book_data["author"],
                                           year=book_data["year"],
                                           genre=book_data["genre"],
                                           description=book_data["description"],
                                           cover=book_data["cover"])

            # Create the review.
            review = Review(title=validated_data["title"],
                            description=validated_data["description"],
                            date=validated_data["date"],
                            owner=self.context["request"].user,
                            book=new_book)
            review.save()

            return review
