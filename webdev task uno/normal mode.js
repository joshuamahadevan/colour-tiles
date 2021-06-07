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

let small=document.getElementById("small");
let big=document.getElementById("big");


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

const sol=

console.log(arr);

/*going to create the sample and the puzzle part.. 
 I am planning on creating a div for each box and setting their widths
 to the same value in css. let see how it goes*/

 /* starting with the small grid */
 for (let i=0; i<m; i++){
     for (let j=0; j<m; j++){
        const div1=document.createElement("div");
        div1.setAttribute('id',`s${i}${j}`);
        div1.setAttribute('class', 'stile');
        div1.style.background=colours[arr[(n-m)/2+i][(n-m)/2+j]]
        small.append(div1);
     }
     
 }

 /*phew. finally the smal grid is done. 
 i'll yoink the same code for the bigger grid*/

 for (let i=0; i<n; i++){
    for (let j=0; j<n; j++){
       const div1=document.createElement("div");
       div1.setAttribute('id',`b${i}${j}`);
       div1.setAttribute('class', 'stile');
       div1.style.background=colours[arr[i][j]]
       big.append(div1);
    }
    
}

/*lets try to make the swithching part. am gonna try to make only the invisible block move
and switch background colours whenever we drop it on something. and later i'll try to make
it such that u can drop it on only specific tiles. lets see how i am going to implement the 
dragging part.. cya after some yt tutorials. lol*/


document.getElementById(`b ${n-1} ${n-1}`).className+=" empty";


function dragStart(ev) {
    let t=ev.target
    t.className+=" dragged";
    let reg = /\d+/g;
    let a=t.id.match();
    let x=parseInt(a[0]);
    let y=parseInt(a[1]);

    //first let's tackle the corner cases
    if(x==0){
        if(y==0){
            document.getElementById("b 0 0").className+=" Target";
            document.getElementById("b 0 1").className+=" Target";
            document.getElementById("b 1 0").className+=" Target";

        }
        else if(y==n-1){
            document.getElementById(`b ${0} ${n-1}`).className+=" Target";  
            document.getElementById(`b ${0} ${n-2}`).className+=" Target";  
            document.getElementById(`b ${1} ${n-1}`).className+=" Target";  
        
             
        }
        else{
            document.getElementById(`b ${1} ${y}`).className+=" Target";     
            for (let i=y-1; i<y+2; i++){
                document.getElementById(`b ${x} ${i}`).className+=" Target";
            }       
        }
    }
    else if(x==n-1){
        if(y==0){
            document.getElementById(`b ${n-1} ${0}`).className+=" Target";  
            document.getElementById(`b ${n-1} ${1}`).className+=" Target";  
            document.getElementById(`b ${n-2} ${0}`).className+=" Target";  

        }
        else if(y==n-1){
            document.getElementById(`b ${n-1} ${n-1}`).className+=" Target";  
            document.getElementById(`b ${n-1} ${n-2}`).className+=" Target";  
            document.getElementById(`b ${n-2} ${n-1}`).className+=" Target";  
        
             
        }
        else{
            document.getElementById(`b ${x-1} ${y}`).className+=" Target";     
            for (let i=y-1; i<y+2; i++){
                document.getElementById(`b ${x} ${i}`).className+=" Target";
            }       
        }
    }

    if(y==0){
            document.getElementById(`b ${x} ${y+1}`).className+=" Target";     
            for (let i=x-1; i<x+2; i++){
                document.getElementById(`b ${i} ${y}`).className+=" Target";
            }       
        
    }
    else if(y==n-1){
            document.getElementById(`b ${x} ${y-1}`).className+=" Target";     
            for (let i=x-1; i<x+2; i++){
                document.getElementById(`b ${i} ${y}`).className+=" Target";
            }
    }
    //corner cases done... i guess
    //assuming it's done let's select handle the other cases  
    //the reason am doing somuch is that the script stops executing if there is any uncaught errors and selecting elements that don't exist causes errors. 
    //i dont know if i can make the program ignore those. but this works. so let go
    else{
        for (let i=x-1;i<x+2;i++){
            document.getElementById(`b ${i} ${y}`).className+=" Target";
        }
        document.getElementById(`b ${x} ${y-1}`).className+=" Target";  
        document.getElementById(`b ${x} ${y+1}`).className+=" Target";
    }   
}

function dragEnd(ev){

}
