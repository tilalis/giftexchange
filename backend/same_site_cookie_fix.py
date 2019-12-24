from werkzeug.http import dump_cookie
from flask.wrappers import Response


# That's a workaround for explicitly setting SameSite to None
# Until the following fix is released: https://github.com/pallets/werkzeug/issues/1549
def set_cookie(response, *args, **kwargs):
    cookie = dump_cookie(*args, **kwargs)

    if 'samesite' in kwargs and kwargs['samesite'] is None:
        cookie = "{}; {}".format(cookie, b'SameSite=None'.decode('latin1'))

    response.headers.add(
        'Set-Cookie',
        cookie
    )


Response.set_cookie = set_cookie
