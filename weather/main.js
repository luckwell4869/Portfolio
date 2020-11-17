const API_KEY = "5bcbe363f58d31ee364abf686babfa07";

//APIを叩いてjsonデータを取得し、返す
async function callAPI(){
    let lat = 35.681236;
    let lon = 139.767125;
    const res = await fetch ("https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon=" + lon + "&units=metric&lang=ja&appid=5bcbe363f58d31ee364abf686babfa07");
    const owm = await res.json();
    // console.log(typeof(owm));
    return owm;
}
callAPI();


//気温を配列に格納
async function arrayTemp(){
    const owm = await callAPI();
    let temp = [];
    for(let i = 0; i < owm.hourly.length; i++){
        //4時間おきの気温
        if(i%4 === 0){
            temp.push(owm.hourly[i].temp);
        }
    }
    return temp;
}

//気圧を配列に格納
async function arrayPres(){
    const owm = await callAPI();
    let pres = [];
    for(let i = 0; i < owm.hourly.length; i++){
        //4時間おきの気温
        if(i%4 === 0){
            pres.push(owm.hourly[i].pressure);
        }
    }
    return pres;
}

//日付、現在地、天気、気温、気圧
async function getInfo(){
    const owm = await callAPI();

        //日付
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth()+1;
        let date = today.getDate();
        let dayArray = ["日","月","火","水","木","金","土"];
        let day = dayArray[today.getDay()];
        let kyou = document.getElementById('kyou');
        kyou.innerHTML = year + "年" + month + "月" + date + "日" + "(" + day + ")";



        //アイコン
        let box = document.getElementById('icon');
        let weatherIcon = owm.current.weather[0].icon
        box.innerHTML = '<img class="wIcon" src="http://openweathermap.org/img/wn/'+ weatherIcon +'@2x.png"></img>'
        
        //天気
        let description = document.getElementById('description')
        description.innerHTML = owm.current.weather[0].description


        //現在地
        // geolocationを利用できるか確認
        if (navigator.geolocation) {

          //現在位置を取得する
          navigator.geolocation
            .getCurrentPosition(success,error,options); 

          var options = {
            // enableHighAccuracyは、GPSの精度でtrueかfalseをセットする
            // trueだと精度が高くなる
            enableHighAccuracy: true, 
            //timeoutは、タイムアウト時間でミリ秒単位
            timeout: 1000,
            // maximumAgeは、キャッシュ有効時間でミリ秒で表す
            // 0の場合、常に最新の情報を取得する
            maximumAge: 0
          };

          // 成功時
          function success(position) {
            var crd = position.coords;

            // Positionオブジェクトの中にあるcoordsオブジェクトの
            // latitudeとlongitudeプロパティを参照
            document.getElementById("lat")
				.innerHTML = "<span>緯度</span> :<br>" + crd.latitude;
            document.getElementById("lon")
				.innerHTML = "<span>経度</span> :<br>" + crd.longitude;
          };

          // 失敗時
          function error(err) {
            // PositionErrorオブジェクトの
            // codeとmessageプロパティを参照
            document.getElementById("test1").textContent 
              = "エラーコード : " + err.code;
            document.getElementById("test2").textContent 
              = "エラーメッセージ : " + err.message;
          };

        }

        //現在の気温
        let currentTemp = document.getElementById('currentTemp');
        console.log(owm.current);
        //現在の気圧
	      currentTemp.innerHTML = owm.current.temp + "<span>℃</span>";
        let currentPres = document.getElementById('currentPres');
      	currentPres.innerHTML = owm.current.pressure + "<span>hPa<span>";
}


//グラフ描画
async function drawGraph(){
  const owm = await callAPI();
  let temp = await arrayTemp();
  let pres = await arrayPres();
  console.log(pres);
  var ctx = document.getElementById("myChart");
    var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['4h','8h','12h','16h','20h','24h','28h','32h','36h','40h','44h','48h', ],
      datasets: [
        {
          label: '気圧',
          data: pres,
          borderColor: "rgba(127,255,127,1)",
          backgroundColor: "rgba(127,255,127,.6)"
        }
      ],
    },
    options: {
      title: {
        display: true,
        text: '気圧の変動'
      },
      scales: {
        yAxes: [{
          ticks: {
            suggestedMax: Math.max.apply(null, pres) + 3,
            suggestedMin: Math.min.apply(null, pres) - 3,
            // stepSize: 10,
            callback: function(value, index, values){
              return  value +  'hPa'
            }
          }
        }],
      },
    }
  });
}

window.addEventListener('load', getInfo())
window.addEventListener('load', drawGraph())
