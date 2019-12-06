from os import environ
from multiprocessing import cpu_count

bind = "0.0.0.0:{port}".format(port=environ.get('PORT', '8080'))
workers = cpu_count() * 2 + 1
