// プレイヤーの参照を取得
const player = document.getElementById('lottie-player');

// スクロールイベントでアニメーションを制御
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset; // 現在のスクロール量
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight; // ドキュメントの高さ
  const scrollFraction = scrollTop / documentHeight; // スクロール量の割合
  const frame = Math.min(scrollFraction * 652, 652); // 0〜100%の範囲に正規化
  player.seek(frame); // フレームを指定してアニメーション位置を更新
});