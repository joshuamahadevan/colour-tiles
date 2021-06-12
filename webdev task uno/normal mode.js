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

const diff=10; //difficulty (this is the number of swaps that is gonna take place to shuffle the random array)
const small=document.getElementById("small");
const big=document.getElementById("big");

/* n - size of bigger grid
m - size of smaller grid */
const n=5;
const m=3;

//crearing the n*n array to store our grid
var arr= new Array(n);
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

 let sol=new Array(m);
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

//setting up variables for the timer
var count=0;
var secs=0;
//addASec function gets called every second. this function updates the timer by adding one second to it
function addASec(){
    secs+=1;
    let sec=secs%60;
    let min=Math.floor(secs/60);

    min= min < 10 ? '0'+ min : min;
    sec= sec < 10 ? '0'+ sec : sec;

    document.getElementById("time").innerHTML=`TIMER - ${min}:${sec}`;
    console.log("timer updated");  
}
//checkCompletion function checks if the puzzle is solved or not. if it is solved it takes u to a different page :)
function checkCompletion(){
    let flag=0;
    for ( let i=0; i<m; i++){
        for (let j=0; j<m; j++){
            if (sol[i][j]==arr[(n-m)/2+i][(n-m)/2+j]){
                flag+=1;
            }
        }
    }
    if(flag==m*m){
        big.style.display="none";
        const result=document.getElementById("result");
        document.getElementById("score").innerHTML=`God job! You solved it using ${document.getElementById("count").innerHTML.match(/\d+/g)} moves in ${document.getElementById("time").innerHTML.match(/\d+:\d+/g)} time`;
        result.style.display="inline block";
        document.getElementById("bigwrap").style.background='#9bfa73';
        document.getElementById("count").style.display="none";
        document.getElementById("time").style.display="none";
    }
}
//adding click event listeners to the tiles
for (let i=0; i<n; i++){
    for (let j=0; j<n; j++){
        document.getElementById(`b ${i} ${j}`).addEventListener("click",function swap(){
            //start timer on the first click
            if(count==0){
                setInterval(addASec,1000);
                console.log("timer started");
            }
            clicked=document.getElementById(`b ${i} ${j}`);
            empty=document.getElementsByClassName("empty")[0];
            let pos_c=clicked.id.match(/\d+/g);
            let pos_e=empty.id.match(/\d+/g); 
            if(parseInt(pos_c[0])==parseInt(pos_e[0])){
                if( parseInt(pos_e[1])-1==parseInt(pos_c[1]) || parseInt(pos_e[1])+1==parseInt(pos_c[1])){
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
                    checkCompletion();
                }
                else{
                    console.log("invalid");
                }
            }
            else if(parseInt(pos_c[1])==parseInt(pos_e[1])){
                if( parseInt(pos_e[0])-1==parseInt(pos_c[0]) || parseInt(pos_e[0])+1==parseInt(pos_c[0])){
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
                    checkCompletion();
                }
                else{
                    console.log("invalid");
                }
            }
            else{
                console.log("invalid");
            }
        });
    }
}
//creating the reload part
let q=document.getElementsByClassName("reload");
for (let i=0; i<q.length; i++){
    q[i].addEventListener("click", function rld() {
        document.location.reload();
    })
}