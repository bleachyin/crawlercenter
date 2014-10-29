import logging

# ZK_CONF = {"server": "127.0.0.1:2181",
#            "path": {
#             "/mitv/crawler":RPC_TVSERVICE_NAME
#            }}

ZOOKEEPER_SERVER = "127.0.0.1:2181"
ZOOKEEPER_PATH = "/mitv/crawler"

THRIFT_DEBUG = True
THRIFT_SERVER_HOST="localhost:6888"
THRIFT_SERVER_NAME = "crawlerkeeper"

REDIS_SERVER_HOST = "localhost:6379"
REDIS_SERVER_DB = 1