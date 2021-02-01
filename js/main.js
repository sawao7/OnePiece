//要素の特定
const start_btn = document.querySelector("#start_button");
const end_image = document.querySelector(".end_image");
const main_image = document.querySelector(".main_image");
const timer_div = document.querySelector("#timer");
const continuous = document.querySelector("#continuous");
const count_div = document.querySelector("#count");
const display_div = document.querySelector(".display");
const japanese_h1 = document.querySelector("#japanese");
const word_h2 = document.querySelector("#word");
const scores_div = document.querySelector(".scores");
const wpm_p = document.querySelector(".WPM");    //divのつもりだったがpでスタイルを設定してしまった
const percent_div = document.querySelector(".percent")
const my_image = document.querySelector("#my_image");

//ゲーム要素の指定
let ready_time = 3; //カウントダウン 3秒に設定
let time_limit = 60; //時間制限 60秒
let total_score = 0; //全体のスコア
let correct = 0; //正解タイプ数
let correct_bonus = 0; //名言のフレーズごとにボーナス
let mistake = 0; //ミスタイプ数
let current_type = 0; //現在の名言のあってるタイプ数
let current_answer; //現在のタイプの正解
let random = 0; //出題をランダムで選ぶ変数
let key_bool = true;  //キー入力が可能かどうか trueは可能
//ここまでゲーム要素

//ゲームの効果音
let efffect_1 = new Audio("/music/effect_1.mp3");
//エンディング音楽
let end_music_1 = new Audio("/music/end_music_1.mp3");

// onepiece キャラのボイス
let char_voices =
    "/music/sound_1.mp3 /music/sound_2.mp3 /music/sound_3.mp3 /music/sound_4.mp3 /music/sound_5.mp3 /music/sound_6.mp3 /music/sound_7.mp3 /music/sound_8.mp3 /music/sound_9.mp3 /music/sound_10.mp3 /music/sound_11.mp3 /music/sound_12.mp3 /music/sound_13.mp3";

// 画像 一旦 集めてみた カラー限定
let images_dimo =
    "https://livedoor.blogimg.jp/yossikuppa/imgs/0/f/0f5f0f37.jpg https://pbs.twimg.com/media/DxHy7oLUcAAZ9Zk.jpg https://5656-onepiece.up.seesaa.net/image/B19477A3-E073-4667-BDAB-438C1B50AEDE-thumbnail2.jpg https://pics.prcm.jp/01011214/49794337/jpeg/49794337.jpeg https://i.gyazo.com/b438ecdecba750833a98d324ef02e5b6.png  https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/21990220/picture_pc_fd34ba0a6635efabbfb7920d43d8ff4a.jpeg?width=800";

//画像 本番
let images_source =
    "https://livedoor.blogimg.jp/yossikuppa/imgs/0/f/0f5f0f37.jpg https://wordstacks.nocebo.jp/storage/posts/164/0.webp?undefined https://pbs.twimg.com/media/EZv6az_UcAAnSuF.jpg https://blogimg.goo.ne.jp/user_image/08/03/38f1cb9728db1938405b70898d8fcc7b.png https://i.gyazo.com/042fded2457c57f1f7007e0c2f7949f8.jpg https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/21990220/picture_pc_fd34ba0a6635efabbfb7920d43d8ff4a.jpeg?width=800 https://pics.prcm.jp/01011214/49794337/jpeg/49794337_480x374.jpeg https://i.gyazo.com/b438ecdecba750833a98d324ef02e5b6.png https://blogimg.goo.ne.jp/user_image/5b/7a/439e2115d0d4fdc1078ff35004098383.png https://i.gyazo.com/c4fd8740191d3935df8eae71eccd413e.jpg https://i.gyazo.com/9857b483e10391a82b6be06f2ea6c9a0.jpg https://livedoor.blogimg.jp/yossikuppa/imgs/d/3/d3da83ad-s.jpg https://i.gyazo.com/fbb57e26aa111a2d105626e52e190ab4.jpg";

//名言 必ずスペースでくぎる
let onepiece_ja_1_source =
    "海賊王に、俺はなる！ この海で一番自由なのが海賊王だ！ 女の嘘は、許すのが男だ 力に屈したら男に生まれた意味がねえだろう 本心を、言えよ！ 今の時代を作れるのは、今を生きてる人間だけだよ 人の夢は!終わらねえ! 人はいつ死ぬと思う...人に忘れられた時さ！ 俺は友達を傷つける奴は許さない！ 未来を変える権利は皆平等にあるんだよ！ 俺は一生神には祈らねえ！ いきなりキングは取れねエだろうよい 勝者だけが正義だ！";
let onepiece_en_1_source =
    "kaizokuouni,orehanaru! konoumideitibannziyuunanogakaizokuouda! onnnanousoha,yurusunogaotokoda tikaranikussitaraotokoniumaretaimiganeedarou honnsinnwo,ieyo! imanozidaiwotukurerunoha,imawoikiteruninngenndakedayo hitonoyumeha!owaranee! hitohaitusinutoomou...hitoniwasureraretatokisa! orehatomodatiwokizutukeruyatuhayurusanai! miraiwokaerukennrihaminabyoudouniarunndayo! orehaissyoukaminihainoranee! ikinarikinnguhatoreneedarouyoi syousyadakegaseigida!";
//ここまで名言

// 正規表現 スペースで区切るようにしている
let pattern = /[ ]/;
onepiece_ja_1_source = onepiece_ja_1_source.split(pattern);
onepiece_en_1_source = onepiece_en_1_source.split(pattern);
images_source = images_source.split(pattern);
char_voices = char_voices.split(pattern);
// ここまで正規表現

//onepieceキャラのボイスをAudio形式に変換して、リストに格納
let char_voices_list_source = [];
char_voices.forEach((voice) => {
    char_voices_list_source.push(new Audio(voice));
});
//ここまで音声格納

//start_btnをクリックしたらready()に行く
start_btn.addEventListener("click", function () {
    //エンディングを初期化 もう一度用
    end_music_1.pause();
    end_music_1.currentTime = 0;
    // 問題を初期化 もう一度ボタンを押した時用
    onepiece_en_1 = onepiece_en_1_source;
    onepiece_ja_1 = onepiece_ja_1_source;
    images = images_source;
    char_voices_list = char_voices_list_source;
    // 3つの要素を消す
    main_image.style.display = "none";
    start_btn.style.display = "none";
    end_image.style.display = "none";
    //スコア全体を消す
    scores_div.style.display = "none";
    //timer要素に値を代入
    timer_div.innerHTML = "<i class='fas fa-stopwatch'></i>60";
    ready();
});

//ready()の定義 ready()ではカウントダウンをした後に、GameStart()に行く
function ready() {
    //カウントダウンのタイム 3秒に設定したのを＋1してcloneに代入
    let ready_time_clone = ready_time + 1;
    //japanese_h1要素とword_h2要素、count_div要素、my_image要素になにも表示しなくする
    japanese_h1.innerHTML = "";
    word_h2.innerHTML = "";
    count_div.innerHTML = "";
    my_image.setAttribute("src", "");
    //カウントダウンの関数
    let ready_timer = setInterval(function () {
        if (ready_time_clone == 1) {
            efffect_1.play();
            //ready_timeが1ならstartを表示
            count_div.innerHTML =
                "<p class='fade' style = 'font-family:'Times New Roman''>GAME START</p>";
        } else {
            //count_divにカウントダウンを表示 ready_timeから1引いた数を表示
            count_div.innerHTML =
                "<p class='fade'>" + (ready_time_clone - 1) + "</p>";
        }
        ready_time_clone--;
        if (ready_time_clone < 0) {
            //effect_1をストップ
            efffect_1.pause();
            efffect_1.currentTime = 0;
            //count_divを非表示
            count_div.innerHTML = "";
            //タイマーストップ
            clearInterval(ready_timer);
            //GameStart()へ行く
            GameStart();
        }
    }, 1000);
}

// GameStart()の定義 Game全体の制限時間を管理 諸々の値を初期化
function GameStart() {
    //display要素を表示
    display_div.style.display = "block";
    //諸々初期化
    total_score = 0;
    correct = 0;
    correct_bonus = 0;
    mistake = 0;
    //Question()へ行く
    Question();
    //時間制限の変数の受け渡し +1する
    let time_limit_clone = time_limit + 1;
    //ゲーム全体のカウントダウン
    let all_timer = setInterval(function () {
        //カウントダウンの文字列を初期化
        count_div.innerHTML = "";
        //タイムリミットに時間を入れていく
        //もし残り時間が〇〇秒以下なら時計の文字を赤くする
        //もし残り時間が0秒ならばend_image要素を表示し、そのほかを非表示にする
        if (time_limit_clone - 1 == 0) {
            //キャラの音声をとめる
            char_voices_list[random].pause();
            char_voices_list[random].currentTime = 0;
            //effect_1を再生
            efffect_1.play();
            //end_image要素を表示
            end_image.style.display = "inline";
            //display_div要素をなくす
            display_div.style.display = "none";
            //my_image要素をなくす
            my_image.setAttribute("src", "");
            //timer_div要素の値を""に
            timer_div.innerHTML = "";
            // 入力禁止
            key_bool = false;
        } else if (time_limit_clone - 1 < 11) {
            timer_div.innerHTML =
                "<i class='fas fa-stopwatch fade' style = 'color:red;'></i>" +
                "<span class = 'fade'>" +
                (time_limit_clone - 1) +
                "</span>";
        } else {
            timer_div.innerHTML =
                "<i class='fas fa-stopwatch'></i>" + (time_limit_clone - 1);
        }
        time_limit_clone--;
        if (time_limit_clone < 0) {
            //timer_div要素を非表示
            timer_div.innerHTML = "";
            //タイマーストップ
            clearInterval(all_timer);
            //GameFinish()へ行く
            GameFinish();
        }
    }, 1000);
}

//Question()の定義 実際に問題を行うメイン機能
function Question() {
    //randomの変数にランダムな値を生成 日本語のリストの要素の数までのランダムな数
    random = Math.floor(Math.random() * onepiece_ja_1.length);
    // japanese_h1に問題を入力
    japanese_h1.innerHTML = onepiece_ja_1[random];
    //word_h2に答えを入力
    word_h2.innerHTML = onepiece_en_1[random];
    //my_imageに画像を表示
    my_image.setAttribute("src", images[random]);
    //キャラの音声を再生
    char_voices_list[random].play();
    //current_answerに現在打つべき文字を代入
    current_answer = onepiece_en_1[random].charAt(current_type);
}

//GameFinish()の定義 ゲームを終了した後の後処理やスコア表示を行う
function GameFinish() {
    //effect_1を止める
    efffect_1.pause();
    efffect_1.currentTime = 0;
    //エンディングを流す
    end_music_1.play();
    //end_image要素の画像をエンディング画像に変更
    end_image.setAttribute(
        "src",
        "https://i.ytimg.com/vi/sGVkLN9Novg/maxresdefault.jpg"
    );
    //main_imageを表示
    main_image.style.display = "inline";
    //main_imageにendding_imageクラスを追加し、位置をずらす
    main_image.classList.add("endding_image");
    //total_scoreの定義
    total_score = 0;
    // スコア全体の表示
    scores_div.style.display = "block";
    //WPMを代入
    wpm_p.innerHTML = "WPM : " + correct;
    //正答率を代入
    percent_div.innerHTML = "VALIDITY : "+ Math.floor(((correct/(correct+mistake))*100)) + "%";
    // ゲーム要素の初期化
    random = 0;
    current_type = 0;
    current_answer = 0;
    //gamestartボタンを文字列をCharange Againに変えて表示 marginを加え中央へ block要素にしたからでは？
    start_btn.style.display = "inline";
    start_btn.innerHTML = "PLAY AGAIN";
}

//キーボード入力と判定
document.addEventListener("keypress", (event) => {
    //now_key変数に今何のキーを入力したかを代入
    let now_key = event.key;
    //入力可能な状態で、入力したキーが正解のキーとあっていたら
    if (now_key === current_answer && key_bool == true) {
        //正解タイプ数を＋1
        correct++;
        //現在のあってるタイプ数を＋1
        current_type++;
        // word_h2の表示を変更 正解した文字を暗くする
        //substr関数で文字列の始まりと終わりを指定
        word_h2.innerHTML =
            "<span style='color:gray'>" +
            onepiece_en_1[random].substr(0, current_type) +
            "</span>" +
            onepiece_en_1[random].substr(
                current_type,
                onepiece_en_1[random].length
            );
        //正解キーを次の文字へ
        current_answer = onepiece_en_1[random].charAt(current_type);
    } //間違っていたら
    else if(now_key !== current_answer && key_bool == true) {
        //mistakeを＋1
        mistake++;
    }

    //もし正解タイプ数が名言の答えの文字列の数と一致したら
    if (current_type === onepiece_en_1[random].length) {
        //音声をストップして最初の位置に戻す
        char_voices_list[random].pause();
        char_voices_list[random].currentTime = 0;
        //現在のあってるタイプ数を初期化
        current_type = 0;
        //ボーナスを＋1
        correct_bonus++;
        //名言リストから日本語、英語、画像、音声それぞれ削除
        onepiece_ja_1.splice(random, 1);
        onepiece_en_1.splice(random, 1);
        images.splice(random, 1);
        char_voices_list.splice(random, 1);
        //Question()に行く
        Question();
    }
});
