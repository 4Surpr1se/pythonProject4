from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.renderers import TemplateHTMLRenderer, JSONRenderer
from rest_framework.response import Response


# Create your views here.

class Index(ListAPIView):
    renderer_classes = [JSONRenderer, TemplateHTMLRenderer]
    def list(self, request, *args, **kwargs):
        return Response({'as': 23}, template_name='index.html')
