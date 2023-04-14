from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

app = Flask(__name__)
app.secret_key = 'BAD_SECRET_KEY'                   ## Replace this with a Real Secret Key AND can put in a .env file
                                                    ## Run python -c 'import os; print(os.urandom(16))' to get a random password
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db_name.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

metadata = MetaData(naming_convention={
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_`%(constraint_name)s`",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
    })

db = SQLAlchemy(metadata=metadata)

CORS(app)
migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)
api = Api(app)