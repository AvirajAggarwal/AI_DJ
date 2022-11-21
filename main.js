song="";
LeftWristX=0;
RightWristY=0;
LeftWristY=0;
RightWristX=0;
scoreLeftWrist=0;

function setup()
{
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose', gotPoses);
}
function draw()
{
    image(video,0,0,600,500);
    fill("red");
    stroke("red");

    if (scoreLeftWrist > 0.2)
    {
        circle(LeftWristX,LeftWristY,20);
        InNumber=Number(LeftWristY);
        remove_decimals=floor(InNumber);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="volume = " + volume;
        song.setVolume(volume);

    }
    
}
function preload()
{
    song=loadSound("music.mp3");
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded()
{
  console.log('PoseNet is initialized');
}
function gotPoses(results)
{
if(results.length>0)
{
    console.log(results);
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist = " + scoreLeftWrist);

    LeftWristX=results[0].pose.leftWrist.x;
    LeftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX=   "+ LeftWristX + "leftWristY= " + LeftWristY)

    RightWristX=results[0].pose.rightWrist.x;
    RightWristY=results[0].pose.rightWrist.y;
    console.log("rightWristX=" + RightWristX + "rightWristY=" + RightWristY )


}
}
