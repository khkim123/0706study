// quotes.json 파일에서 명언 데이터를 가져옵니다
let quotes = [];
let currentQuote = '';
let currentAuthor = '';

// DOM 요소
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');
const twitterButton = document.querySelector('.twitter');
const facebookButton = document.querySelector('.facebook');
const copyButton = document.querySelector('.copy-btn');

// 명언 데이터를 가져오는 함수
async function fetchQuotes() {
    try {
        const response = await fetch('quotes.json');
        quotes = await response.json();
        showRandomQuote(); // 초기 명언 표시
    } catch (error) {
        console.error('명언을 불러오는데 실패했습니다:', error);
        quoteText.textContent = '명언을 불러오는데 실패했습니다.';
        authorText.textContent = '잠시 후 다시 시도해주세요.';
    }
}

// 랜덤 명언을 표시하는 함수
function showRandomQuote() {
    // 페이드 아웃 효과
    quoteText.style.opacity = 0;
    authorText.style.opacity = 0;
    
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const { quote, author } = quotes[randomIndex];
        
        currentQuote = quote;
        currentAuthor = author;
        
        quoteText.textContent = quote;
        authorText.textContent = `- ${author}`;
        
        // 페이드 인 효과
        quoteText.style.opacity = 1;
        authorText.style.opacity = 1;
    }, 500);
}

// 트위터에 공유하기
function shareTwitter() {
    const text = `"${currentQuote}" - ${currentAuthor}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank');
}

// 페이스북에 공유하기
function shareFacebook() {
    const url = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
}

// 클립보드에 복사하기
async function copyToClipboard() {
    const text = `"${currentQuote}" - ${currentAuthor}`;
    try {
        await navigator.clipboard.writeText(text);
        showToast('클립보드에 복사되었습니다!');
    } catch (err) {
        showToast('복사에 실패했습니다. 다시 시도해주세요.');
    }
}

// 토스트 메시지 표시
function showToast(message) {
    // 이전 토스트가 있다면 제거
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // 새 토스트 생성
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // 토스트 스타일
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        zIndex: '1000',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });

    // 토스트 표시
    setTimeout(() => toast.style.opacity = '1', 10);

    // 3초 후 제거
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 이벤트 리스너
newQuoteButton.addEventListener('click', showRandomQuote);
twitterButton.addEventListener('click', shareTwitter);
facebookButton.addEventListener('click', shareFacebook);
copyButton.addEventListener('click', copyToClipboard);

// 페이지 로드 시 명언 데이터 가져오기
document.addEventListener('DOMContentLoaded', fetchQuotes);

// 트랜지션 효과를 위한 CSS 추가
quoteText.style.transition = 'opacity 0.5s ease';
authorText.style.transition = 'opacity 0.5s ease'; 