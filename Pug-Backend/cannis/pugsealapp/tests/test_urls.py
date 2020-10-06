from django.test import SimpleTestCase
from django.urls import reverse, resolve
from pugsealapp import views 

class TestUrls(SimpleTestCase):
    def test_crear_categoria_url_is_resolved(self):
        url = reverse('crear_categoria')
        print(resolve(url))