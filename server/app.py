#!/usr/bin/env python3

import os 
from flask import jsonify, make_response, request, g, current_app, redirect, abort, session
from flask_restful import Resource
import json
from sqlalchemy.exc import IntegrityError
from config import app,bcrypt,db,api
from models import User, Classname

    ###########################################
    ##                Home API               ##
    ###########################################

class Home(Resource):
    def get(self):
        andez_dict = '''
            <h1>"message": "Welcome to the Andez RESTful API"</h1>
        '''
        response = make_response(andez_dict, 200)
        return response
api.add_resource(Home, '/')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

    ###########################################
    ##            Logging in/Out             ##
    ##   Session, Authenticating, Password   ##
    ###########################################

@app.before_request
def check_if_logged_in():
    access_list = ['clear', 'signup', 'check_session', 'login', ]
    if (request.endpoint) not in access_list and (not session.get('user_id')):   
        return {'error': 'Unauthorized'}, 401

class ClearSession(Resource):
    def delete(self):    
        session['page_views'] = None
        session['user_id'] = None
        return {}, 204
api.add_resource(ClearSession, '/clear', endpoint='clear')  

class Signup(Resource):
    def post(self):
        username = request.get_json()['username']  
        password = request.get_json()['password']
        if username and password:
            new_user = User(username=username)
            new_user.password_hash = password
            try:
                db.session.add(new_user)
                db.session.commit()
                session['user_id'] = new_user.id
                return new_user.to_dict(), 201
            except IntegrityError:
                return {'error': '422 Unprocessable Entity'}, 422
        return {'error': '422 Unprocessable Entity'}, 422
api.add_resource(Signup, '/signup', endpoint='signup')

class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session.get('user_id')).first()
            return user.to_dict(), 200  ## OR ## return jsonify(user.to_dict()), 200 ##
        return {'message': '401 Unauthorized'}, 401  ## OR ## return jsonify({'message': '401: Not Authorized'}), 401 ##
api.add_resource(CheckSession, '/check_session', endpoint='check_session')

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200     ## OR ## return jsonify(user.to_dict()), 200 ##
        return {'error': '401 Unauthorized'}, 401
api.add_resource(Login, '/login', endpoint='login')

class Logout(Resource):
    def delete(self): 
        if session.get('user_id'):
            session['user_id'] = None
            return {'message': '204: No Content'}, 204  ## OR ## return jsonify({'message': '204: No Content'}), 204 ##
        return {'error': '401 Unauthorized'}, 401
api.add_resource(Logout, '/logout')

    ###########################################
    ##        GET, POST, PATCH, DELETE       ##
    ###########################################

