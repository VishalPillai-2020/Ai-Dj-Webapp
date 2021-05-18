song = "";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
score_leftWrist = "";
score_rightWrist = "";
volume_info = document.getElementById("volume_info");
speed_info = document.getElementById("speed_info");

function preload() {
    song = loadSound("music.mp3");

}

function setup() {
    video = createCapture(VIDEO);
    video.hide();
    canvas = createCanvas(600, 500);
    canvas.center();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Posenet is Initialized");
}

function gotPoses(results) {
    if (results.length > 0) {

        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log(score_leftWrist);
        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY + " rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("grey");
    stroke("black");
    if (score_leftWrist > 0.2) {

        circle(leftWristX, leftWristY, 20);
        leftwristy_number = Number(leftWristY);
        leftwristy_number = floor(leftwristy_number);
        divide = leftwristy_number / 500;
        divide = Number(divide.toFixed(1));
        volume_info.innerHTML = "volume =  " + divide;
        if (!song.isPlaying()) {
            song.play()

        }
        song.setVolume(divide);

    }
    if (score_rightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        if (rightWristY > 0 && rightWristY <= 100) {
            song.rate(0.5);
            speed_info.innerHTML = "The current speed is 0.5x";
        } else if (rightWristY > 100 && rightWristY <= 200) {
            song.rate(1);
            speed_info.innerHTML = "The current speed is 1x";
        } else if (rightWristY > 200 && rightWristY <= 300) {
            song.rate(1.5);
            speed_info.innerHTML = "The current speed is 1.5x"
        } else if (rightWristY > 300 && rightWristY <= 400) {
            song.rate(2);
            speed_info.innerHTML = "The current speed is 2x"
        } else if (rightWristY > 400) {
            song.rate(2.5);
            speed_info.innerHTML = "The current speed is 2.5x"
        }

    }

}

function play() {
    song.setVolume(1.0);
    song.rate(1.0);
    song.play();
}