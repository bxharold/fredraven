// ravencode.js

  function fudge(canvasSize) {  // adjustment for inner circle mask
    return (0.27 * canvasSize - 3.5)
  }

  function mask() {
    ctx.restore(); ctx.save();       // pop/push to re-initialize ?
    ctx.beginPath(); // top arc,cw; rhs,drop; bottom arc,ccw; left riser
    outerrad = y/2 - 12; innerrad = y/2 - fudge(x); phi = (Math.PI - theta)/2
    ctx.arc(x/2, y/2, outerrad, 1.5 * Math.PI-theta/2, 1.5 * Math.PI+theta/2);
    ctx.lineTo(x/2 + innerrad*Math.cos(phi), y-(y/2+innerrad * Math.sin(phi)));
    ctx.arc(x/2, y/2, innerrad, 1.5*Math.PI+theta/2, 1.5*Math.PI-theta/2, true);
    ctx.closePath();
    ctx.stroke()
    ctx.clip()
  }

  function step() {
    f = x/2; g = y/2;   
    ctx.translate(x/2, y/2)
    ctx.rotate(2 * Math.PI / FPR)
    ctx.drawImage(img, -x/2, -y/2, x, y); 
    ctx.translate(-x/2, -y/2)
  }

  var timer = 0
  // msPerFrame = 48  // depends on RPM (12/20/2023)
  RPM = 78
    // 78 rev  16 fr  
    // 60  sec  1 rev  ==> 78*16/60=20.8 fr/sec ==>  1 fr / .048 sec ==> 1 fr/48 ms
    // check. sleepy calculation was 1000/22=.45; a nice pace was 1000/11=0.91
  msPerFrame = 1/(RPM*16/60/1000) // will be reset in loop if prompt()ed

  function loop() {
    // msPerFrame = prompt("ms/fr? 45 is correct; 91 is relaxed", msPerFrame )
    RPM = Number(RPM)  // prompt() returns a string
    msPerFrame = 1/(RPM*16/60/1000)
    timer = setInterval(step, msPerFrame )
    console.log(msPerFrame)
    document.getElementById("loop").setAttribute("disabled", "disabled");
    document.getElementById("stop").removeAttribute("disabled")
  }

  function stop() {
    clearTimeout(timer);
    document.getElementById("stop").setAttribute("disabled", "disabled");
    document.getElementById("loop").removeAttribute("disabled")
  }

  function feedback(m) { document.getElementById("feedback").innerHTML = m }
  function myOver(i) { feedback(songs[i])  }
  function myOut(i)  { feedback("")        }

  function whichServer() {
    console.log(window.location.href)
    if (window.location.href.match(":5[0-9]{3}/")) {
      console.log("Running on python/flask server   " + window.location.href )
      document.getElementById("http8080").style.display="none"
    } else {
      console.log("Running on http server   " + window.location.href )
      document.getElementById("flask5000").style.display="none"
    }
  }

  function diskChooser() {
    var e = document.getElementById("disks");
    var i = e.selectedIndex     // naughty... s/b value changing 12/15
    var i = e.value     // changing 12/15
    var t = "Disk " + e.options[i].value + "v;t" + e.options[i].text
    feedback(t);
    loadIndexed(i-1)  // selection list begins with disabled entry
  }

  function load(filename) {
    console.log(filename)
    img.src = "static/"+filename   // 12/6/2023, added static/ for flask move
    ctx.drawImage(img, -x/2, -y/2, x, y);
    ctx.save();       // initialize 
  }
  function loadIndexed(i) {
    var song = songs[i].toString().split(",") // format: buttonLabel, title, imgFileName,FPR
    document.getElementById("songdata").innerHTML = song
    filename = song[2]
    FPR = song[3]
    document.getElementById("disks").selectedIndex=i+1
    load(filename)
  }
  /*
  HiMac2:~/garden/fredraven python3  -m http.server 8080
  http://127.0.0.1:8080/redraven.html
  http://127.0.0.1:8080/static/ravencode.js
     // js is not refreshed until server is restarted (?)

  HiMac2:~/garden/fredraven python3 fredraven.py 820
  http://127.0.0.1:5000/
  */
