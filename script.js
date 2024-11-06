let hasScrolled = false;

// 初期状態に戻す関数
function resetCircle() {
    const circle = document.querySelector('.circle');
    circle.style.width = '94px';
    circle.style.height = '51px';
    circle.style.borderRadius = '215px';
    circle.style.backgroundColor = 'rgba(60, 100, 126, 0)';
    circle.style.filter = 'blur(20px)';
}

// ページが読み込まれたときに円を初期状態に戻す
window.onload = resetCircle;

function startScrollAnimation() {
    document.addEventListener('scroll', function() {
        const circle = document.querySelector('.circle');
        const scrollPosition = window.scrollY;
        const maxHeight = document.body.scrollHeight - window.innerHeight;
        const aspectRatio = 94 / 51;

        // 初回スクロール時に色を不透明に設定
        if (!hasScrolled) {
            hasScrolled = true;
            circle.style.backgroundColor = `rgba(60, 100, 126, 1)`;
        }

        // スクロールに応じたサイズ変更
        const sizeFactor = scrollPosition / maxHeight;
        const initialWidth = 94;
        const finalWidth = Math.max(window.innerWidth, window.innerHeight);
        const currentWidth = initialWidth + (finalWidth - initialWidth) * sizeFactor;
        const currentHeight = currentWidth / aspectRatio;

        if (currentHeight >= window.innerHeight) {
            circle.style.width = `${window.innerWidth}px`;
            circle.style.height = `${window.innerHeight}px`;
            circle.style.borderRadius = '0';
            if (scrollPosition >= maxHeight) {
                circle.style.filter = 'blur(0)';
            }
        } else {
            circle.style.width = `${currentWidth}px`;
            circle.style.height = `${currentHeight}px`;
            circle.style.borderRadius = '215px';
        }

        // 透明度変更
        const opacity = Math.min(1, scrollPosition / maxHeight);
        circle.style.backgroundColor = `rgba(60, 100, 126, ${opacity})`;

        // ブラーの減少
        const blurFactor = Math.min(1, scrollPosition / maxHeight);
        const blurAmount = 20 * (1 - blurFactor);
        circle.style.filter = `blur(${blurAmount}px)`;

        // スクロールを戻したときのブラー
        if (scrollPosition < maxHeight) {
            const reverseBlurFactor = Math.min(1, (maxHeight - scrollPosition) / maxHeight);
            const reverseBlurAmount = 20 * reverseBlurFactor;
            circle.style.filter = `blur(${reverseBlurAmount}px)`;
        }
    });
}
