let population=[];

let histChart=null;

let scatterChart=null;

Papa.parse(
"statistics_population_50000.csv",
{
download:true,
header:true,

complete:function(results){

population=results.data;

initializePopulation();

}
});

let trueMeanHeight=0;

function initializePopulation(){

let total=0;

population.forEach(p=>{

total+=Number(p.身長_cm);

});

trueMeanHeight=
total/population.length;

}

function runSample(){

const sampleSize=
Number(
document.getElementById("sampleSize").value
);

const gender=
document.getElementById("gender").value;

const minAge=
Number(
document.getElementById("minAge").value
);

const maxAge=
Number(
document.getElementById("maxAge").value
);

let filtered=
population.filter(p=>{

const age=
Number(p.年齢);

if(
gender &&
p.性別!==gender
) return false;

return age>=minAge &&
age<=maxAge;

});

if(filtered.length===0){

alert("条件に一致するデータがありません");

return;

}

let sample=[];

for(let i=0;i<sampleSize;i++){

sample.push(

filtered[
Math.floor(
Math.random()*filtered.length
)
]

);

}

showStatistics(sample);

showTable(sample);

drawHistogram(sample);

drawScatter(sample);

}
