#!/usr/bin/env python3

import os 
from flask import jsonify, make_response, request, g, current_app, redirect, abort, session
from flask_migrate import Migrate
from flask_restful import Resource
import json
from sqlalchemy.exc import IntegrityError
from config import app,bcrypt,db,api
from models import User, Classname

                       ###################   INSERT   ################## 
  ## See further Below ###### Routes, GET, POST, PATCH, DELETE, Etc ####  ## See further Below ##
                       ####################   HERE   ###################

if __name__ == '__main__':
    app.run(port=5555, debug=True)