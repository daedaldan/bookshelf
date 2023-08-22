from django.shortcuts import render

from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from .serializers import BookSerializer, ReviewSerializer

# Create your views here.
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def post_review_view(request):
    serializer = ReviewSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)
