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

class DocumentHandler(BaseHandler):
    
    def get(self):
#         username = self.get_secure_cookie("ck_user")
#         if not username:
#             self.redirect(self.get_login_url())
#         else:
        self.render("document.html")
    