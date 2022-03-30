from flask import Flask
import logging
import sys
from ddtrace import tracer
import time

# Have flask use stdout as the logger
main_logger = logging.getLogger()
main_logger.setLevel(logging.DEBUG)
c = logging.StreamHandler(sys.stdout)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
c.setFormatter(formatter)
main_logger.addHandler(c)

app = Flask(__name__)





@tracer.wrap(service="my-sandwich-making-svc", resource="root")
@app.route('/')
def api_entry():
    return 'Entrypoint to the Application'


@tracer.wrap(service="my-sandwich-making-svc", resource="apm")
@app.route('/api/apm')
def apm_endpoint():
    tracer.set_tags({"customer": "123456789"})
    adding()
    return 'Getting APM Started'




@app.route('/api/trace')
def trace_endpoint():
    return 'Posting Traces'

@tracer.wrap(service="my-sandwich-making-svc", resource="adding")
def adding():
    time.sleep(.1)
    var = 1234567890 + 1234567890
    tracer.set_tags({"varValue": str(var)})
    minus()
    return var

@tracer.wrap(service="my-sandwich-making-svc", resource="minus")
def minus():
    time.sleep(.1)
    var = 1234567890 - 1234567880
    tracer.set_tags({"varValue": str(var)})
    return var


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5050')
