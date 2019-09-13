from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_migrate import Migrate
import yaml
import os

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)

config = {}

with open(os.path.join(os.path.dirname(basedir), 'config-dev.yaml') ) as config_file:
    config = yaml.safe_load(config_file)
    db_config = config['db_server']

url = "sqlite:///" + db_config
app.config['SQLALCHEMY_DATABASE_URI'] = url
app.config['SECRET_KEY'] = "mysecret"
db = SQLAlchemy(app)
migrate = Migrate(app, db)

#Import db models
from app.models import Transaction, Mode, Type, Cycle
from app.api import *

# set optional bootswatch theme
app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'

admin = Admin(app)
admin.add_view(ModelView(Transaction, db.session))
admin.add_view(ModelView(Type, db.session))
admin.add_view(ModelView(Mode, db.session))
admin.add_view(ModelView(Cycle, db.session))