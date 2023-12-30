from django.shortcuts import render

from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer, BookSerializer, ReviewSerializer

class CreateUserView(APIView):
    """
    Process username and password sent from frontend and create a new User Django instance.
    """
    # Anyone accessing the website can create a new account.
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        """
        Register a new User given a POST request with the user's username and password.
        """
        # Process the user data.
        serializer = UserSerializer(data=request.data)

        # If the user data from the POST request is valid, create a new user and a token for the user.
        if serializer.is_valid():
            user = serializer.save()
            if user:
                # Generate a unique token for the user for authentication purposes.
                token = Token.objects.create(user=user)
                json = serializer.data
                json["token"] = token.key

        # Return a JSON object with the username, password, and token.
        return Response(json, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_review_view(request):
    """
    Creates a new Review with the specified title and description.

    If the book associated with the Review does not exist in the database, create a new instance of the Book.
    """
    # Process the review data.
    serializer = ReviewSerializer(data=request.data)

    # If the user data from the POST request is valid, check if an instance of the book being reviewed already exists.
    if serializer.is_valid():
        review_json = serializer.data

        # Check if any instances of the book being reviewed already exist.
        if Book.objects.filter(title=review_json["book_title"], author=review_json["book_author"]).exists():
            # If an instance of the book being reviewed already exists, create the Review and link it to the Book.
            existing_book = Book.objects.filter(title=review_json["book_title"], author=review_json["book_author"]).first()

            # Create the review.
            review = Review(title=review_json["review_title"],
                            description=review_json["review_description"],
                            owner=request.user,
                            book=existing_book)

            # Save the review.
            review.save()
        else:
            # If no instance of the book being reviewed already exists, create the Book.
            new_book = Book(title=review_json["book_title"],
                            author=review_json["book_author"],
                            year=review_json["book_year"],
                            genre=review_json["book_genre"],
                            description=review_json["book_description"])

            # Create the review.
            review = Review(title=review_json["review_title"],
                            description=review_json["review_description"],
                            owner=request.user,
                            book=new_book)

            # Save the review.
            review.save()

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def edit_review_view(request):
    """
    Edit the Review with the specified title and description.
    """
    pass

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_review_view(request):
    """
    Delete the Review with the specified title and description.
    """
    pass

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_user_reviews_view(request):
    """
    Returns all of the reviews authored by a given user.
    """
    pass

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_all_user_reviews_view(request):
    """
    Returns every Review ever written organized by User.
    """
    pass

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_all_book_reviews_view(request):
    """
    Returns every Review ever written organized by Book.
    """
    pass

