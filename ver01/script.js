let hasScrolled = false; // スクロールが開始されたかどうかを追跡する変数

// 初期状態に戻す関数
function resetCircle() {
    const circle = document.querySelector('.circle');
    circle.style.width = '94px'; // 初期幅
    circle.style.height = '51px'; // 初期高さ
    circle.style.borderRadius = '215px'; // 初期状態は楕円
    circle.style.backgroundColor = 'rgba(60, 100, 126, 0)'; // 初期状態は透明
    circle.style.filter = 'blur(20px)'; // 初期状態はブラーあり
}

// ページが読み込まれたときに円を初期状態に戻す
window.onload = resetCircle;

document.addEventListener('scroll', function() {
    const circle = document.querySelector('.circle');
    const scrollPosition = window.scrollY; // 現在のスクロール位置
    const maxHeight = document.body.scrollHeight - window.innerHeight; // 最大スクロール可能な高さ
    const aspectRatio = 94 / 51; // アスペクト比（初期の幅と高さの比率）

    // スクロールが開始された場合、最初に色を変更
    if (!hasScrolled) {
        hasScrolled = true; // フラグを立てる
        circle.style.backgroundColor = `rgba(60, 100, 126, 1)`; // 不透明な色に設定
    }

    // スクロール位置に基づいて円のサイズを変更
    const sizeFactor = scrollPosition / maxHeight; // スクロール位置の比率
    const initialWidth = 94; // 初期の幅
    const finalWidth = Math.max(window.innerWidth, window.innerHeight); // 最終的な幅は画面の幅または高さの最大値

    // 縦幅が画面に達するまで楕円の形状を維持
    const currentWidth = initialWidth + (finalWidth - initialWidth) * sizeFactor; // スクロールに応じて幅を設定
    const currentHeight = currentWidth / aspectRatio; // アスペクト比を保つために高さを設定

    // 縦幅が画面に達した後、長方形に変形
    if (currentHeight >= window.innerHeight) {
        circle.style.width = `${window.innerWidth}px`; // 横幅を画面の幅に設定
        circle.style.height = `${window.innerHeight}px`; // 高さを画面の高さに設定

        // ラウンドを緩める
        circle.style.borderRadius = '0'; // ラウンドを0にして長方形に
        
        // 最終状態になったらブラーをなくす
        if (scrollPosition >= maxHeight) {
            circle.style.filter = 'blur(0)'; // 最終状態ではブラーをなくす
        }
    } else {
        circle.style.width = `${currentWidth}px`;
        circle.style.height = `${currentHeight}px`;
        circle.style.borderRadius = '215px'; // 初期のラウンドを維持
    }

    // 透明度を変更
    const opacity = Math.min(1, scrollPosition / maxHeight); // 0から1の範囲で透明度を設定
    circle.style.backgroundColor = `rgba(60, 100, 126, ${opacity})`; // 色を設定

    // ブラーの透明度を調整
    const blurFactor = Math.min(1, scrollPosition / maxHeight); // 0から1の範囲でブラーの減少を設定
    const blurAmount = 20 * (1 - blurFactor); // 最大20pxからの減少
    circle.style.filter = `blur(${blurAmount}px)`; // ブラーを設定

    // スクロールを戻したときにもブラーを調整
    if (scrollPosition < maxHeight) {
        const reverseBlurFactor = Math.min(1, (maxHeight - scrollPosition) / maxHeight);
        const reverseBlurAmount = 20 * reverseBlurFactor; // 最大20pxからの増加
        circle.style.filter = `blur(${reverseBlurAmount}px)`; // スクロールダウンに応じてブラーを増加させる
    }
});