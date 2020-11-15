const btn = document.getElementById("btn");
const firstLetter = document.getElementById("firstLetter");
const secondLetter = document.getElementById("secondLetter");

//漢字リストの取得
async function getList(){
    const res = await fetch ("https://gist.githubusercontent.com/shinout/1403826/raw/421d01202c4b065cd2c4c5f4294492bd2d8809b8/jis1_regular_merged.json");
    const kanjiList = await res.json();
    console.log(kanjiList);
}


async function changeFisrt(){
    const res = await fetch ("https://gist.githubusercontent.com/shinout/1403826/raw/421d01202c4b065cd2c4c5f4294492bd2d8809b8/jis1_regular_merged.json");
    const kanjiList = await res.json();
    firstLetter.innerText = kanjiList[Math.floor(Math.random() * kanjiList.length)];
}

async function changeSecond(){
    const res = await fetch ("https://gist.githubusercontent.com/shinout/1403826/raw/421d01202c4b065cd2c4c5f4294492bd2d8809b8/jis1_regular_merged.json");
    const kanjiList = await res.json();
    secondLetter.innerText = kanjiList[Math.floor(Math.random() * kanjiList.length)];
}

btn.addEventListener("click",changeFisrt);
btn.addEventListener("click",changeSecond);
