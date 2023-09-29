status="";
img="";
object=[];
function preload(){
    img=loadImage("bedroom.jpg");
}
function setup(){
    canvas=createCanvas(640,420);
    canvas.center();

    objectDetector=ml5.objectDetector("cocossd",modalloaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modalloaded(){
    console.log("Modal is loaded");
    status=true;
    objectDetector.detect(img,gotresults);
}
function gotresults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}
function draw(){
    image(img,0,0,640,420);

    if(status=="true"){
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Status:Objects Detetected";
            fill("red");
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke("red");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}
