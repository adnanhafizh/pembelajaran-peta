document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageIndicator = document.getElementById('pageIndicator');
    const optionButtons = document.querySelectorAll('#page6 .option-button');
    const feedbackDiv = document.getElementById('quiz-feedback');
    let userName = "";
    // Tangkap elemen modal dan tombol
    const nameModal = document.getElementById('nameModal');
    const starttButton = document.getElementById('starttButton');
    const userNameInput = document.getElementById('userName');
    const mainContainer = document.querySelector('.container');
    const playButton = document.getElementById('playButton');
    const locationStatus = document.getElementById('locationStatus');
    const gameQuestions = [
        {
            question: "Apa fungsi utama dari legenda dalam peta?",
            options: [
                "Menunjukkan arah utara",
                "Menjelaskan arti simbol-simbol peta",
                "Menentukan skala peta",
                "Memberi judul peta"
            ],
            correctAnswer: 1,
            points: 20
        },
        {
            question: "Jika skala peta 1:50.000, berarti 1 cm di peta sama dengan...",
            options: [
                "50 cm di dunia nyata",
                "500 meter di dunia nyata",
                "5 km di dunia nyata",
                "50 km di dunia nyata"
            ],
            correctAnswer: 1,
            points: 20
        },
        {
            question: "Simbol warna biru pada peta biasanya menunjukkan...",
            options: [
                "Gunung",
                "Hutan",
                "Perairan",
                "Jalan raya"
            ],
            correctAnswer: 2,
            points: 20
        },
        {
            question: "Apa yang harus selalu ada dalam peta yang baik?",
            options: [
                "Judul, legenda, skala, orientasi",
                "Gambar pemandangan",
                "Foto pembuat peta",
                "Daftar harga"
            ],
            correctAnswer: 0,
            points: 20
        },
        {
            question: "Peta digital pertama dikembangkan oleh negara...",
            options: [
                "Amerika Serikat",
                "Kanada",
                "Jepang",
                "Inggris"
            ],
            correctAnswer: 1,
            points: 20
        }
    ];
    // Game Variables
    let currentQuestion = 0;
    let totalScore = 0;
    let gameStarted = false;
    let currentPage = 0;
    // DOM Elements
    const startButton = document.getElementById('startGame');
    const restartButton = document.getElementById('restartGame');
    const gameContent = document.getElementById('gameContent');
    const gameResults = document.getElementById('gameResults');
    const totalScoreElement = document.getElementById('totalScore');
    const finalScoreElement = document.getElementById('finalScore');
    const finalMessageElement = document.getElementById('finalMessage');
    const currentLevelElement = document.getElementById('currentLevel');
    const badgeImage = document.getElementById('badgeImage');
    const badgeText = document.getElementById('badgeText');
    const totalPages = pages.length;

    // Tampilkan modal saat halaman dimuat
    window.addEventListener('DOMContentLoaded', function() {
        nameModal.style.display = 'flex';
        mainContainer.style.display = 'none';
    });

    // Saat tombol mulai diklik
starttButton.addEventListener('click', function() {
if (userNameInput.value.trim() === '') {
alert('Silakan masukkan nama Anda terlebih dahulu!');
return;
}

userName = userNameInput.value.trim(); // Simpan di variabel global
nameModal.style.display = 'none';
mainContainer.style.display = 'block';
studentNameElement.textContent = userName;

// Simpan juga di localStorage untuk jaga-jaga
localStorage.setItem('studentName', userName);
});

optionButtons.forEach(button => {
button.addEventListener('click', function() {
    const isCorrect = this.getAttribute('data-correct') === 'true';
    const correctAnswer = document.querySelector('#page6 .option-button[data-correct="true"]');
    
    // Disable semua tombol setelah memilih
    optionButtons.forEach(btn => {
        btn.style.cursor = 'not-allowed';
        btn.disabled = true;
    });
    
    // Highlight jawaban yang dipilih
    if (isCorrect) {
        this.style.backgroundColor = '#c8e6c9';
        this.style.borderColor = '#4caf50';
        feedbackDiv.innerHTML = '<span style="color: #2e7d32;">✔ Benar! Jawaban tepat: Timur Laut. Kamu pandai membaca arah peta!</span>';
    } else {
        this.style.backgroundColor = '#ffcdd2';
        this.style.borderColor = '#f44336';
        // Highlight jawaban yang benar dengan warna hijau
        correctAnswer.style.backgroundColor = '#c8e6c9';
        correctAnswer.style.borderColor = '#4caf50';
        feedbackDiv.innerHTML = '<span style="color: #c62828;">✖ Belum tepat! Jawaban benar: <strong>Timur Laut</strong>. Perhatikan lagi arah mata angin di peta.</span>';
    }
    
    feedbackDiv.style.display = 'block';
});
});

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);

    function startGame() {
        currentQuestion = 0;
        totalScore = 0;
        gameStarted = true;
        updateScore();
        gameResults.style.display = 'none';
        loadQuestion();
    }

    function loadQuestion() {
        if (currentQuestion >= gameQuestions.length) {
            endGame();
            return;
        }

        currentLevelElement.textContent = currentQuestion + 1;
        
        const question = gameQuestions[currentQuestion];
        let questionHTML = `
            <div class="question-container">
                <div class="question-text">${question.question}</div>
                <div class="options-container">
        `;

        question.options.forEach((option, index) => {
            questionHTML += `
                <button class="option-button" data-index="${index}">
                    ${option}
                </button>
            `;
        });

        questionHTML += `</div></div>`;
        gameContent.innerHTML = questionHTML;

        // Add event listeners to options
        document.querySelectorAll('.option-button').forEach(button => {
            button.addEventListener('click', function() {
                checkAnswer(parseInt(this.getAttribute('data-index')));
            });
        });
    }



function checkAnswer(selectedIndex) {
const question = gameQuestions[currentQuestion];
const options = document.querySelectorAll('.option-button');
let feedbackMessage = '';

if (selectedIndex === question.correctAnswer) {
    // Correct answer
    totalScore += question.points;
    options[selectedIndex].classList.add('correct');
    feedbackMessage = `
        <div class="feedback-message correct-feedback">
            ✔ Benar! Kamu mendapatkan ${question.points} poin!
        </div>
        <button class="game-button" id="nextQuestion">Lanjutkan</button>
    `;
} else {
    // Wrong answer
    options[selectedIndex].classList.add('incorrect');
    options[question.correctAnswer].classList.add('correct');
    feedbackMessage = `
        <div class="feedback-message incorrect-feedback">
            ✖ Belum tepat! Jawaban benar: ${question.options[question.correctAnswer]}
        </div>
        <button class="game-button" id="nextQuestion">Lanjutkan</button>
    `;
}

// Disable all options
options.forEach(option => {
    option.style.cursor = 'not-allowed';
});

gameContent.innerHTML += feedbackMessage;
updateScore();

document.getElementById('nextQuestion').addEventListener('click', function() {
    currentQuestion++;
    loadQuestion();
});
}

function updateScore() {
totalScoreElement.textContent = totalScore;
}

function endGame() {
gameContent.style.display = 'none';
gameResults.style.display = 'block';
finalScoreElement.textContent = totalScore;

 // Tampilkan nama pengguna
const greetingElement = document.getElementById('userGreeting');
if (greetingElement) {
    greetingElement.textContent = `Halo, ${userName}! Ini hasil kuis kamu:`;
}

// Determine badge based on score
let message = '';
let badge = '';

if (totalScore >= 100) {
    message = `${userName}, luar biasa! Kamu ahli membaca peta! 🎉`;
    badge = "https://png.pngtree.com/png-clipart/20230904/original/pngtree-golden-award-badge-vector-png-image_10831870.png"; // Gold badge
    badgeText.textContent = "Kamu mendapatkan Lencana Emas!";
} else if (totalScore >= 80) {
    message = `${userName},Bagus sekali! Pengetahuan peta mu sudah baik! 👍`;
    badge = "https://img.lovepik.com/png/20231126/silver-star-badge-metal-illustrate-shiny_701479_wh860.png"; // Silver badge
    badgeText.textContent = "Kamu mendapatkan Lencana Perak!";
} else if (totalScore >= 40) {
    message = `${userName}Lumayan! Terus belajar ya! 😊`;
    badge = "https://i.imgur.com/8e3YVhE.png"; // Bronze badge
    badgeText.textContent = "Kamu mendapatkan Lencana Perunggu!";
} else {
    message = "Jangan menyerah! Coba lagi ya! 💪";
    badgeText.textContent = "Terus berlatih untuk mendapatkan lencana!";
}

finalMessageElement.textContent = message;
if (badge) {
    badgeImage.src = badge;
    badgeImage.style.display = 'block';
} else {
    badgeImage.style.display = 'none';
}

gameContent.style.display = 'block';
gameContent.innerHTML = `
    <div class="welcome-screen">
        <h3>Petualangan Evaluasi Peta</h3>
        <p>Ingin mencoba lagi untuk meningkatkan skormu?</p>
        <button id="startGame" class="game-button">Main Lagi</button>
    </div>
`;
document.getElementById('startGame').addEventListener('click', startGame);
}

function showChildFriendlyError(error) {
const messages = {
PERMISSION_DENIED: "Kita tidak bisa menemukan lokasimu karena izin belum diberikan. Mintalah bantuan guru atau orang tua!",
POSITION_UNAVAILABLE: "Lokasimu tidak bisa ditemukan sekarang. Coba lagi nanti ya!",
TIMEOUT: "Pencarian lokasi terlalu lama. Pastikan kamu terhubung ke internet!",
UNKNOWN_ERROR: "Ada masalah kecil. Jangan khawatir, kita bisa mencoba lagi!"
};
locationStatus.innerHTML = `<span style="color: #e91e63;">${messages[error.code] || messages.UNKNOWN_ERROR}</span>`;
}
    
    // Fungsi untuk menampilkan halaman tertentu
    function showPage(pageIndex) {
        // Sembunyikan semua halaman
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Tampilkan halaman yang dipilih
        pages[pageIndex].classList.add('active');
        
        // Update tombol navigasi
        prevBtn.disabled = pageIndex === 0;
        nextBtn.disabled = pageIndex === totalPages - 1;
        
        // Update indikator halaman
        pageIndicator.textContent = `Halaman ${pageIndex + 1} dari ${totalPages}`;
        
        // Scroll ke atas halaman
        window.scrollTo(0, 0);
    }
    
    // Tombol sebelumnya
    prevBtn.addEventListener('click', function() {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        }
    });
    
    // Tombol selanjutnya
    nextBtn.addEventListener('click', function() {
        if (currentPage < totalPages - 1) {
            currentPage++;
            showPage(currentPage);
        }
    });
    
    // Tampilkan halaman pertama saat memulai
    showPage(currentPage);
    
    // Tambahkan navigasi keyboard
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
            prevBtn.click();
        } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
            nextBtn.click();
        }
    });
    

     // Fungsi untuk menampilkan pesan error
function showLocationError(error) {
    const errorMessages = {
        PERMISSION_DENIED: "Anda tidak memberikan izin untuk mengakses lokasi. Silakan coba lagi dan berikan izin.",
        POSITION_UNAVAILABLE: "Lokasi tidak dapat ditentukan saat ini. Pastikan GPS/sinyal baik.",
        TIMEOUT: "Proses pencarian lokasi terlalu lama. Coba lagi nanti.",
        UNKNOWN_ERROR: "Terjadi kesalahan saat mencari lokasi. Silakan coba lagi."
    };

    locationStatus.innerHTML = `<span class="error-message">${errorMessages[error.code] || errorMessages.UNKNOWN_ERROR}</span>`;
}

playButton.addEventListener('click', function() {
locationStatus.textContent = "Mendeteksi lokasi Anda...";

if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(
    function(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        // Cek apakah Street View tersedia di koordinat ini
        checkStreetViewAvailability(lat, lng)
            .then((available) => {
                if (available) {
                    // Jika tersedia, buka Street View langsung
                    const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}&hl=id`;
                    window.open(streetViewUrl, '_blank');
                    locationStatus.innerHTML = `Lokasi ditemukan!<br>Membuka Street View di lokasi Anda...`;
                } else {
                    // Jika tidak tersedia, cari Street View terdekat
                    const mapsUrl = `https://www.google.com/maps/@${lat},${lng},15z/data=!3m1!4b1!4m2!6m1!1s1paGqpeXxrZ3HZ3hJZfZbZfZbZfZbZfZb?hl=id`;
                    window.open(mapsUrl, '_blank');
                    locationStatus.innerHTML = `Lokasi ditemukan!<br>Membuka peta dengan Street View terdekat...`;
                }
            });
    },
    function(error) {
        showLocationError(error);
    }
);
} else {
locationStatus.innerHTML = '<span class="error-message">Browser Anda tidak mendukung fitur geolokasi</span>';
}
});

// Fungsi untuk memeriksa ketersediaan Street View (simulasi)
function checkStreetViewAvailability(lat, lng) {
return new Promise((resolve) => {
// Di implementasi nyata, Anda bisa menggunakan Google Maps JavaScript API
// Ini hanya simulasi sederhana
const rand = Math.random();
resolve(rand > 0.3); // 70% kemungkinan tersedia (contoh saja)
});
}
    
    // Optimasi untuk perangkat mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50 && !nextBtn.disabled) {
            // Geser ke kiri (next)
            nextBtn.click();
        }
        
        if (touchEndX > touchStartX + 50 && !prevBtn.disabled) {
            // Geser ke kanan (prev)
            prevBtn.click();
        }
    }
});
