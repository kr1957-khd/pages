// 네비게이션 바 드롭다운 활성화
document.addEventListener("DOMContentLoaded", () => {
  const dropdownToggle = document.querySelector("#sermonDropdown");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener("mouseover", () => {
      dropdownMenu.classList.add("show");
    });

    dropdownToggle.addEventListener("mouseleave", () => {
      dropdownMenu.classList.remove("show");
    });
  }
});


// 스크롤에 따라 텍스트 숨기기
function adjustBlendedTextOpacity() {
  const blendedTextElements = document.querySelectorAll('.blended-text');
  const fadeStart = 0; // 스크롤 시작 지점
  const fadeEnd = 200; // 스크롤 끝 지점 (글씨가 완전히 사라지는 지점)
  const fadeRange = fadeEnd - fadeStart;

  blendedTextElements.forEach((element) => {
    const scrollY = window.scrollY;

    // opacity를 계산 (0에서 1 사이 값)
    let opacity = 1 - Math.min(Math.max((scrollY - fadeStart) / fadeRange, 0), 1);

    // opacity를 설정하여 서서히 사라지게 함
    element.style.opacity = opacity;
  });
}

// 스크롤 이벤트 연결
window.addEventListener('scroll', adjustBlendedTextOpacity);

// 초기 상태 설정
document.addEventListener('DOMContentLoaded', adjustBlendedTextOpacity);

// 네비게이션 바 축소 효과 및 스크롤 스파이
window.addEventListener("DOMContentLoaded", () => {
  const navbarShrink = () => {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) return;

    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  navbarShrink();
  document.addEventListener("scroll", navbarShrink);

  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  const links = document.querySelectorAll('.nav-link[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // 비디오 재생 속도 조절
  const videoElement = document.getElementById("backgroundVideo");
  if (videoElement) {
    videoElement.playbackRate = 1.5; // 영상 재생 속도를 0.5배로 설정
    // 1배 2배 2.0 3배 3.0 으로 설정
  }
});

// 사진 갤러리 슬라이드
const images = [
  "assets/02_img/prof_img_01.png",
  "assets/02_img/prof_img_02.png",
  "assets/02_img/prof_img_03.png",
  "assets/02_img/prof_img_04.png",
  "assets/02_img/prof_img_05.png",
  "assets/02_img/prof_img_06.png",
];

const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".thumbnail");

function setMainImage(index) {
  // 메인 이미지 변경
  mainImage.style.opacity = 0;
  setTimeout(() => {
    mainImage.src = images[index];
    mainImage.style.opacity = 1;
  }, 300);

  // 활성화 썸네일 업데이트
  thumbnails.forEach((thumbnail, i) => {
    thumbnail.classList.toggle("active", i === index);
  });
}

// 초기화
setMainImage(0);
