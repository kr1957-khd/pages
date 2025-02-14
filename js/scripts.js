
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


// 진행바 
document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.querySelector(".progress-bar");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY; // 현재 스크롤 위치
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBar.style.width = scrollPercent + "%";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const mainNav = document.getElementById("mainNav");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 1) { //  스크롤 이후 나타남
      mainNav.classList.add("show");
    } else {
      mainNav.classList.remove("show");
    }
  });
});

// 스크롤에 따라 텍스트 숨기기
function adjustBlendedTextOpacity1() {
  const blendedTextElements = document.querySelectorAll('.main-text4');
  const fadeStart = 0; // 스크롤 시작 지점
  const fadeEnd = 500; // 스크롤 끝 지점 (글씨가 완전히 사라지는 지점)
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
    { selector: ".main-image2", fadeStart: 1800, fadeEnd: 2300 },
    { selector: ".main-text1", fadeStart: 1300, fadeEnd: 1800 },
    { selector: ".main-text2", fadeStart: 1000, fadeEnd: 2500 },
    { selector: ".main-text3", fadeStart: 3700, fadeEnd: 4200 }
  ];
  const imageElement = document.querySelector(".main-image1"); // `.main-text1`과 함께 동기화
  const imageElement2 = document.querySelector(".main-image2"); // `.main-text1`과 함께 동기화

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

function adjustBlendedTextOpacity3() {
  const blendedTextElements = document.querySelectorAll('.main-text5');
  const fadeStart = 800; // 스크롤 시작 지점 (점점 나타남)
  const fadeEnd = 1200; // 스크롤 끝 지점 (점점 사라짐)
  const fadeRange = fadeEnd - fadeStart;

  blendedTextElements.forEach((element) => {
    const scrollY = window.scrollY;
    let opacity;

    if (scrollY < fadeStart) {
      // fadeStart 이전: 점점 나타나는 효과 (페이드 인)
      opacity = Math.min((scrollY / fadeStart), 1);  
    } else if (scrollY >= fadeStart && scrollY <= fadeEnd) {
      // fadeStart ~ fadeEnd: 완전히 보임
      opacity = 1;  
    } else {
      // fadeEnd 이후: 점점 사라지는 효과 (페이드 아웃)
      opacity = Math.max(1 - ((scrollY - fadeEnd) / fadeRange), 0);
    }

    // opacity 값 적용
    element.style.opacity = opacity.toString();
  });
}

// 스크롤 이벤트 리스너 추가
window.addEventListener("scroll", adjustBlendedTextOpacity3);

// 비디오2 이벤트
// document.addEventListener("DOMContentLoaded", () => {
//   const videoContainer = document.createElement("div");
//   videoContainer.classList.add("video-wrapper2");
//   videoContainer.innerHTML = `
//     <video id="scrollVideo2" class="scroll-video2" muted playsinline>
//       <source src="assets/01_main/droplet_02.mp4" type="video/mp4">
//       Your browser does not support the video tag.
//     </video>
//   `;
//   document.body.appendChild(videoContainer);

//   const video = document.getElementById("scrollVideo2");
//   let isPlaying = false; // 현재 영상이 재생 중인지 여부

//   // 페이지 로드 후 자동 실행
//   function playVideo() {
//     if (!isPlaying) {
//       videoContainer.style.opacity = "1";
//       video.play();
//       isPlaying = true;
//     }
//   }

//   // 스크롤 이벤트 핸들러
//   function handleScroll() {
//     const scrollY = window.scrollY;

//     if (scrollY >= 1150) {
//       videoContainer.style.opacity = "0"; // 페이드아웃
//     }

//     if (scrollY === 0 && !isPlaying) {
//       playVideo(); // 다시 실행 가능
//     }
//   }

//   // 영상이 끝나면 다시 실행 가능하도록 초기화
//   video.addEventListener("ended", () => {
//     isPlaying = false;
//   });

//   // 페이지 로드 시 자동 재생
//   playVideo();

//   // 스크롤 이벤트 추가
//   window.addEventListener("scroll", handleScroll);
// });

document.addEventListener("DOMContentLoaded", () => {
  const videoContainer = document.querySelector(".video-wrapper2");
  const video = document.getElementById("scrollVideo2");
  let isPlaying = false;

  function playVideo() {
    if (!isPlaying) {
      videoContainer.style.opacity = "1";
      video.play();
      isPlaying = true;
    }
  }

  function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY >= 1150) {
      videoContainer.style.opacity = "0"; // 페이드아웃
    }

    if (scrollY === 0 && !isPlaying) {
      playVideo(); // 다시 실행 가능
    }
  }

  video.addEventListener("ended", () => {
    isPlaying = false;
  });

  playVideo();
  window.addEventListener("scroll", handleScroll);
});




document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".main-image2", {
    backgroundSize: "110%", // 배경을 110% 크기로 확대
    ease: "none",
    scrollTrigger: {
      trigger: ".main-image2",
      start: "top top",
      end: "bottom+=3000 top",
      scrub: 1,
    }
  });
});


document.addEventListener("scroll", function () {
  if (window.scrollY > 3000) {
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
        end: "+=4000", //   스크롤 후 효과 종료
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

    });
    img.addEventListener("mouseleave", function() {
      console.log("마우스 벗어남: 회전 종료"); // 디버깅용
      this.classList.remove("rotate");
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
        aboutContent.style.maxHeight = "300px"; // 충분한 높이 설정
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


document.addEventListener("DOMContentLoaded", () => {
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
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");

  // 초기 로딩 시 모달을 숨김
  modal.style.display = "none";

  // 요소가 정상적으로 로드되었는지 확인
  if (!mainImage || !modal || !modalImage) {
    console.error("`mainImage`, `imageModal`, 또는 `modalImage` 요소를 찾을 수 없습니다!");
    return;
  }

  // 메인 이미지 변경 함수
  function setMainImage(index) {
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

  // 팝업 열기 함수
  function openModal() {
    console.log("메인 이미지 클릭됨"); // 디버깅용
    modal.style.display = "flex";
    modalImage.src = mainImage.src;
  }

  // 팝업 닫기 함수
  function closeModal() {
    console.log(" 팝업 닫힘"); // 디버깅용
    modal.style.display = "none";
  }

  // 초기 메인 이미지 설정 (초기 상태에서 opacity 문제 해결)
  mainImage.style.opacity = "1";
  setMainImage(0);

  // 메인 이미지 클릭 시 팝업 열기
  mainImage.addEventListener("click", openModal);

  // 팝업 클릭 시 닫기
  modal.addEventListener("click", closeModal);

  // 썸네일 클릭 이벤트 추가
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => setMainImage(index));
  });
});

