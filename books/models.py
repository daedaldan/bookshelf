from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
    """A book read by one or more users."""
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    year = models.PositiveIntegerField()
    genre = models.CharField(max_length=200)
    description = models.TextField()
    # A URL to the image of the book cover.
    cover = models.URLField(null=True)

    def __str__(self):
        return "'" + self.title + "'" + " by " + self.author


class Review(models.Model):
    """A user's review of a book."""
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.CharField(max_length=200)

    # Link the Review to the User who wrote it and the Book it is for.
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    book = models.ForeignKey(Book, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title + ": " + self.description
