from app.api.access import aptitude_blueprint
from app.api.roadmap import roadmap_blueprint
from quart import Quart
from quart_cors import cors

app=Quart(__name__)
app=cors(app, allow_origin="*")
app.register_blueprint(aptitude_blueprint,url_prefix="/api")
app.register_blueprint(roadmap_blueprint,url_prefix="/api")


if __name__ == "__main__":
    app.run(debug=True)