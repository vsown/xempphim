var swiper = new Swiper(".popular-content", {
  slidesPerView: 1,
  spaceBetween: 10,
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    280: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    510: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    758: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    900: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});

// Get all play buttons (both the main one and trailer button)
let playButtons = document.querySelectorAll(".play-movie, .play-trailer");
let video = document.querySelector(".video-container");
let myvideo = document.querySelector("#myVideo"); // Fixed ID to match your HTML (was #myvideo)
let closebtn = document.querySelector(".close-video");

// Add event listeners to all play buttons
playButtons.forEach(button => {
  button.addEventListener("click", function(e) {
    e.preventDefault(); // Prevent default action for anchor tags
    video.classList.add("show-video");
    myvideo.play();
  });
});
// Xử lý sự kiện khi nhấn nút đóng video
closebtn.addEventListener("click", function () {
  video.classList.remove("show-video");
  myvideo.pause();
  myvideo.currentTime = 0; // Nếu bạn muốn nó trở về đầu
});


// Lấy dữ liệu phim (có thể thay bằng API thực tế)
const movies = [
  { title: "Địa đạo: Mặt trời trong bóng tối", type: "Hành động", link: "play-pagemain.html", image:"img/diadao.jpg" },
  { title: "Bộ Tứ Báo Thủ", type: "Tình cảm, Hài", link: "play-page2.html",image:"img/botubaothuPoster.jpg" },
  { title: "Cám", type: "Kinh dị", link: "play-page3.html", image:"img/Cam.jpg" },
  { title: "Ma Da", type: "Kinh dị", link: "play-page4.html" ,image:"img/mada.jpg" },
  { title: "Hai Phượng", type: "Hành động", link: "play-page5.html",image:"img/haiphuong.jpg"},
  { title: "Ma Mười", type: "Kinh dị", link: "play-page6.html" ,image:"img/mamuoi.jpg"},
  { title: "Mắt Biếc", type: "Lãng mạn", link: "play-page7.html" ,image:"img/mat_biec.jpg"},
  { title: "Nụ Hôn Bạc Tỷ", type: "Hài Hước,Tình Cảm", link: "play-page8.html" ,image:"img/nuhonbacty.jpg"},
  { title: "Tèo Em", type: "Hài Hước", link: "play-page9.html" ,image:"img/Teoem.jpg"},
  { title: "Mai", type: "Tình Cảm", link: "play-page.html",image:"img/Phim_Mai.jpg" },
  { title: "Tiệc Trăng Máu", type: "Tâm lý,Chính kịch", link: "play-page10.html" ,image:"img/tiectrangmau.jpg"},
  { title: "Quỷ Nhập Tràng", type: "Kinh dị", link: "play-page11.html" ,image:"img/quynhaptrang.jpg"},
  { title: "Siêu Sao Siêu Ngố", type: "Hài,Tình cảm", link: "play-page12.html",image:"img/sieusaosieungo.jpg" },
  { title: "Bố Già", type: "Hài,Chính kịch", link: "play-page13.html",image:"img/bogia.jpg" },
  { title: "Chị Dâu", type: "Drama", link: "play-page14.html",image:"img/chidau.jpg" },
  { title: "Ròm", type: "Tâm lý", link: "play-page15.html" ,image:"img/rom.jpg"},
  { title: "Nhà Bà Nữ", type: "Hài,Chính kịch", link: "play-page16.html" ,image:"img/nhabanu.jpg"}
];

// Xử lý sự kiện tìm kiếm
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchIcon = document.querySelector('.search-box i.bx-search');
  
  // Tìm kiếm khi nhấn icon hoặc nhấn Enter
  searchIcon.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          performSearch();
      }
  });
  
  function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm === '') return;
  
    const results = movies
    .filter(movie =>
      movie.title.toLowerCase().includes(searchTerm)
    )
    
    

      .map(movie => ({
        ...movie,
        highlightedTitle: highlightSearchTerm(movie.title, searchTerm),
        highlightedType: highlightSearchTerm(movie.type, searchTerm)
      }));
  
    displaySearchResults(results);
  }
  
  function highlightSearchTerm(text, term) {
      if (!term) return text;
      const regex = new RegExp(`(${term})`, 'gi');
      return text.replace(regex, '<span class="highlight">$1</span>');
  }
  
  function displaySearchResults(results) {
      // Tạo modal hoặc popup hiển thị kết quả
      let resultsContainer = document.querySelector('.search-results-container');
      
      if (!resultsContainer) {
          resultsContainer = document.createElement('div');
          resultsContainer.className = 'search-results-container';
          document.body.appendChild(resultsContainer);
          
          // Đóng kết quả khi click bên ngoài
          document.addEventListener('click', function(e) {
              if (!e.target.closest('.search-box') && !e.target.closest('.search-results-container')) {
                  resultsContainer.style.display = 'none';
              }
          });
      }
      
      if (results.length === 0) {
          resultsContainer.innerHTML = `
              <div class="search-result-item no-results">
                  <p>Không tìm thấy phim phù hợp với "${searchInput.value}"</p>
              </div>
          `;
      } else {
        resultsContainer.innerHTML = results.map(movie => `
          <div class="search-result-item">
            <a href="${movie.link}" style="display: flex; align-items: center; gap: 10px;">
              <img src="${movie.image}" alt="${movie.title}" style="width: 60px; height: 90px; object-fit: cover; border-radius: 4px;">
              <div>
                <h3>${movie.title}</h3>
                <p>${movie.type}</p>
              </div>
            </a>
          </div>
        `).join('');
        
      }
      
      // Hiển thị container
      const searchBox = document.querySelector('.search-box');
      resultsContainer.style.display = 'block';
      resultsContainer.style.top = `${searchBox.offsetTop + searchBox.offsetHeight + 10}px`;
      resultsContainer.style.left = `${searchBox.offsetLeft}px`;
      resultsContainer.style.width = `${searchBox.offsetWidth}px`;
  }
});