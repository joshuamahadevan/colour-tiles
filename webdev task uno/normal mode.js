const colours=["#ff00ff","#ff0000","#ffff00","#0000ff","#00ff00","#ff8c00"];

/*
-1 - blank
0 - violet
1 - red
2 - yellow
3 - blue
4 - green
5 - orange
*/

const diff=8; //difficulty (this is the number of swaps that is gonna take place to shuffle the random array)
const small=document.getElementById("small");
const big=document.getElementById("big");


/*
n - size of bigger grid
m - size of smaller grid
*/
const n=5;
const m=3;

var arr= new Array(n);
for (let i=0; i<n; i++){
    arr[i]=new Array(n);
}

for (let i=0; i<n; i++){
    for (let j=0; j<n; j++){
        arr[i][j] = Math.floor(Math.random()*6);
    }
}
arr[n-1][n-1]=-1;



/*going to create the sample and the puzzle part.. 
 I am planning on creating a div for each box and setting their widths
 to the same value in css. let see how it goes*/

 /* starting with the small grid */

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

 /*phew. finally the smal grid is done. 
 i'll yoink the same code for the bigger grid*/

 //before that lets mix stuff up

for (let a=0; a<diff; a++){
    let x1=Math.floor(Math.random()*n);
    let y1=Math.floor(Math.random()*n);
    let x2=Math.floor(Math.random()*n);
    let y2=Math.floor(Math.random()*n);
    if(!(((x1==n-1) && (y1==n-1))|| ((x2==n-1) && (y2==n-1))) ){
        let v=arr[x1][y1];
        arr[x1][y1]=arr[x2][y2];
        arr[x2][y2]=v;
    }
    
}

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
var count=0;
var secs=0
function addASec(){
    secs+=1;
    let sec=secs%60;
    let min=Math.floor(secs/60);

    min= min < 10 ? '0'+ min : min;
    sec= sec < 10 ? '0'+ sec : sec;

    document.getElementById("time").innerHTML=`TIMER - ${min}:${sec}`;
    console.log("timer updated");  
}

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
        window.location.href="https://youtu.be/dQw4w9WgXcQ";
    }
}

for (let i=0; i<n; i++){
    for (let j=0; j<n; j++){
        document.getElementById(`b ${i} ${j}`).addEventListener("click",function swap(){
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
                    count+=1;
                    document.getElementById("count").innerHTML=`COUNT : ${count}`;
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
                    count+=1;
                    document.getElementById("count").innerHTML=`COUNT : ${count}`;      
                    checkCompletion();
                }
                else{
                    console.log("invalid");
                }
            }
            else{
                console.log("invalid");
            }
        }

        );
    }
}
