//要素の特定
const start_btn = document.querySelector("#start_button");
const main_image = document.querySelector(".main_image");
const timer_div = document.querySelector("#timer");
const count_div = document.querySelector("#count");
const japanese_h1 = document.querySelector("#japanese");
const word_h2 = document.querySelector("#word");
const score_div = document.querySelector("#score")
const my_image = document.querySelector("#my_image");

//ゲーム要素の指定
let time_limit = 3;  //時間制限 60秒
let total_score = 0;  //全体のスコア
let correct = 0;  //正解タイプ数
let correct_bonus = 0  //名言のフレーズごとにボーナス
let mistake = 0;  //ミスタイプ数
let current_type = 0;  //現在の名言のあってるタイプ数
let current_answer;  //現在のタイプの正解
let random = 0;  //出題をランダムで選ぶ変数 
//ここまでゲーム要素

//名言　必ずスペースでくぎる
let onepiece_ja_1 = "海賊王に、俺はなる！ 愛してくれて...ありがとう！ 長い間、くそお世話になりました！";
let onepiece_en_1 = "kaizokuouni,orehanaru! aisitekurete...arigatou! nagaiaida,kusoosewaninarimasita!";
//ここまで名言

// 正規表現　スペースで区切るようにしている
let pattern = /[ ]/;
onepiece_ja_1 = onepiece_ja_1.split(pattern);
onepiece_en_1 = onepiece_en_1.split(pattern);
// ここまで正規表現

//start_btnをクリックしたらready()に行く
start_btn.addEventListener("click", function () {
    // ２つの要素を消す
    main_image.style.display = "none";
    start_btn.style.display = "none";
    ready();
});

//ready()の定義 ready()ではカウントダウンをした後に、GameStart()に行く
function ready() {
    //カウントダウンのタイム 3秒に設定
    ready_time = 3;
    //japanese_h1要素とword_h2要素、count_div要素になにも表示しなくする
    japanese_h1.innerHTML = "";
    word_h2.innerHTML = "";
    count_div.innerHTML = "";
    //カウントダウンの関数
    let ready_timer = setInterval(function () {
        //count_divにカウントダウンを表示
        count_div.innerHTML = "<p class='fade'>"+ready_time+"</p>";
        ready_time--;
        if (ready_time < 0) {
            //0を下回ったらstartを表示
            count_div.innerHTML = "<p class='fade'>Start!</p>";
            //タイマーストップ
            clearInterval(ready_timer);
            //GameStart()へ行く
            GameStart();
        }
    },1000);
}

// GameStart()の定義 Game全体の制限時間を管理 諸々の値を初期化
function GameStart() {
    total_score = 0;
    correct = 0;
    correct_bonus = 0;
    mistake = 0;
    //Question()へ行く
    Question();
    //時間制限の変数の受け渡し
    let time_limit_clone = time_limit;
    //ゲーム全体のカウントダウン
    let all_timer = setInterval(function () {
        timer_div.innerHTML = time_limit_clone;
        time_limit_clone--;
        if (time_limit_clone < 0) {
            timer_div.innerHTML = "Finish";
            //タイマーストップ
            clearInterval(all_timer);
            //GameFinish()へ行く
            GameFinish();
        }
    }, 1000);
}

//Question()の定義 実際に問題を行うメイン機能
function Question(){
}

//Question_Answer()の定義 問題から正解の文字を変数に格納　いらない？

//GameFinish()の定義 ゲームを終了した後の後処理やスコア表示を行う
function GameFinish() {
    
}

//キーボード入力と判定
