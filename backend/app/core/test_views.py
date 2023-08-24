from django.test import TestCase
from rest_framework.test import APIClient
from .models import Product

class ProductsAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list_products(self):
        Product.objects.create(name='Test Product 1', description='Test Description', price='9.99')
        Product.objects.create(name='Test Product 2', description='Test Description', price='9.99')

        response = self.client.get('/products/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b'[{"id":1,"name":"Test Product 1","description":"Test Description","price":"9.99"},'
                                           b'{"id":2,"name":"Test Product 2","description":"Test Description","price":"9.99"}]')

    def test_failed_create_product(self):
        response = self.client.post('/products/',
                                    {'name': '', 'description': 'Test Description', 'price': '9.99'})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.content, b'{"name":["This field may not be blank."]}')

    def test_create_product(self):
        response = self.client.post('/products/',
                                    {'name': 'Test Product', 'description': 'Test Description', 'price': '9.99'})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.content, b'{"id":1,"name":"Test Product","description":"Test Description","price":"9.99"}')

    def test_update_product(self):
        product = Product.objects.create(name='Test Product', description='Test Description', price='9.99')
        response = self.client.put(f'/products/{product.id}/', {'name': 'Updated Product', 'description':'Test Description', 'price':'9.99'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b'{"id":1,"name":"Updated Product","description":"Test Description","price":"9.99"}')

    def test_failed_update_product(self):
        product = Product.objects.create(name='Test Product', description='Test Description', price='9.99')
        response = self.client.put(f'/products/{product.id}/',
                                   {'name': '', 'description':'Update Test Description', 'price':'9.99' })
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.content, b'{"name":["This field may not be blank."]}')

    def test_delete_product(self):
        product = Product.objects.create(name='Test Product', description='Test Description', price='9.99')
        response = self.client.delete(f'/products/{product.id}/')
        self.assertEqual(response.status_code, 204)

    def test_failed_delete_product(self):
        response = self.client.delete(f'/products/1/')
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.content, b'{"detail":"Not found."}')

