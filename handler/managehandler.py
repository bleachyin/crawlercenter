#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# Copyright 2013 DuoKan
#

import tornado
from basehandler import BaseHandler
from crawlerkeeper.core.keeper import CenterKeeper
# class IndexHandler(tornado.web.RequestHandler):   
#     def get(self):   
#         greeting = self.get_argument("greeting", "Hello")   
#         self.write(greeting +", friendly user!")   

class ManageHandler(BaseHandler):
    
    def get(self):
        username = self.get_secure_cookie("ck_user")
        if not username:
            self.redirect(self.get_login_url())
        else:
            client_cluster = CenterKeeper.instance().client_cluster
            crawlerlist = []
            for servicename,client in client_cluster.items():
                crawlerinfo = {}
                crawlerinfo['servicename'] = servicename
                running_info = client.get_running_info()
                if running_info:
                    crawlerinfo['status'] = running_info['running_status']
                else:
                    crawlerinfo['status'] = 0
                crawlerlist.append(crawlerinfo)
            self.render("manage.html", crawlerlist=crawlerlist)
        
