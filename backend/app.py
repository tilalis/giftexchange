import settings
import secrets as random

from hashlib import md5
from zlib import adler32

from flask import Flask, Blueprint, request, jsonify, make_response

from models import db, orm, Box, Savta

api = Blueprint('savta', __name__)


@api.route('/box', methods=["POST"])
@orm.db_session
def create_box():
    if not request.is_json:
        return {"error": "WrongDataType", "message": "Data must be JSON!"}, 400

    name = request.json.get('name')
    savtas = request.json.get('savtas')

    if not name or not savtas:
        return {"error": "WrongDataType", "message": "JSON should contain non-empty 'name' and 'savtas' fields!"}

    box = Box(
        name=name,
    )

    # Shorter hash for Box object
    box.hash = hex(adler32((
        name + str(hash(box))
    ).encode()))[2:]

    # Need to change the algorithm, this one is quite ugly
    names = list(set(savtas))
    nekheds = names.copy()

    shuffled = {}

    for name in names:
        nekhed = random.choice(nekheds)
        while name == nekhed:
            nekhed = random.choice(nekheds)

        nekheds.remove(nekhed)

        shuffled[name] = nekhed

    savtas = {
        name: Savta(box=box, name=name)
        for name in names
    }

    orm.commit()

    for name, savta in savtas.items():
        nekhed_name = shuffled[name]

        savta.nekhed = savtas[nekhed_name]

        # Longer hash for Savta
        savta_hash = md5((
            str(box.id) + name + nekhed_name + str(hash(savta))
        ).encode()).hexdigest()

        savta.hash = savta_hash

    response = make_response(jsonify({
        "box": box.hash,
        "savtas": [
            {
                "name": savta.name,
                "hash": savta.hash
            } for savta in box.savtas
        ]
    }))

    boxes = request.cookies.get('boxes', '')

    response.set_cookie(
        "boxes",
        ";".join([box.hash] + boxes.split(';')),
        max_age=2147483647,
        secure=True,
        samesite=None
    )

    return response


@api.route("/box/<box_hash>", methods=["GET"])
@orm.db_session
def get_box(box_hash):
    box = Box.get(hash=box_hash)

    if box is None:
        return {"message": "There is no such box '{}'".format(box_hash), "error": "NoSuchBox"}, 400

    hashes = {
        "box": box.hash,
        "savtas": [{
            "name": savta.name,
            "hash": savta.hash
        } for savta in box.savtas]
    }

    return jsonify(hashes)


@api.route("/savta/<savta_hash>", methods=["GET"])
@orm.db_session
def get_name(savta_hash):
    savta = Savta.get(hash=savta_hash)

    key = md5((
        str(savta.id) + savta.name
    ).encode()).hexdigest()

    cookie = request.cookies.get(key)

    if savta.letter_opened and cookie != savta.hash:
        return jsonify({
            "error": "ErrorAlreadyOpen",
            "message": "Name is already open"
        }), 400

    if cookie is None:
        savta.letter_opened = True

    response = make_response(jsonify({
        "box": savta.box.hash,
        "name": savta.name,
        "nekhed": savta.nekhed.name,
    }))

    response.set_cookie(key, savta.hash, max_age=2147483647, secure=True, samesite=None)

    return response


@api.before_app_first_request
def before_first_request():
    db.bind(**settings.DB)
    db.generate_mapping(create_tables=True)


@api.after_request
def after_request(response):
    response.headers.add(
        'Access-Control-Allow-Origin',
        request.environ['HTTP_ORIGIN'] if 'HTTP_ORIGIN' in request.environ else '*'
    )
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


app = Flask(__name__)
app.register_blueprint(api, url_prefix='/api')

if __name__ == '__main__':
    app.run(threaded=True)
