# project RedRaven   This is fredraven.py  

import sys
from flask import Flask, render_template, request

app = Flask(__name__)

SONGS = [ # this is the python version of redraven.html's static/ravendata.js 
  "1,Tootles the Tug,rr1c.jpg,15",
  "2,Little red Engine,rr2c.jpg,16",
  "3,Old McDonald,rr3c.jpg,16",
  "4,Little White Duck,rr4c.jpg,16",
  "5,Birthday Part 1,rr5c.jpg,16",
  "6,Birthday Part 2,rr6c.jpg,16",
  "7,Sidewalks of New York,rr7c.jpg,16",
  "8,Bicycle Built for Two,rr8c.jpg,16",
  "9,Me and my Teddy Bear,rr9c.jpg,16",
  "10,Teddy Bears' Picnic,rr10c.jpg,16",
  "11,Merry-Go-Round,rr11c.jpg,16",
  "12,Parade of the Wooden Soldiers,rr12c.jpg,16",
  "13,Mary Had a Little Lamb,rr13c.jpg,15",
  "14,Three Blind Mice,rr14c.jpg,16",
  "15,Three Little Kittens,rr15c.jpg,16",
  "16,Little Bo-Peep,rr16c.jpg,16",
  "17,Rudolf Reindeer,rr17c.jpg,16",
  "18,Frosty Snowman,rr18c.jpg,17",
  "19,Santa Claus,rr19c.jpg,17",
  "20,Suzy Snowflake,rr20c.jpg,17",
  "21,Easter Bunny,rr21c.jpg,16",
  "22,Chocl'late Rabbit,rr22c.jpg,16",
  "23,Easter Chick,rr23c.jpg,16",
  "24,Peter Cottontail,rr24c.jpg,16"
];
canvasSize = 620  # canvas is a square

@app.route("/")
@app.route("/animation", methods=["GET", "POST"])
def index():
    songs = list(map(lambda x: x.split(","),SONGS))
    return render_template("findex.html", songs=songs, x=canvasSize)

@app.route("/about")
def about():
    return render_template("about.html")

if __name__ == "__main__":
    if sys.argv[1:]: # need the slice here, else list index out of range
        canvasSize = int(sys.argv[1:][0]) # need the slice, else returns the first char 
    print(f"canvasSize: {canvasSize}")
    app.run(debug=True)

