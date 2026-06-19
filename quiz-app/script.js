// ====== 質問文と選択肢 ====== 
const questions = [
  {
    question: "Q1. メタボリックシンドロームの診断基準において<br>男性の腹囲〈ウエスト周囲径〉で正しいのはどれ？",
    choices: [
      { text: "85cm以上", score: 1 },
      { text: "80cm以上", score: 0 },
      { text: "90cm以上", score: 0 }
    ]
  },
  {
    question: "Q2. ニトログリセリンの副作用はどれ？",
    choices: [
      { text: "血圧の低下", score: 1 },
      { text: "多尿", score: 0 },
      { text: "消化管からの出血", score: 0 }
    ]
  },
  {
    question: "Q3. 成人の一次救命処置における<br>圧迫部位で正しいのはどれ？",
    choices: [
      { text: "胸骨の下半分", score: 1 },
      { text: "剣状突起", score: 0 },
      { text: "心窩部", score: 0 }
    ]
  },
  {
    question: "Q4. 老年期の身体的な特徴はどれ？",
    choices: [
      { text: "高音域における聴力が低下する", score: 1 },
      { text: "嗅覚の閾値が低下する", score: 0 },
      { text: "胸腺の重量が増加する", score: 0 }
    ]
  },
  {
    question: "Q5. 学童期の脈拍数の基準値はどれ？",
    choices: [
      { text: "80～100/分", score: 1 },
      { text: "110～130/分", score: 0 },
      { text: "140～160/分", score: 0 }
    ]
  },
  {
    question: "Q6. 正期産となる出産時期はどれ？",
    choices: [
      { text: "妊娠37週0日から41週6日", score: 1 },
      { text: "妊娠38週0日から42週6日", score: 0 },
      { text: "妊娠36週0日から40週6日", score: 0 }
    ]
  },
  {
    question: "Q7. 目的とする効果が安定して発現するまでに<br>最も時間がかかる薬はどれ？",
    choices: [
      { text: "抗うつ薬", score: 1 },
      { text: "抗血栓薬", score: 0 },
      { text: "睡眠薬", score: 0 }
    ]
  },
  {
    question: "Q8. 訪問看護ステーションで正しいのはどれ？",
    choices: [
      { text: "常勤換算で2.5名以上の看護職員が必要である", score: 1 },
      { text: "利用者は高齢者に限定される", score: 0 },
      { text: "勤務する看護職員は<br>臨床経験5年以上と定められている", score: 0 }
    ]
  },
  {
    question: "Q9. 災害時のトリアージで<br>最優先治療群のトリアージタッグはどれ？",
    choices: [
      { text: "赤", score: 1 },
      { text: "黄", score: 0 },
      { text: "黒", score: 0 }
    ]
  },
  {
    question: "Q10. 令和6年（2024年）の国民生活基礎調査で、<br>単独世帯の占める割合はどれ？",
    choices: [
      { text: "34.6%", score: 1 },
      { text: "24.6%", score: 0 },
      { text: "44.6%", score: 0 }
    ]
  }
];

// あなたのサイトURL
const siteUrl = "https://petitnurse-kokodake.netlify.app/";

// ====== 状態変数 ======
let currentQuestion = 0;
let score = 0;

const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const startBtn = document.getElementById("startBtn");
const startImage = document.getElementById("startImage");

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  document.getElementById("banner-area").style.display = "none";

  startBtn.style.display = "none";
  if (startImage) startImage.style.display = "none";

  const logo = document.getElementById("logo");
  if (logo) logo.style.display = "block";

  showQuestion();
}

function showQuestion() {
  if (currentQuestion < questions.length) {
    const q = questions[currentQuestion];
    const shuffledChoices = [...q.choices].sort(() => Math.random() - 0.5);
    quizEl.innerHTML = `
      <h2>${q.question}</h2>
      ${shuffledChoices
        .map(
          (choice) =>
            `<button class="choice-btn" onclick="answer(event, ${choice.score}, this)">${choice.text}</button>`
        )
        .join("")}
    `;
  } else {
    showResult();
  }
}

function answer(event, scoreValue, btn) {
  if (event) event.preventDefault();

  const buttons = quizEl.querySelectorAll("button");
  buttons.forEach((b) => b.classList.remove("selected"));

  if (btn) {
    btn.classList.add("selected");
  }

  score += scoreValue;

  setTimeout(() => {
    currentQuestion++;
    showQuestion();
  }, 300);
}

function showResult() {
  quizEl.innerHTML = "";

  const shareText = `私は ${score} / 10 点でした！あなたは何点？ #プチナース #看護学生`;

resultEl.innerHTML = `
  <div class="result-card">

    <p class="score-label">あなたの得点は</p>

  <div class="score-main">
    <span class="score-text">${score} / 10</span>
  </div>

  <p class="score-label">
  プチナースで<br>＼国試合格を確実に！／
  </p>
    <a href="https://www.shorinsha.co.jp/book/b10170188.html" target="_blank" rel="noopener noreferrer">
      <img src="nezumi_b.png" alt="ここだけ覚える！の紹介画像" class="result-image" width="500" height="500">
    </a>
    <a href="https://www.shorinsha.co.jp/book/b10170188.html" 
       class="result-link" target="_blank" rel="noopener noreferrer">
      ここだけ覚える！をチェック✅
    </a>

    <a href="index.html" class="back-link">
      はじめの画面に戻る
    </a>

    <a href="javascript:void(0)" onclick="toggleAnswers()" class="back-link">
      答えを見る
    </a>

    <div id="answers" style="
      display:none;
      margin-top:20px;
      padding-bottom:20px;
      border-bottom:1px solid #ddd;
      text-align:left;
    ">
      <p>A1.  85cm以上</p>
      <p>A2.  血圧の低下</p>
      <p>A3.  胸骨の下半分</p>
      <p>A4.  高音域における聴力が低下する</p>
      <p>A5.  80～100/分</p>
      <p>A6.  妊娠37週0日から41週6日</p>
      <p>A7.  抗うつ薬</p>
      <p>A8.  常勤換算で2.5名以上の看護職員が必要である</p>
      <p>A9.  赤</p>
      <p>A10.  34.6%</p>
    </div>

    <div id="result-share" style="margin-top: 20px; display:flex; justify-content:center; gap:20px;">
      <a id="share-x" target="_blank" aria-label="Xでシェア">
        <img src="images/logo-black.png" alt="Xでシェア" style="width:44px; height:44px; background:#fff; padding:6px; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.25);">
      </a>
      <a id="share-line" target="_blank" aria-label="LINEでシェア">
        <img src="images/line-logo.png" alt="LINEでシェア" style="width:44px; height:44px; background:#fff; padding:6px; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.25);">
      </a>
    </div>

    <p style="font-size:12px; color:#666; margin-top:20px;">
    ※本サイトは外部サイトへのリンクを含みます。<br>詳細はリンク先をご確認ください。
    </p>

  </div>
`;

  const xLink = document.getElementById("share-x");
  if (xLink) {
    const xUrl =
      "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(shareText) +
      "&url=" +
      encodeURIComponent(siteUrl);
    xLink.href = xUrl;
  }

  const lineLink = document.getElementById("share-line");
  if (lineLink) {
    const lineUrl =
      "https://social-plugins.line.me/lineit/share?url=" +
      encodeURIComponent(siteUrl + "?score=" + score);
    lineLink.href = lineUrl;
  }

  const logo = document.getElementById("logo");

  if (logo) {
    logo.style.display = "block";

    logo.onclick = () => {
      location.reload();
    };
  }
}

function toggleAnswers() {
  const el = document.getElementById("answers");
  el.style.display = el.style.display === "none" ? "block" : "none";
}