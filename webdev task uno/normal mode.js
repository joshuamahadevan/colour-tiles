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
       div1.setAttribute('id',`b ${i} ${j}`);
       div1.setAttribute('class', 'btile');
       div1.setAttribute('draggable','True')
       div1.style.background=colours[arr[i][j]]
       big.append(div1);
    }
    
}
