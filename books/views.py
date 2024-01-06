from django.shortcuts import render
from django.http import JsonResponse
from django.core.serializers import serialize
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

import json

from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.renderers import JSONRenderer

from .serializers import UserSerializer, BookSerializer, ReviewSerializer
from .models import Book, Review

@method_decorator(csrf_exempt, name='dispatch')
class CreateUserView(APIView):
    """
    Process username and password sent from frontend and create a new User Django instance.
    """
    # Anyone accessing the website can create a new account.
    permission_classes = [permissions.AllowAny,]

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
@csrf_exempt
def create_review_view(request):
    """
    Creates a new Review with the specified title and description.
    """
    # Process the review data.
    serializer = ReviewSerializer(data=request.data, context={'request': request})
    # If the review data from the POST request is valid, save the Review.
    if serializer.is_valid():
       serializer.save()
       return Response(serializer.data)

    # If the user data from the POST request is invalid, notify the request sender.
    errors = serializer.errors
    return Response(errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
@csrf_exempt
def delete_review_view(request, review_id):
    """
    Delete the Review with the specified title and description.
    """
    review = Review.objects.get(id=review_id)
    review.delete()

    return Response("Review successfully deleted.")

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@csrf_exempt
def get_user_reviews_view(request, username):
    """
    Returns all of the reviews authored by a given user.
    """
    user_reviews = Review.objects.filter(owner__username=username)

    # Convert the QuerySet of user Reviews to JSON.
    serialized_data = serialize("json", user_reviews)
    # Convert the JSON object to a Python dict.
    serialized_data = json.loads(serialized_data)

    # Create list to store only review data.
    cleaned_data = []

    # For each element of serialized_data, append the review data to cleaned_data, ignoring Django's internal info.
    for review in serialized_data:
        cleaned_data.append(clean_serialized_review_data(review))

    # Return the specified user's reviews in JSON format.
    return JsonResponse(cleaned_data, safe=False, status=200)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@csrf_exempt
def get_all_user_reviews_view(request):
    """
    Returns every Review ever written organized by User.
    """
    # Get a QuerySet of all the Users.
    users = User.objects.all()

    # Create a list of all Users' usernames.
    usernames = [user.username for user in users]

    # Create a dictionary mapping usernames to lists of reviews.
    user_reviews = {}

    # For each User, add his/her reviews to the dictionary.
    for username in usernames:
        reviews = Review.objects.filter(owner__username=username)

        # Convert the QuerySet of user Reviews to JSON.
        serialized_data = serialize("json", reviews)
        # Convert the JSON object to a Python dict.
        serialized_data = json.loads(serialized_data)

        # Create list to store only review data.
        cleaned_data = []

        print(serialized_data)

        # For each element of serialized_data, append the review data to cleaned_data, ignoring Django's internal info.
        for review in serialized_data:
            cleaned_data.append(clean_serialized_review_data(review))

        user_reviews[username] = cleaned_data

    # Return all the Reviews organized by User.
    return JsonResponse(user_reviews, safe=False, status=200)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@csrf_exempt
def get_all_book_reviews_view(request):
    """
    Returns every Review ever written organized by Book.
    """
    # Get a QuerySet of all the Books.
    books = Book.objects.all()

    # Create a list of all Book titles.
    book_titles = [book.title for book in books]

    # Create a dictionary mapping book titles to lists of reviews.
    book_reviews = {}

    # For each User, add his/her reviews to the dictionary.
    for title in book_titles:
        reviews = Review.objects.filter(book__title=title)

        # Convert the QuerySet of book Reviews to JSON.
        serialized_data = serialize("json", reviews)
        # Convert the JSON object to a Python dict.
        serialized_data = json.loads(serialized_data)

        # Create list to store only review data.
        cleaned_data = []

        # For each element of serialized_data, append the review data to cleaned_data, ignoring Django's internal info.
        for review in serialized_data:
            cleaned_data.append(clean_serialized_review_data(review))

        book_reviews[title] = cleaned_data

    # Return all the Reviews organized by User.
    return JsonResponse(book_reviews, safe=False, status=200)

def clean_serialized_review_data(serialized_review_data):
    """
    Given an element of the data serialized from a QuerySet of Review objects,
    this function returns a Python dictionary with the review's data.
    """
    # Get only the review data.
    review_data = serialized_review_data["fields"]

    # Add the review ID to the data.
    review_data["id"] = serialized_review_data["pk"]

    # Add the review owner's full name to the data.
    owner = User.objects.get(id=review_data["owner"])
    review_data["name"] = owner.first_name + " " + owner.last_name

    # Add the book information to the data.
    book = Book.objects.get(id=review_data["book"])
    # Convert the Book object to a Python dictionary.
    book = BookSerializer(book).data
    review_data["book"] = book

    return review_data

