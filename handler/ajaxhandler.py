#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# Copyright 2013 DuoKan
#

import tornado
import datetime
import logging
import ujson
from crawlerkeeper.core.keeper import CenterKeeper
from crawlerkeeper.notify.redismanager import RedisManager
from crawlerkeeper.common.jsonconst import THRIFT_STATUS_SUCCESS ,THRIFT_STATUS_ERROR 
# class IndexHandler(tornado.web.RequestHandler):   
#     def get(self):   
#         greeting = self.get_argument("greeting", "Hello")   
#         self.write(greeting +", friendly user!")   

class GetCrawlerRunningInfoHandler(tornado.web.RequestHandler):
    
    def post(self):
        try:
            servicename = self.get_argument("servicename")   
            client_cluster = CenterKeeper.instance().client_cluster
            crawler_client = client_cluster.get(servicename)
            status_info = {}
            if crawler_client:
                status_info = crawler_client.get_running_info()
                status_info['crawler_name'] = servicename
                start_time = status_info['start_time']
                dt = datetime.datetime.fromtimestamp(start_time)
                status_info['start_time'] = dt.strftime("%Y-%m-%d %H:%M:%S")
                status_info["res_status"] =  True
        except Exception as ex:
            status_info["res_status"] = False
        finally:
            self.write(status_info)      
            
            
class GetLogShowByLevel(tornado.web.RequestHandler):
    
    def post(self):
        status_info  = {}
        try:
            servicename = self.get_argument("servicename")
            logs = []   
            levelname = self.get_argument("level","info")
            levelno = logging.INFO
            if levelname == "debug":
                levelno = logging.DEBUG
            elif levelname == "warn":
                levelno = logging.WARN
            elif levelname == "error":
                levelno = logging.ERROR
            logs = RedisManager.instance().get_logo(servicename,levelno)#default 300
            status_info["res_status"] =  True
            status_info["logs"] =  logs
        except Exception as ex:
            status_info["res_status"] = False
        finally:
            self.write(status_info)      
        
class CrawlerControlAction(tornado.web.RequestHandler):
    
    def post(self):
        status_info  = {}
        try:
            servicename = self.get_argument("servicename")
            action = self.get_argument("action")
            res_flag = THRIFT_STATUS_ERROR
            client_cluster =  CenterKeeper.instance().client_cluster
            client = client_cluster.get(servicename)
            if client:
                if action == "start":
                    res_flag = client.start()
                elif action == "pause":
                    res_flag = client.pause()
                elif action == "resume":
                    res_flag = client.resume()
                elif action == "stop":
                    res_flag = client.stop()
            if res_flag == THRIFT_STATUS_SUCCESS:
                status_info["res_status"] =  True
            else:
                status_info['res_status'] =  False
        except Exception as ex:
            status_info["res_status"] = False
        finally:
            self.write(status_info)     
            
class CrawlerListRefresh(tornado.web.RequestHandler):
    
    def post(self):
        crawler_list_template = """ 
                    <tr class="crawler_list">
                        <td><button class="btn btn-success btn-crawler" value="%s">%s</button></a></td>
                        <td><label class="label label-%s">%s</label>
                        <td><button class="btn btn-info btn-crawler-start" title="启动"><i class="icon-white icon-play" ></i></button>
                                 <button class="btn btn-info btn-crawler-pause" title="暂停"><i class="icon-white icon-pause"></i></button>
                                 <button class="btn btn-info btn-crawler-stop" title="停止"><i class="icon-white icon-stop"></i></button>
                                 <button class="btn btn-info btn-crawler-resume" title="重启"><i class="icon-white icon-repeat"></i></button>
                    </tr>
        """
        status_infos = []
        client_cluster = CenterKeeper.instance().client_cluster
        for servicename,crawler_client in client_cluster.items():
            try:
                if crawler_client:
                    status_info = crawler_client.get_running_info()
                    if status_info:
                        status = status_info['running_status']
                        label_class = "info"
                        label_content = "休眠中"
                        if status == 1:
                            label_class = "success"
                            label_content = "运行中"
                        elif status == 2:
                            label_class = "warning"
                            label_content = "暂停中"
                        elif status == 0:
                            label_class = "important"
                            label_content = "已停止"
                        template = crawler_list_template % (servicename,servicename,label_class,label_content)
                        status_info['crawler_name'] = servicename
                        start_time = status_info['start_time']
                        dt = datetime.datetime.fromtimestamp(start_time)
                        status_info['start_time'] = dt.strftime("%Y-%m-%d %H:%M:%S")
                        status_info['crawler_template']= template
                        status_info["res_status"] =  True
                        status_infos.append(status_info)
            except Exception as ex:
                continue
        self.write(ujson.dumps(status_infos))
        
