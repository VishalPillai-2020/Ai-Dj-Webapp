song_1 = "";
song_2 = "";
rightwristx = "";
rightwristy = "";
leftwristx = "";
leftwristy = "";
score_leftWrist = "";
score_rightWrist = "";
song_name_element = document.getElementById("song_name");
var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = true;
function preload() {
    song_1 = loadSound("DarkSide.mp3");
    song_2 = loadSound("Sorry.mp3");
}

function showhelp() {

    p_1 = document.getElementById("p_1");
    p_1.innerHTML = "<span>To play the song Sorry get your left wrist <br>in front of the webcam and to play the song<br> Darkside get your right wrist in front of the webcam </span>";
}

function disablehelp() {
    p_1.innerHTML = "Help";
}

function setup() {
    start()
    video = createCapture(VIDEO);
    video.hide();
    canvas = createCanvas(500, 350);
    canvas.center();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);

}

function modelLoaded() {
    console.log("PoseNet Model Is Initialized");

}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of Left Wrist = " + score_leftWrist + " Score of right wrist = " + score_rightWrist);
        console.log("Right Wrist X = " + rightwristx + " Right Wrist Y = " + rightwristy + " Left Wrist X = " + leftwristx + " Left Wrist Y = " + leftwristy);

    }
}

function draw() {
    image(video, 0, 0, 500, 400);
    if (score_leftWrist > 0.2 && !song_2.isPlaying()) {
        song_1.stop();
        song_2.play();
        song_name_element.innerHTML = "The Current Playing Song Is 'Sorry'";


    } 
    else if (score_rightWrist > 0.2 && !song_1.isPlaying()) {
        song_2.stop();
        song_1.play();
        song_name_element.innerHTML = "The Current Playing Song Is 'DarkSide'";
    
    }
}

function play_1() {
    song_name_element.innerHTML = "The Current Playing Song Is";
    song_2.stop();
    song_1.stop();
    song_2.play();
    song_name_element.innerHTML += " 'Sorry'";
}

function play() {
    song_name_element.innerHTML = "The Current Playing Song Is";
    song_1.stop();
    song_2.stop();
    song_1.play();
    song_name_element.innerHTML += " 'DarkSide'";
}


function start() {
    recognition.start();

}
recognition.onresult = function run(event) {
    console.log(event);

    var Content = event.results[0][0].transcript;

    console.log(Content);
    if (Content == "Stop" || Content == "stop the song") {
        stopthesongs ()
    }

}
function stopthesongs (){
    song_1.stop();
    song_2.stop();
}


