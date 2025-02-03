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

// 스크롤 이벤트 연결 그림 변환 시 사용
window.addEventListener('scroll', adjustBlendedTextOpacity);

document.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
});

// 애니메이션 테스트

// document.addEventListener('DOMContentLoaded', () => {
//   const background = document.querySelector('.background');
//   const textBlocks = document.querySelectorAll('.text-block');
//   let lastScrollY = 0;
  
//   // 스크롤 이벤트 핸들러
//   function onScroll() {
//       const scrollY = window.scrollY;
      
//       // 배경 확대 효과 (미세하게)
//       const scale = 1 + (scrollY * 0.0003);
//       background.style.transform = `scale(${Math.min(scale, 1.1)})`;
      
//       // 텍스트 블록 표시 로직
//       textBlocks.forEach((block, index) => {
//           const blockTop = block.offsetTop - window.innerHeight/2;
          
//           // 스크롤 위치가 20px 단위로 변경될 때만 체크
//           if (Math.abs(scrollY - lastScrollY) >= 20) {
//               if (scrollY > blockTop) {
//                   block.classList.add('visible');
//               } else {
//                   block.classList.remove('visible');
//               }
//           }
//       });
      
//       // 마지막 스크롤 위치 저장
//       if (Math.abs(scrollY - lastScrollY) >= 20) {
//           lastScrollY = scrollY;
//       }
//   }
  
//   // 스크롤 이벤트 리스너 등록
//   window.addEventListener('scroll', onScroll, { passive: true });
  
//   // 초기 로드 시 실행
//   onScroll();
// });

/// 애니매이션 2번쨰
// document.addEventListener("DOMContentLoaded", () => {
//   gsap.registerPlugin(ScrollTrigger);

//   function homeAnimation() {
//     const tl = gsap.timeline();

//     tl.to(".home .item-kong", { opacity: 1, x: "0px", delay: 0.5, duration: 0.6, ease: "power1.inOut" })
//       .to(".home .scroll-down", { opacity: 1, delay: 0.7, duration: 0.6, ease: "power1.inOut" })
//       .to(".home .sec__text-box", { opacity: 1, scale: 1, y: "0px", delay: 0.3, duration: 0.8, ease: "power1" });

//     gsap.timeline({
//       scrollTrigger: {
//         trigger: ".home",
//         scroller: window,
//         scrub: true,
//         pin: true,
//         pinSpacing: false,
//         endTrigger: ".footer",
//         end: "top top",
//         anticipatePin: 1,
//         markers: true // 디버깅용
//       }
//     }).to(".home", { opacity: 0 });
//   }

//   homeAnimation();
// });

// // 실행
// homeAnimation();

/// 애니매이션 3번쨰
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  function homeAnimation() {
    const tl = gsap.timeline();

    // 1. 홈 섹션 등장 애니메이션
    tl.to(".home .item-kong", { opacity: 1, x: "0px", delay: 0.5, duration: 0.6, ease: "power1.inOut" })
      .to(".home .scroll-down", { opacity: 1, delay: 0.7, duration: 0.6, ease: "power1.inOut" })
      .to(".home .sec__text-box", { opacity: 1, scale: 1, y: "0px", delay: 0.3, duration: 0.8, ease: "power1" });

    // 2. 홈 섹션이 스크롤 시 점점 사라짐
    gsap.timeline({
      scrollTrigger: {
        trigger: ".home",
        scroller: window,
        scrub: true,
        pin: true,
        pinSpacing: false,
        // endTrigger: ".footer", // 푸터만날때까지
        // end: "top top",
        end: "+=2000px",       // 1000px 스크롤 후 종료
        anticipatePin: 1,
        // markers: true // 디버깅용 (완성 후 제거 가능)
      }
    }).to(".home", { opacity: 0 });

    // 3. 모든 .home_title 요소를 처리
    const titles = document.querySelectorAll(".home_title");

    titles.forEach((title, index) => {
      // 각 요소가 위에서 내려오면서 나타나는 효과
      gsap.fromTo(
        title,
        { opacity: 0, y: -100 }, // 처음엔 위에서 시작 + 투명
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: title,
            start: `top center+=${index * 400}`, // 100px마다 등장
            end: `+=400px`, 
            scrub: true,
            toggleActions: "play reverse play reverse" // ✅ 스크롤을 다시 올리면 복구
          }
        }
      );

      // 이전 요소가 사라지는 효과
      if (index > 0) {
        gsap.to(titles[index - 1], {
          opacity: 0,
          scrollTrigger: {
            trigger: title,
            start: `top center+=${(index - 1) * 100}`,
            end: `+=200px`,
            scrub: true,
            toggleActions: "play reverse play reverse" // ✅ 스크롤을 다시 올리면 복구
          }
        });
      }
    });
  }
  

  homeAnimation();
});





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
