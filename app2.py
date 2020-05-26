import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import pandas as pd

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/FINALdb.sqlite"
db = SQLAlchemy(app)


Base = automap_base()

Base.prepare(db.engine, reflect=True)
print(Base.classes.keys())

covid_case = Base.classes.case


def data_table(covid_case):
    sel = [
        covid_case.date,
        covid_case.state,
        covid_case.positive,
        covid_case.negative,
        covid_case.pending,
        covid_case.currentlyHospitalized,
        covid_case.recovered,
        covid_case.deaths
    ]

    results = db.session.query(*sel)
    
    cases_list = []
    for result in results:
        covid_case = {}
        covid_case["date"] = result[0]
        covid_case["states"] = result[1]
        covid_case["negative"] = result[2]
        covid_case["positive"] = result[3]
        covid_case["pending"] = result[4]
        covid_case["currentlyHospitalized"] = result[5]
        covid_case["recovered"] = result[6]
        covid_case["deaths"] = result[7]
        cases_list.append(covid_case)
    
    return cases_list

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)

