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
function adjustBlendedTextOpacity1() {
  const blendedTextElements = document.querySelectorAll('.main-text4');
  const fadeStart = 0; // 스크롤 시작 지점
  const fadeEnd = 400; // 스크롤 끝 지점 (글씨가 완전히 사라지는 지점)
  const fadeRange = fadeEnd - fadeStart;

  blendedTextElements.forEach((element) => {
    const scrollY = window.scrollY;

    // opacity를 계산 (0에서 1 사이 값)
    let opacity = 1 - Math.min(Math.max((scrollY - fadeStart) / fadeRange, 0), 1);

    // opacity를 설정하여 서서히 사라지게 함
    element.style.opacity = opacity;
  });
}
window.addEventListener("scroll", adjustBlendedTextOpacity1);


// 스크롤에 따라 텍스트 나오기
function adjustBlendedTextOpacity2() {
  const textElements = [
    { selector: ".main-text1", fadeStart: 600, fadeEnd: 1000 },
    { selector: ".main-text2", fadeStart: 1000, fadeEnd: 1400 },
    { selector: ".main-text3", fadeStart: 1400, fadeEnd: 1800 }
  ];
  const imageElement = document.querySelector(".main-image1"); // `.main-text1`과 함께 동기화

  const scrollY = window.scrollY;

  textElements.forEach(({ selector, fadeStart, fadeEnd }) => {
    const element = document.querySelector(selector);
    if (!element) return; // 요소가 없으면 건너뛰기

    const fadeRange = fadeEnd - fadeStart;
    let opacity = Math.min(Math.max((scrollY - fadeStart) / fadeRange, 0), 1);

    // 스크롤 범위에 맞춰 opacity 적용
    element.style.opacity = opacity;
    // `main-text1`이 보일 때만 이미지도 함께 보이도록 설정
    if (selector === ".main-text1" && imageElement) {
      imageElement.style.opacity = opacity;
      imageElement.style.transform = `translateX(${-40 + opacity * 20}px)`; // 왼쪽에서 중앙으로 이동
    }
  });
}
// 스크롤 이벤트 연결 그림 변환 시 사용
window.addEventListener('scroll', adjustBlendedTextOpacity2);

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".masthead", {
    backgroundSize: "110%", // 배경을 110% 크기로 확대
    ease: "none",
    scrollTrigger: {
      trigger: ".masthead",
      start: "top top",
      end: "bottom+=2000 top",
      scrub: 1,
    }
  });
});




document.addEventListener("scroll", function () {
  if (window.scrollY > 2000) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
});

/// 애니매이션 4번쨰
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  function homeAnimation1() {
    // `.masthead`가 500px 동안 고정 후 서서히 사라짐
    gsap.timeline({
      scrollTrigger: {
        trigger: ".masthead",
        scroller: window,
        scrub: true,
        pin: true, //  500px 동안 `.masthead` 고정
        pinSpacing: true, //  `#about`이 자연스럽게 올라오도록 설정 (false 제거)
        start: "top top",
        end: "+=2200", //   스크롤 후 효과 종료
        anticipatePin: 1,
        // markers: true //  디버깅용 (완성 후 제거 가능)
      }
    }).to(".masthead", { opacity: 0 });

    //  `#about` 애니메이션 제거 (masthead의 영향을 받지 않도록 설정)
    gsap.set("#about", { clearProps: "all" }); //  불필요한 애니메이션 효과 제거
  }
  // function homeAnimation2() {
  //   // 섹션이 스크롤 시 점점 사라짐
  //   gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ".home",
  //       scroller: window,
  //       scrub: true,
  //       pin: true,
  //       pinSpacing: false,
  //       // endTrigger: ".footer", // 푸터만날때까지
  //       // end: "top top",
  //       end: "+=2000",       // 1000px 스크롤 후 종료
  //       anticipatePin: 1,
  //       // markers: true // 디버깅용 (완성 후 제거 가능)
  //     }
  //   }).to(".home", { opacity: 0 });
  // }

  homeAnimation1();
  // homeAnimation2();
});

// // 초기 상태 설정 애니메이션 알수없는 코드
// document.addEventListener('DOMContentLoaded', adjustBlendedTextOpacity);


// achive 관련 이벤트
document.addEventListener("DOMContentLoaded", () => {
  // .achv 이미지에 hover 이벤트 추가
  document.querySelectorAll(".achv").forEach(img => {
    img.addEventListener("mouseenter", function() {
      this.style.transform = "scaleX(-1)" ; // 첫 번째 좌우 반전
      setTimeout(() => {
        this.style.transform = "scaleX(1)"; // 두 번째 반전 (원래 이미지로 복귀)
      }, 400); // 초 후 다시 원래대로
      // console.log("마우스 올림: 360회전 시작"); // 디버깅용
      // this.classList.add("rotate");

      // const text = this.nextElementSibling; // 바로 아래 텍스트 찾기
      // if (text && text.classList.contains("achv-text1")) {
      //   text.style.color = "#35373e"; // 강조 색상 변경
      // }
    });

    img.addEventListener("mouseleave", function() {
      console.log("마우스 벗어남: 회전 종료"); // 디버깅용
      this.classList.remove("rotate");

      // const text = this.nextElementSibling; // 텍스트 원래 상태로 복구
      // if (text && text.classList.contains("achv-text1")) {
      //   text.style.color = "#35373e"; // 원래 색상
      // }
    });
  });
});

// 약력 숨기기/드러내기 이벤트
document.addEventListener("DOMContentLoaded", () => { 
  const toggleButton = document.getElementById("toggleButton"); // 버튼 가져오기
  const toggleIcon = document.getElementById("toggleIcon");
  const aboutContent = document.getElementById("aboutContent");

  toggleButton.addEventListener("click", function () {
    if (aboutContent.classList.contains("show")) {
      aboutContent.style.maxHeight = "0px"; // 숨기기
      aboutContent.style.opacity = "0"; // 투명하게
      setTimeout(() => {
        aboutContent.classList.remove("show");
      }, 500); // 애니메이션 시간과 동일하게 설정 (0.5s)
      toggleIcon.src = "assets/03_achv/qmenu5.png"; // "더 보기" 아이콘으로 변경
    } else {
      aboutContent.classList.add("show");
      aboutContent.style.display = "block"; // 표시되도록 변경
      setTimeout(() => {
        aboutContent.style.maxHeight = "2000px"; // 충분한 높이 설정
        aboutContent.style.opacity = "1"; // 완전히 보이도록 설정
      }, 10); // display 속성이 적용된 후 max-height 변경 (애니메이션 적용)
      toggleIcon.src = "assets/03_achv/qmenu5.png"; // "접기" 아이콘으로 변경
    }
  });
});


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
