import tornado.httpserver   
import tornado.ioloop   
import tornado.options   
import tornado.web   
import os
import base64
import uuid
import sys
from conf import settings
from tornado.options import define, options   
from handler.displayhandler import DisplayHandler,LoginHandler
from handler.managehandler import ManageHandler
from handler.ajaxhandler import GetCrawlerRunningInfoHandler,\
                                GetLogShowByLevel,CrawlerControlAction,CrawlerListRefresh

import time
import datetime
from crawlerkeeper.core.config import CenterConfig
from crawlerkeeper.settings import CrawlerSettings
from crawlerkeeper.core.keeper import CenterKeeper
from handler.documenthandler import DocumentHandler

reload(sys)                         # 2
sys.setdefaultencoding('utf-8')     # 3

# define listen port
define("port", default=9090, help="run on the given port", type=int)

class IndexHandler(tornado.web.RequestHandler):   
    def get(self):   
        greeting = self.get_argument("greeting", "Hello")   
        self.write(greeting +", friendly user!")   
  
class TvApplication(tornado.web.Application):

    def __init__(self):
        settings = {
            "static_path": os.path.join(os.path.dirname(__file__), "static"),
#             "domain": WEB_SERVER_CONFIG['domain'],
            "template_path": os.path.join(os.path.dirname(__file__), "template"),
            "cookie_secret": base64.b64encode(uuid.uuid4().bytes + uuid.uuid4().bytes),
            "xsrf_cookies": False,
            "login_url": "/login",
            "debug" : True,
            "system_name": "CrawlerKeeper",
#             "debug": DEBUG_OPTION, #changeTo False if online
        }
        handlers = [
                   (r"/", DisplayHandler),
                   (r"/manage",ManageHandler),
                   (r"/ajax/getcrawlerinfo",GetCrawlerRunningInfoHandler),
                   (r"/ajax/getlogshowbylevel",GetLogShowByLevel),
                   (r"/ajax/crawlercontrolaction",CrawlerControlAction),
                   (r"/ajax/crawlerlistrefresh",CrawlerListRefresh),
#                    (r"/",LoginHandler),
                   (r"/login",LoginHandler),
                   (r"/document",DocumentHandler)
               ]
        tornado.web.Application.__init__(self, handlers, **settings)
  
def init_crawler_keeper():
    c_settings = CrawlerSettings(settings)
    config = CenterConfig(c_settings)
    keeper = CenterKeeper.instance()
    keeper.initialize(config)
  
if __name__ == "__main__":   
    init_crawler_keeper()
    tornado.options.parse_command_line()   
    http_server = tornado.httpserver.HTTPServer(TvApplication())   
    http_server.listen(options.port)   
    tornado.ioloop.IOLoop.instance().start()  
#     from tornado.template import Template
#     
#     t  = Template("{{myvalue}}")
#     print t.generate(myvalue = "helloword")
    
