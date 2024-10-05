from django.urls import path
from . import views

urlpatterns = [
    path('user/register', views.CreateUserView.as_view(), name='create'),
    path('notes/', views.NoteListCreate.as_view(), name='note-list'),
    path('notes/delete/<int:pk>', views.NoteDelete.as_view(), name='note-delete'),
]