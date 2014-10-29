#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# Copyright 2013 DuoKan
#

import tornado
from handler.basehandler import BaseHandler
# class IndexHandler(tornado.web.RequestHandler):   
#     def get(self):   
#         greeting = self.get_argument("greeting", "Hello")   
#         self.write(greeting +", friendly user!")   

class DisplayHandler(BaseHandler):
    
    def get(self):
#         username = self.get_secure_cookie("ck_user")
#         if not username:
#             self.redirect(self.get_login_url())
#         else:
        self.render("display.html")
        
        
class LoginHandler(BaseHandler):
    
    def get(self):
        self.render('login.html', error=False)
    
    def _auth(self,username,password):
        if username == "ckadmin" and  password=="123456":
            return True
        else:
            return False
    
    def post(self):
        username = self.get_argument("name", "")
        password = self.get_argument("pwd", "")
        # The authenticate method should match a username and password
        # to a username and password hash in the database users table.
        # Implementation left as an exercise for the reader.
        auth = self._auth(username, password)
        if auth:
            self.set_current_user(username)
            self.set_secure_cookie("ck_user",username,expires_days=1)
            self.redirect("/")
        else:
            error_msg = u"?error=" + tornado.escape.url_escape("Login incorrect.")
            self.redirect(u"/login" + error_msg)

    def set_current_user(self, user):
        if user:
            self.set_secure_cookie("user", tornado.escape.json_encode(user))
        else:
            self.clear_cookie("user")
            
