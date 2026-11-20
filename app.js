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

function showStatistics(sample){

let totalHeight=0;

let totalSleep=0;

let totalWork=0;

sample.forEach(p=>{

totalHeight +=
Number(p.身長_cm);

totalSleep +=
Number(p.睡眠時間_h);

totalWork +=
Number(p.労働学業時間_h);

});

const avgHeight=
totalHeight/sample.length;

const avgSleep=
totalSleep/sample.length;

const avgWork=
totalWork/sample.length;

const error=
Math.abs(
avgHeight-
trueMeanHeight
);

document
.getElementById("result")
.innerHTML=

`
<h3>標本サイズ
${sample.length}</h3>

母平均身長
${trueMeanHeight.toFixed(2)}cm

<br><br>

標本平均身長
${avgHeight.toFixed(2)}cm

<br><br>

誤差
${error.toFixed(2)}cm

<br><br>

平均睡眠時間
${avgSleep.toFixed(2)}時間

<br><br>

平均労働・学業時間
${avgWork.toFixed(2)}時間
`;

}
