const colours=["#db29ff","#ff0000","#ffff00","#0000ff","#00ff00","#ff8c00"];
/*
-1 - blank
0 - violet
1 - red
2 - yellow
3 - blue
4 - green
5 - orange
*/
var n=5;
var m=3;
var diff=20;
const small=document.getElementById("small");
const big=document.getElementById("big");
const audio=new Audio();

document.getElementById("hardmode").addEventListener("click", function name() {
    n=7;
    m=5;
    diff=30;
    big.style.gridTemplateRows="repeat(7,1fr)";
    big.style.gridTemplateColumns="repeat(7,1fr)";
    small.style.gridTemplateRows="repeat(5,1fr)";
    small.style.gridTemplateColumns="repeat(5,1fr)";
    small.innerHTML="";
    big.innerHTML="";
    reset();
    build();
    startGame();
})

document.getElementById("easymode").addEventListener("click", function name() {
    n=5;
    m=3;
    diff=15;
    big.style.gridTemplateRows="repeat(5,1fr)";
    big.style.gridTemplateColumns="repeat(5,1fr)";
    small.style.gridTemplateRows="repeat(3,1fr)";
    small.style.gridTemplateColumns="repeat(3,1fr)";
    small.innerHTML="";
    big.innerHTML="";
    reset();
    build();
    startGame();
})

function updateScoreBoard(){
    let table=document.getElementById("lb");
    let scores=new Array();
    for (let i=0; i<localStorage.length; i++){
        scores.push(parseInt(localStorage.key(i)));
    }
    scores.sort();
    if(localStorage.length<11){
        for (let i=0; i<localStorage.length; i++){
            let newrow=table.insertRow(i+1);

            var cl1=newrow.insertCell(0);
            var cl2=newrow.insertCell(1);

            cl1.innerHTML=localStorage.getItem(scores[i]);
            cl2.innerHTML=scores[i];
            
        }
    }
    else{
        for (let i=0; i<11; i++){
            let newrow=table.insertRow(i+1);

            var cl1=newrow.insertCell(0);
            var cl2=newrow.insertCell(1);

            cl1.innerHTML=localStorage.getItem(scores[i]);
            cl2.innerHTML=scores[i];
            
        }       
    }
    
}
updateScoreBoard();

var arr;
var sol;
function build() {
    //crearing the n*n array to store our grid
    arr= new Array(n);
    for (let i=0; i<n; i++){
        arr[i]=new Array(n);
    }
    //initialising the n*n array with random values from 0-5
    for (let i=0; i<n; i++){
        for (let j=0; j<n; j++){
            arr[i][j] = Math.floor(Math.random()*6);
        }
    }
    //setting last element to -1 as this is where the bland tile is gonna be
    arr[n-1][n-1]=-1;

    //creating the small grid + an array having the corresponding values to check commpletion at the end

    sol=new Array(m);
    for (let i=0; i<m; i++){
        sol[i]=new Array(m);
        for (let j=0; j<m; j++){
            const div1=document.createElement("div");
            div1.setAttribute('id',`s${i}${j}`);
            div1.setAttribute('class', 'stile');
            div1.style.background=colours[arr[(n-m)/2+i][(n-m)/2+j]];
            sol[i][j]=arr[(n-m)/2+i][(n-m)/2+j];
            small.append(div1);
        }   
    }

    //messing with the n*n array to make it a puzzle.

    for (let a=0; a<diff; a++){
        let x1=Math.floor(Math.random()*n);
        let y1=Math.floor(Math.random()*n);
        let x2=Math.floor(Math.random()*n);
        let y2=Math.floor(Math.random()*n);
        // i want the empty tile to start at the last element. so i am not swapping the values if one oof the randomly selected tile is the last one
        if(!(((x1==n-1) && (y1==n-1))|| ((x2==n-1) && (y2==n-1))) ){
            let v=arr[x1][y1];
            arr[x1][y1]=arr[x2][y2];
            arr[x2][y2]=v;
        } 
    }

    //now we are all set to generate the bigger grid

    for (let i=0; i<n; i++){
        for (let j=0; j<n; j++){
        const div1=document.createElement("div");
        div1.setAttribute('id',`b ${i} ${j}`);
        div1.setAttribute('class', 'btile');
        div1.style.background=colours[arr[i][j]];
        big.append(div1);
        }   
    }
    document.getElementById(`b ${n-1} ${n-1}`).className+=' empty';   
}
build();


var secs=0;
function addASec(){
    //addASec function gets called every second. this function updates the timer by adding one second to it
    secs+=1;
    let sec=secs%60;
    let min=Math.floor(secs/60);
    min= min < 10 ? '0'+ min : min;
    sec= sec < 10 ? '0'+ sec : sec;
    document.getElementById("time").innerHTML=`TIMER - ${min}:${sec}`;
}


function checkCompletion(){
    //checkCompletion function checks if the puzzle is solved or not and does the needful activities
    let flag=0;
    for ( let i=0; i<m; i++){
        for (let j=0; j<m; j++){
            if (sol[i][j]==arr[(n-m)/2+i][(n-m)/2+j]){
                flag+=1;
            }
        }
    }
    return (flag==m*m);
}

var timer;
var count=0;
function startGame(){
    //adding click event listeners to the tiles
    for (let i=0; i<n; i++){
        for (let j=0; j<n; j++){
            document.getElementById(`b ${i} ${j}`).addEventListener("click",function swap(){
                //start timer on the first click
                
                clicked=document.getElementById(`b ${i} ${j}`);
                empty=document.getElementsByClassName("empty")[0];
                let pos_c=clicked.id.match(/\d+/g);
                let pos_e=empty.id.match(/\d+/g); 
                console.log("clicked",pos_c);
                if(parseInt(pos_c[0])==parseInt(pos_e[0])){
                    if( parseInt(pos_e[1])-1==parseInt(pos_c[1]) || parseInt(pos_e[1])+1==parseInt(pos_c[1])){
                        if(count==0){
                            timer=setInterval(addASec, 1000);
                        }
                        let clk=arr[pos_c[0]][pos_c[1]];
                        arr[pos_c[0]][pos_c[1]]=arr[pos_e[0]][pos_e[1]];
                        arr[pos_e[0]][pos_e[1]]=clk;
            
                        empty.style.backgroundColor=colours[arr[pos_e[0]][pos_e[1]]];
                        clicked.style.backgroundColor="#dcdcdc";
            
                        clicked.className+=" empty";
                        empty.className="btile";  
                        //increasing the count (number of moves till now) and updating it
                        count+=1;
                        document.getElementById("count").innerHTML=`COUNT : ${count}`;
                        //checking completion
                        let ado=new Audio();
                        ado.src=".\\sounds\\arcade click.wav";
                        ado.play();
                        if(checkCompletion()){
                            audio.src=".\\sounds\\victory music.mp3";
                            audio.play();
                            big.style.display="none";
                            const result=document.getElementById("result");
                            document.getElementById("score").innerHTML=`God job! You solved it using ${document.getElementById("count").innerHTML.match(/\d+/g)} moves in ${document.getElementById("time").innerHTML.match(/\d+:\d+/g)} time. Enter your name to save your score!!`;
                            let namebox=document.createElement("input");
                            namebox.setAttribute('id',"namebox");
                            namebox.style.padding="0.6em";
                            namebox.style.margin="0em 2em";
                            namebox.style.borderRadius=".3rem";
                            namebox.placeholder="ENTER YOUR NAME";
                        
                            document.getElementById("bigwrap").appendChild(namebox);
                            document.getElementById("bigwrap").style.background='#9bfa73';
                            document.getElementById("count").style.display="none";
                            document.getElementById("time").style.display="none";
                        }

                    }
                    else{
                        let ado=new Audio();
                        ado.src=".\\sounds\\some wierd click.wav";
                        ado.play();
                    }
                }
                else if(parseInt(pos_c[1])==parseInt(pos_e[1])){
                    if( parseInt(pos_e[0])-1==parseInt(pos_c[0]) || parseInt(pos_e[0])+1==parseInt(pos_c[0])){
                        if(count==0){
                            timer=setInterval(addASec, 1000);
                        }
                        let clk=arr[pos_c[0]][pos_c[1]];
                        arr[pos_c[0]][pos_c[1]]=arr[pos_e[0]][pos_e[1]];
                        arr[pos_e[0]][pos_e[1]]=clk;
            
                        empty.style.backgroundColor=colours[arr[pos_e[0]][pos_e[1]]];
                        clicked.style.backgroundColor="#dcdcdc";
            
                        clicked.className+=" empty";
                        empty.className="btile";
                        //increasing the count (number of moves till now) and updating it
                        count+=1;
                        document.getElementById("count").innerHTML=`COUNT : ${count}`;    
                        //checking completion  
                        let ado=new Audio();
                        ado.src=".\\sounds\\arcade click.wav";
                        ado.play();
                        if(checkCompletion()){
                            audio.src=".\\sounds\\victory music.mp3";
                            audio.play();
                            big.style.display="none";
                            const result=document.getElementById("result");
                            document.getElementById("score").innerHTML=`God job! You solved it using ${document.getElementById("count").innerHTML.match(/\d+/g)} moves in ${document.getElementById("time").innerHTML.match(/\d+:\d+/g)} time. Enter your name to save your score!!`;
                            let namebox=document.createElement("input");
                            namebox.setAttribute('id',"namebox");
                            namebox.style.padding="0.6em";
                            namebox.style.margin="0em 2em";
                            namebox.style.borderRadius=".3rem";
                            namebox.placeholder="ENTER YOUR NAME";
                        
                            document.getElementById("bigwrap").appendChild(namebox);
                            document.getElementById("bigwrap").style.background='#9bfa73';
                            document.getElementById("count").style.display="none";
                            document.getElementById("time").style.display="none";
                        }
                    }
                    else{
                        let ado=new Audio();
                        ado.src=".\\sounds\\some wierd click.wav";
                        ado.play();
                    }
                }
                else{
                    let ado=new Audio();
                    ado.src=".\\sounds\\some wierd click.wav";
                    ado.play();
                }
            });
        }
    }
}
startGame();

//creating the reload part
let q=document.getElementsByClassName("reload");
for (let i=0; i<q.length; i++){
    q[i].addEventListener("click", function rld() {
         let ado=new Audio();
         ado.src=".\\sounds\\transition sound.wav";
        ado.volume=.10;
         ado.play();
         if(checkCompletion()){
            let box=document.getElementById("namebox");
                if(box.value){
                localStorage.setItem(document.getElementById("count").innerHTML.match(/\d+/g),box.value);
            }
        }
        setTimeout(() => {
            document.location.reload();            
        }, 500);
    })
}

function reset(){
    if(count){
        clearInterval(timer);
        document.getElementById("count").innerHTML="COUNT - 00";
        document.getElementById("time").innerHTML="TIMER - 00:00";
        count=0;
        secs=0;
    }
}