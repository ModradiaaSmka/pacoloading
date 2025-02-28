// Müzik Player için güncellenmiş kod
document.addEventListener("DOMContentLoaded", () => {
    const audio = new Audio("music/loading.mp3")
    const playBtn = document.getElementById("play-btn")
    const volumeSlider = document.getElementById("volume-slider")
    const volumeIcon = document.getElementById("volume-icon")
    const volumeValue = document.getElementById("volume-value")
    let isPlaying = false
  
    // Kayıtlı ses seviyesini yükle
    const savedVolume = localStorage.getItem("musicVolume") || 50
    audio.volume = savedVolume / 100
    volumeSlider.value = savedVolume
    volumeValue.textContent = `${savedVolume}%`
    updateVolumeIcon(savedVolume)
  
    // Otomatik başlatma fonksiyonu
    function autoPlayMusic() {
      audio
        .play()
        .then(() => {
          isPlaying = true
          playBtn.innerHTML = '<i class="fas fa-pause"></i>'
        })
        .catch((error) => {
          console.error("Müzik otomatik başlatılamadı:", error)
          // Kullanıcı etkileşimi gerekiyorsa, sayfaya tıklandığında başlat
          document.addEventListener(
            "click",
            function initAudio() {
              if (!isPlaying) {
                audio.play().then(() => {
                  isPlaying = true
                  playBtn.innerHTML = '<i class="fas fa-pause"></i>'
                  // Event listener'ı kaldır
                  document.removeEventListener("click", initAudio)
                })
              }
            },
            { once: true },
          ) // once: true ile sadece bir kez çalışacak
        })
    }
  
    // Sayfa yüklendiğinde otomatik başlat
    autoPlayMusic()
  
    // Play/Pause butonu
    playBtn.addEventListener("click", () => {
      if (!isPlaying) {
        audio
          .play()
          .then(() => {
            isPlaying = true
            playBtn.innerHTML = '<i class="fas fa-pause"></i>'
          })
          .catch((error) => {
            console.error("Müzik başlatılamadı:", error)
          })
      } else {
        audio.pause()
        isPlaying = false
        playBtn.innerHTML = '<i class="fas fa-play"></i>'
      }
    })
  
    // Ses kontrolü
    volumeSlider.addEventListener("input", (e) => {
      const value = e.target.value
      audio.volume = value / 100
      volumeValue.textContent = `${value}%`
      localStorage.setItem("musicVolume", value)
      updateVolumeIcon(value)
    })
  
    // Ses ikonu güncelleme
    function updateVolumeIcon(value) {
      volumeIcon.className = "fas"
      if (value == 0) {
        volumeIcon.classList.add("fa-volume-mute")
      } else if (value < 50) {
        volumeIcon.classList.add("fa-volume-down")
      } else {
        volumeIcon.classList.add("fa-volume-up")
      }
    }
  
    // Ses ikonu tıklama (sesi kapatma/açma)
    volumeIcon.addEventListener("click", () => {
      if (audio.volume > 0) {
        localStorage.setItem("previousVolume", volumeSlider.value)
        audio.volume = 0
        volumeSlider.value = 0
        volumeValue.textContent = "0%"
        updateVolumeIcon(0)
      } else {
        const previousVolume = localStorage.getItem("previousVolume") || 50
        audio.volume = previousVolume / 100
        volumeSlider.value = previousVolume
        volumeValue.textContent = `${previousVolume}%`
        updateVolumeIcon(previousVolume)
      }
    })
  
    // Müzik bittiğinde
    audio.addEventListener("ended", () => {
      audio.currentTime = 0
      audio.play() // Otomatik olarak tekrar başlat
    })
  })
  
  // FiveM yükleme kodları
  let loadingProgress = 0
  const loadingBar = document.querySelector(".loading-bar")
  const loadingPercentage = document.getElementById("loading-percentage")
  const statusText = document.getElementById("status-text")
  
  function SetStatusText(text) {
    if (statusText) {
      statusText.textContent = text
    }
  }
  
  function SetProgress(progress) {
    loadingProgress = progress
    if (loadingBar) {
      loadingBar.style.width = `${progress}%`
    }
    if (loadingPercentage) {
      loadingPercentage.textContent = `(${Math.round(progress)}%)`
    }
  }
  
  // FiveM mesajlarını dinle
  window.addEventListener("message", (event) => {
    const data = event.data
    if (data.eventName === "loadProgress") {
      SetProgress(data.loadFraction * 100)
    } else if (data.eventName === "statusText") {
      SetStatusText(data.status)
    }
  })
  
  