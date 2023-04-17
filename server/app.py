#!/usr/bin/env python3

import os 
from flask import jsonify, make_response, request, session, g, current_app, redirect, abort
from flask_restful import Resource
import json
from sqlalchemy.exc import IntegrityError
from config import app,bcrypt,db,api
from models import User, User

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

# class ClearSession(Resource):     ## For DEV Only. Don't want users to be able to clear their cookies. 
#     def delete(self):    
#         session['user_cart'] = None
#         session['user_id'] = None
#         return {}, 204
# api.add_resource(ClearSession, '/clear', endpoint='clear')  

class Signup(Resource):
    def post(self):
        username = request.get_json()['username']  
        password = request.get_json()['password']
        email = request.get_json()['email']
        shipping_address = request.get_json()['shipping_address']
        if username and password:
            new_user = User(username=username, email=email, shipping_address=shipping_address, account_balance=5)
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
            return user.to_dict(), 200 
        return {'message': '401 Unauthorized'}, 401 
api.add_resource(CheckSession, '/check_session', endpoint='check_session')

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200 
        return {'error': '401 Unauthorized'}, 401
api.add_resource(Login, '/login', endpoint='login')

class Logout(Resource):
    def delete(self):       ## Different from Deleting a User. 
        if session.get('user_id'):
            session['user_id'] = None
            return {'message': '204: No Content'}, 204
        return {'error': '401 Unauthorized'}, 401
api.add_resource(Logout, '/logout')

    ###########################################
    ##        GET, POST, PATCH, DELETE       ##
    ###########################################

class Users(Resource):          
    def get(self):                      ## DEV Only. Don't want Users to be able to look up all other users
        user_dict_list = []
        for user in User.query.all(): 
            user_dict_list.append(user.to_dict())
        if user_dict_list != []:
            response = make_response(jsonify(user_dict_list), 200)
            return response
        else:
            return_obj = {"valid": False, "Reason": "Can't query User data"}                 
            return make_response(jsonify(return_obj),500)  

    # def post(self):  
    #     ## See Signup and Login above. Should be no other reasons to post, so I will not add the generic post funciton here. 

api.add_resource(Users, '/users')

class UserById(Resource):       ## For users to see their profiles
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if user:
            classname_dict = user.to_dict()
            response = make_response(jsonify(classname_dict, 200))
            return response
        return make_response(jsonify({"error": "User Record not found"}), 404)

    def patch(self, id):        ## For Updating email, shipping_address, and account_balance ONLY
        user = User.query.filter(User.id == id).first()
        if user:
            data=request.get_json() 
            try:                                        
                for attr in data:
                    setattr(user, attr, data[attr]) 
                db.session.add(user) 
                db.session.commit() 
            except Exception as e:
                return make_response({"errors": [e.__str__()]}, 422)
            classname_dict = user.to_dict()
            response = make_response(jsonify(classname_dict), 201)
            return response 
        return make_response(jsonify({"error": "User Record not found"}), 404)

    def delete(self, id):       ## To Delete a User, not just Logging them Out 
        user = User.query.filter(User.id == id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            classname_dict = {"message": "User Record successfully deleted"}
            return make_response(classname_dict, 200)
        return make_response(jsonify({"error": "User Record not found"}), 404)

api.add_resource(UserById, '/users/<int:id>')