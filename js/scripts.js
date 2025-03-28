document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 500); // 0.5초 후에 페이지를 표시
});

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
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBar.style.width = scrollPercent + "%";
  });
});

// 메인 스크롤 이벤트 최적화 
document.addEventListener("DOMContentLoaded", () => {
  const mainNav = document.getElementById("mainNav");
  const blendedTextElements = document.querySelectorAll(".main-text1");
  const videoContainer = document.querySelector(".video-wrapper2");
  const video = document.getElementById("scrollVideo2");
  let isPlaying = false;
  let firstTiming = 200;

  // 🔹 네비게이션 스크롤 이벤트
  function handleNavbarScroll() {
    if (window.scrollY > firstTiming) {
      mainNav.classList.add("show");
      mainNav.classList.add("navbar-scrolled"); // ✅ mainNav 직접 사용
    } else {
      mainNav.classList.remove("show");
      mainNav.classList.remove("navbar-scrolled");
    }
  }

  // 🔹 텍스트 페이드아웃
  function adjustBlendedTextOpacity() {
    const fadeStart = 0;
    const fadeEnd = firstTiming;
    const fadeRange = fadeEnd - fadeStart;
    const scrollY = window.scrollY;

    blendedTextElements.forEach((element) => {
      const opacity = 1 - Math.min(Math.max((scrollY - fadeStart) / fadeRange, 0), 1);
      element.style.opacity = opacity;
    });
  }

  
  // 🔹 스크롤 연동 비디오 표시
  function handleVideoScroll() {
    const scrollY = window.scrollY;

    if (scrollY >= firstTiming + 50) {
      videoContainer.style.opacity = "0";
      isPlaying = false;
    }

    if (scrollY === 0 && !isPlaying) {
      playVideo();
    }
  }

  // 🔹 비디오 재생
  function playVideo() {
    videoContainer.style.opacity = "1";
    video.play();
    isPlaying = true;
  }


// 🔹 reveal-container 애니메이션 처리
const revealOffsets = new Map()
const revealedContainers = new Set()

function handleRevealSections() {
  const containers = document.querySelectorAll('.reveal-container')
  const bgImage = document.querySelector('.reveal-image')

  containers.forEach((container) => {
    const rect = container.getBoundingClientRect()
    const scrollY = window.scrollY

    // 오프셋이 없으면 처음에만 생성
    if (!revealOffsets.has(container)) {
      const randomFactor = Math.random() * 0.2 + 0.8 // 0.5~0.7
      revealOffsets.set(container, window.innerHeight * randomFactor)
    }

    const threshold = revealOffsets.get(container)

    // ✅ 조건 충족 시: 등장 (랜덤 지연)
    if (scrollY > 400 && rect.top < threshold && !revealedContainers.has(container)) {
      revealedContainers.add(container)

      const delay = Math.random() * 1000 + 300 // 300ms ~ 1000ms
      setTimeout(() => {
        // 다시 스크롤 내려갔다가 올라온 경우 방지
        if (scrollY > 400 && container.getBoundingClientRect().top < threshold) {
          container.classList.add('visible')

          const messages = container.querySelectorAll('.message')
          messages.forEach((msg, i) => {
            msg.style.transitionDelay = `${i * 500}ms`
            msg.classList.add('show')
          })
          if (bgImage) bgImage.classList.add('visible')

        }
      }, delay)
    }

    // ⛔ 조건 불충족 시: 리셋 (스크롤이 위로 올라갔거나 화면에서 벗어난 경우)
    if (scrollY <= 400 || rect.top >= window.innerHeight) {
      container.classList.remove('visible')
      const messages = container.querySelectorAll('.message')
      messages.forEach(msg => {
        msg.classList.remove('show')
        msg.style.transitionDelay = '0ms'
      })
      if (bgImage) bgImage.classList.remove('visible')

      // 다시 등장 가능하도록 상태 초기화
      revealedContainers.delete(container)
    }
  })
}


  // 🔹 스크롤 이벤트 등록
  window.addEventListener("scroll", () => {
    handleNavbarScroll();
    adjustBlendedTextOpacity();
    handleVideoScroll();
    handleRevealSections();
  });

  // 🔹 비디오 종료 시 상태 업데이트
  video.addEventListener("ended", () => {
    isPlaying = false;
  });

  // 최초 1회 실행
  playVideo();
  handleNavbarScroll();
  adjustBlendedTextOpacity();

  // 🔹 GSAP 애니메이션 등록
  gsap.registerPlugin(ScrollTrigger);

  gsap.timeline({
    scrollTrigger: {
      trigger: ".masthead",
      scroller: window,
      scrub: true,
      pin: true,
      pinSpacing: true,
      start: "top top",
      end: "+=1500",
      anticipatePin: 1
    }
  }).to(".masthead", { opacity: 0 });

  gsap.set("#about", { clearProps: "all" });
});



// // 메인 글씨 이벤트
// document.addEventListener("DOMContentLoaded", () => {
//   const mainNav = document.getElementById("mainNav");

//   window.addEventListener("scroll", () => {
//     if (window.scrollY > 200) {
//       //  스크롤 이후 나타남
//       mainNav.classList.add("show");
//       navbar.classList.add("navbar-scrolled");
//     } else {
//       mainNav.classList.remove("show");
//       navbar.classList.remove("navbar-scrolled");
//     }
//   });
// });

// // 스크롤에 따라 텍스트 숨기기
// function adjustBlendedTextOpacity1() {
//   const blendedTextElements = document.querySelectorAll(".main-text4");
//   const fadeStart = 0; // 스크롤 시작 지점
//   const fadeEnd = 200; // 스크롤 끝 지점 (글씨가 완전히 사라지는 지점)
//   const fadeRange = fadeEnd - fadeStart;

//   blendedTextElements.forEach((element) => {
//     const scrollY = window.scrollY;

//     // opacity를 계산 (0에서 1 사이 값)
//     let opacity =
//       1 - Math.min(Math.max((scrollY - fadeStart) / fadeRange, 0), 1);

//     // opacity를 설정하여 서서히 사라지게 함
//     element.style.opacity = opacity;
//   });
// }

// window.addEventListener("scroll", adjustBlendedTextOpacity1);

// // 정암 김홍도 비디오2 이벤트
// document.addEventListener("DOMContentLoaded", () => {
//   const videoContainer = document.querySelector(".video-wrapper2");
//   const video = document.getElementById("scrollVideo2");
//   let isPlaying = false;

//   function playVideo() {
//     if (!isPlaying) {
//       videoContainer.style.opacity = "1";
//       video.play();
//       isPlaying = true;
//     }
//   }

//   function handleScroll() {
//     const scrollY = window.scrollY;
//     if (scrollY >= 300) {
//       videoContainer.style.opacity = "0"; // 페이드아웃
//       isPlaying = false;
//     }
//     if (scrollY === 0 && !isPlaying) {
//       playVideo(); // 다시 실행 가능
//     }
//   }
//   video.addEventListener("ended", () => {
//     isPlaying = false;
//   });

//   playVideo();
//   window.addEventListener("scroll", handleScroll);
// });

// /// 애니매이션 4번쨰
// document.addEventListener("DOMContentLoaded", () => {
//   gsap.registerPlugin(ScrollTrigger);

//   function homeAnimation1() {
//     gsap
//       .timeline({
//         scrollTrigger: {
//           trigger: ".masthead",
//           scroller: window,
//           scrub: true,
//           pin: true, //  500px 동안 `.masthead` 고정
//           pinSpacing: true, //  `#about`이 자연스럽게 올라오도록 설정 (false 제거)
//           start: "top top",
//           end: "+=1000", //   스크롤 후 효과 종료
//           anticipatePin: 1,
//           // markers: true //  디버깅용 (완성 후 제거 가능)
//         },
//       })
//       .to(".masthead", { opacity: 0 });

//     gsap.set("#about", { clearProps: "all" }); //  불필요한 애니메이션 효과 제거
//   }

//   homeAnimation1();
// });


// 스크롤에 따라 텍스트 나오기
// function adjustBlendedTextOpacity2() {
//   const textElements = [
//     { selector: ".main-image2", fadeStart: 500, fadeEnd: 1500 },
//     { selector: ".main-text1", fadeStart: 1300, fadeEnd: 1800 },
//     { selector: ".main-text2", fadeStart: 1000, fadeEnd: 2500 },
//     { selector: ".main-text3", fadeStart: 3700, fadeEnd: 4200 },
//   ];
//   const imageElement = document.querySelector(".main-image1"); // `.main-text1`과 함께 동기화
//   const imageElement2 = document.querySelector(".main-image2"); // `.main-text1`과 함께 동기화

//   const scrollY = window.scrollY;

//   textElements.forEach(({ selector, fadeStart, fadeEnd }) => {
//     const element = document.querySelector(selector);
//     if (!element) return; // 요소가 없으면 건너뛰기

//     const fadeRange = fadeEnd - fadeStart;
//     let opacity = Math.min(Math.max((scrollY - fadeStart) / fadeRange, 0), 1);

//     // 스크롤 범위에 맞춰 opacity 적용
//     element.style.opacity = opacity;
//     // `main-text1`이 보일 때만 이미지도 함께 보이도록 설정
//     if (selector === ".main-text1" && imageElement) {
//       imageElement.style.opacity = opacity;
//       imageElement.style.transform = `translateX(${-40 + opacity * 20}px)`; // 왼쪽에서 중앙으로 이동
//     }
//   });
// }
// 스크롤 이벤트 연결 그림 변환 시 사용
// window.addEventListener("scroll", adjustBlendedTextOpacity2);

// function adjustBlendedTextOpacity3() {
//   const blendedTextElements = document.querySelectorAll(".main-text5");
//   const fadeStart = 500; // 스크롤 시작 지점 (점점 나타남)
//   const fadeEnd = 600; // 스크롤 끝 지점 (점점 사라짐)
//   const fadeRange = fadeEnd - fadeStart;

//   blendedTextElements.forEach((element) => {
//     const scrollY = window.scrollY;
//     let opacity;

//     if (scrollY < fadeStart) {
//       // fadeStart 이전: 점점 나타나는 효과 (페이드 인)
//       opacity = Math.min(scrollY / fadeStart, 1);
//     } else if (scrollY >= fadeStart && scrollY <= fadeEnd) {
//       // fadeStart ~ fadeEnd: 완전히 보임
//       opacity = 1;
//     } else {
//       // fadeEnd 이후: 점점 사라지는 효과 (페이드 아웃)
//       opacity = Math.max(1 - (scrollY - fadeEnd) / fadeRange, 0);
//     }

//     // opacity 값 적용
//     element.style.opacity = opacity.toString();
//   });
// }

// // 스크롤 이벤트 리스너 추가
// window.addEventListener("scroll", adjustBlendedTextOpacity3);



// main text 해암 스타일

// document.addEventListener("DOMContentLoaded", () => {
//   gsap.registerPlugin(ScrollTrigger);

//   gsap.to(".main-image2", {
//     backgroundSize: "110%", // 배경을 110% 크기로 확대
//     ease: "none",
//     scrollTrigger: {
//       trigger: ".main-image2",
//       start: "top top",
//       end: "bottom+=1800 top",
//       scrub: 1,
//     },
//   });
// });

// document.addEventListener("scroll", function () {
//   if (window.scrollY > 3000) {
//     document.body.classList.add("scrolled");
//   } else {
//     document.body.classList.remove("scrolled");
//   }
// });

// /// 애니매이션 4번쨰
// document.addEventListener("DOMContentLoaded", () => {
//   gsap.registerPlugin(ScrollTrigger);

//   function homeAnimation1() {
//     // `.masthead`가 500px 동안 고정 후 서서히 사라짐
//     gsap
//       .timeline({
//         scrollTrigger: {
//           trigger: ".masthead",
//           scroller: window,
//           scrub: true,
//           pin: true, //  500px 동안 `.masthead` 고정
//           pinSpacing: true, //  `#about`이 자연스럽게 올라오도록 설정 (false 제거)
//           start: "top top",
//           end: "+=1000", //   스크롤 후 효과 종료
//           anticipatePin: 1,
//           // markers: true //  디버깅용 (완성 후 제거 가능)
//         },
//       })
//       .to(".masthead", { opacity: 0 });

//     //  `#about` 애니메이션 제거 (masthead의 영향을 받지 않도록 설정)
//     gsap.set("#about", { clearProps: "all" }); //  불필요한 애니메이션 효과 제거
//   }
//   // function homeAnimation2() {
//   //   // 섹션이 스크롤 시 점점 사라짐
//   //   gsap.timeline({
//   //     scrollTrigger: {
//   //       trigger: ".home",
//   //       scroller: window,
//   //       scrub: true,
//   //       pin: true,
//   //       pinSpacing: false,
//   //       // endTrigger: ".footer", // 푸터만날때까지
//   //       // end: "top top",
//   //       end: "+=2000",       // 1000px 스크롤 후 종료
//   //       anticipatePin: 1,
//   //       // markers: true // 디버깅용 (완성 후 제거 가능)
//   //     }
//   //   }).to(".home", { opacity: 0 });
//   // }

//   homeAnimation1();
//   // homeAnimation2();
// });


// PDF
document.getElementById("openPdfBtn").addEventListener("click", function (e) {
  e.preventDefault();
  // 새 창 열기(주소창 없이)
  window.open(
    "y60.html",
    "_blank",
    "width=1000,height=800,menubar=no,toolbar=no,location=no,status=no,fullscreen=yes"
  );
});

document.getElementById("openPdfBtn2").addEventListener("click", function (e) {
  e.preventDefault();
  // 새 창 열기(주소창 없이)
  window.open(
    "y45.html",
    "_blank",
    "width=1000,height=800,menubar=no,toolbar=no,location=no,status=no,fullscreen=yes"
  );
});

// achive 관련 이벤트
// document.addEventListener("DOMContentLoaded", () => {
//   // .achv 이미지에 hover 이벤트 추가
//   document.querySelectorAll(".achv").forEach((img) => {
//     img.addEventListener("mouseenter", function () {
//       this.style.transform = "scaleX(-1)"; // 첫 번째 좌우 반전
//       setTimeout(() => {
//         this.style.transform = "scaleX(1)"; // 두 번째 반전 (원래 이미지로 복귀)
//       }, 400); // 초 후 다시 원래대로
//     });
//     img.addEventListener("mouseleave", function () {
//       console.log("마우스 벗어남: 회전 종료"); // 디버깅용
//       this.classList.remove("rotate");
//     });
//   });
// });

// 약력 숨기기/드러내기 이벤트
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButton"); // 버튼 가져오기
  const toggleIcon = document.getElementById("toggleIcon");
  const aboutContent = document.getElementById("aboutContent");
  const toggleButton2 = document.getElementById("toggleButton-close"); // 버튼 가져오기

  toggleButton.addEventListener("click", function () {
    if (aboutContent.classList.contains("show")) {
      aboutContent.style.maxHeight = "0px"; // 숨기기
      aboutContent.style.opacity = "0"; // 투명하게
      setTimeout(() => {
        aboutContent.classList.remove("show");
      }, 500); // 애니메이션 시간과 동일하게 설정 (0.5s)
      // toggleIcon.src = "assets/03_achv/qmenu8.png"; // "더 보기" 아이콘으로 변경
    } else {
      aboutContent.classList.add("show");
      aboutContent.style.display = "block"; // 표시되도록 변경
      setTimeout(() => {
        aboutContent.style.maxHeight = "800px"; // 충분한 높이 설정
        aboutContent.style.opacity = "1"; // 완전히 보이도록 설정
      }, 10); // display 속성이 적용된 후 max-height 변경 (애니메이션 적용)
      // toggleIcon.src = "assets/03_achv/qmenu8.png"; // "접기" 아이콘으로 변경
    }
  });

  // 닫기 버튼 클릭
  toggleButton2.addEventListener("click", () => {
    if (aboutContent.classList.contains("show")) {
      aboutContent.style.maxHeight = "0px";
      aboutContent.style.opacity = "0";
      setTimeout(() => {
        aboutContent.classList.remove("show");
        aboutContent.style.display = "none"; // ✅ 완전 숨김
      }, 500);
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
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  let currentIndex = 0;
  let intervalId;

  // 초기 로딩 시 모달을 숨김
  modal.style.display = "none";

  if (!mainImage || !modal || !modalImage || !prevButton || !nextButton) {
    console.error("필요한 요소를 찾을 수 없습니다!");
    return;
  }

  const mainImageContainer = document.querySelector(".main-image-container");
  let isSliding = false;

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

    currentIndex = index;
  }

  // 자동 슬라이드 기능
  function startAutoSlide() {
    intervalId = setInterval(() => {
      let nextIndex = (currentIndex + 1) % images.length;
      setMainImage(nextIndex);
    }, 5000); // 2초마다 변경
  }

  // 팝업 열기 함수
  function openModal() {
    clearInterval(intervalId); // 슬라이드 멈추기
    modal.style.display = "flex";
    modalImage.src = mainImage.src;
  }

  // 팝업 닫기 함수
  function closeModal() {
    modal.style.display = "none";
    startAutoSlide(); // 다시 슬라이드 시작
  }

  // 팝업 내부 이미지 변경 (좌우 버튼)
  function changeModalImage(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    modalImage.src = images[currentIndex];
  }

  // 키보드 이벤트 추가 (←, → 방향키로 이동)
  function handleKeyPress(event) {
    if (modal.style.display === "flex") {
      if (event.key === "ArrowLeft") {
        changeModalImage(-1);
      } else if (event.key === "ArrowRight") {
        changeModalImage(1);
      } else if (event.key === "Escape") {
        closeModal();
      }
    }
  }

  // 초기 메인 이미지 설정
  setMainImage(0);
  startAutoSlide(); // 자동 슬라이드 시작

  // 메인 이미지 클릭 시 팝업 열기
  mainImage.addEventListener("click", openModal);

  // 팝업 클릭 시 닫기
  modal.addEventListener("click", closeModal);

  // 썸네일 클릭 이벤트 추가
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      setMainImage(index);
      clearInterval(intervalId); // 슬라이드 멈추고
      startAutoSlide(); // 다시 시작
    });
  });

  // 좌우 버튼 클릭 이벤트 추가
  prevButton.addEventListener("click", (event) => {
    event.stopPropagation(); // 팝업 닫히는 것 방지
    changeModalImage(-1);
  });

  nextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    changeModalImage(1);
  });

  // 키보드 이벤트 리스너 추가
  document.addEventListener("keydown", handleKeyPress);
});

// // 게시판 스타일
// document.addEventListener("DOMContentLoaded", () => {
//   const boardSection = document.getElementById("boardSection");
//   const boardTitle = document.getElementById("boardTitle");
//   const boardList = document.getElementById("boardList");
//   const pagination = document.getElementById("pagination");
//   const postContent = document.getElementById("postContent");
//   const postBody = document.getElementById("postBody");
//   const closePost = document.getElementById("closePost");
//   const closeBoard = document.getElementById("closeBoard");

//   if (
//     !boardSection ||
//     !boardTitle ||
//     !boardList ||
//     !pagination ||
//     !postContent ||
//     !postBody ||
//     !closePost
//   ) {
//     console.error(
//       "❌ 필수 HTML 요소가 없습니다! (게시판이 정상적으로 동작하지 않을 수 있음)"
//     );
//     return;
//   }

//   let posts = [];
//   let currentPage = 1;
//   const postsPerPage = 20;

//   const categories = {
//     1: "신앙 일화",
//     2: "목회 철학",
//     3: "불기둥 설교집",
//     4: "The Pillar of Fire",
//     5: "불기둥 칼럼",
//     6: "특별 자료실",
//     7: "환송 예배",
//     8: "추모게시판",
//   };

//   // 테이블에서 클릭 시 게시판 표시
//   document.querySelectorAll(".clickable-td").forEach((element) => {
//     element.addEventListener("click", async (event) => {
//       event.preventDefault();
//       const categoryId = event.currentTarget.getAttribute("data-category");
//       if (!categoryId) return;

//       console.log(`📌 카테고리 ID: ${categoryId} 게시판 로드`);
//       await loadBoard(categoryId);

//       // 게시판 보이게 하기
//       boardSection.classList.add("show");

//       // 부드러운 스크롤 이동
//       boardSection.scrollIntoView({ behavior: "smooth", block: "start" });
//     });
//   });

//   // 게시판 로드
//   async function loadBoard(categoryId) {
//     try {
//       console.log(`📂 assets/03_achv/${categoryId}/index.txt 불러오는 중...`);
//       const response = await fetch(`assets/03_achv/${categoryId}/index.txt`);
//       if (!response.ok) throw new Error("파일을 찾을 수 없음");

//       const text = await response.text();
//       posts = text
//         .split("\n")
//         .filter((line) => line.trim())
//         .map((line) => {
//           const [num, title] = line.split(". ");
//           return { num: num.trim(), title: title.trim() };
//         });

//       boardTitle.textContent = `< ${categories[categoryId]} >`;
//       currentPage = 1;
//       displayBoardList(categoryId);
//     } catch (error) {
//       console.error("❌ 게시판 로드 실패:", error);
//       boardList.innerHTML = "<p>게시판을 불러오는 데 실패했습니다.</p>";
//     }
//   }

//   // 게시판 목록 표시 (페이지네이션 포함)
//   function displayBoardList(categoryId) {
//     boardList.innerHTML = "";
//     const start = (currentPage - 1) * postsPerPage;
//     const end = start + postsPerPage;
//     const paginatedPosts = posts.slice(start, end);

//     paginatedPosts.forEach(({ num, title }) => {
//       const postItem = document.createElement("div");
//       postItem.classList.add("board-item");
//       postItem.textContent = title;
//       postItem.dataset.postNum = num;
//       postItem.dataset.categoryId = categoryId;
//       postItem.addEventListener("click", () => loadPost(num, categoryId));
//       boardList.appendChild(postItem);
//     });

//     displayPagination(categoryId);
//   }

//   // 페이지네이션 표시
//   function displayPagination(categoryId) {
//     pagination.innerHTML = "";
//     const pageCount = Math.ceil(posts.length / postsPerPage);
//     for (let i = 1; i <= pageCount; i++) {
//       const button = document.createElement("button");
//       button.textContent = i;
//       button.classList.add("page-button");
//       if (i === currentPage) button.classList.add("active");
//       button.addEventListener("click", () => {
//         currentPage = i;
//         displayBoardList(categoryId);
//       });
//       pagination.appendChild(button);
//     }
//   }

//   // 게시글 불러오기 (TXT, PDF 지원)
//   async function loadPost(postNum, categoryId) {
//     postBody.innerHTML = `<p>게시글 ${postNum} 로딩 중...</p>`;
//     postContent.style.display = "block";

//     const txtFile = `assets/03_achv/${categoryId}/${postNum}.txt`;
//     const pdfFile = `assets/03_achv/${categoryId}/${postNum}.pdf`;

//     try {
//       const response = await fetch(txtFile);
//       if (!response.ok) {
//         postBody.innerHTML = `<embed src="${pdfFile}" width="100%" height="600px" type="application/pdf" />`;
//       } else {
//         const text = await response.text();
//         postBody.innerHTML = `<pre>${text}</pre>`;
//       }
//     } catch (error) {
//       postBody.innerHTML = "<p>게시글을 불러오는 데 실패했습니다.</p>";
//     }
//   }

//   // 닫기 버튼 클릭 시, 게시판 숨기기
//   closeBoard.addEventListener("click", () => {
//     document.getElementById("boardSection").classList.remove("show");

//     // #achv 영역으로 부드럽게 스크롤 이동
//     document.getElementById("achv").scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   });
// });

// 자료실 achv04

fetch("assets/04_achv2/filetree_web.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("dynamic-tree");
    container.appendChild(renderFolders(data));
  });

function renderFolders(nodes) {
  const fragment = document.createDocumentFragment();

  nodes.forEach((node, i) => {
    const folderId = `folder_${node.name}_${i}`.replace(/\s+/g, "_");

    if (node.type === "folder") {
      const folderDiv = document.createElement("div");
      folderDiv.className = "folder";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = folderId;

      const label = document.createElement("label");
      label.className = "label";
      label.setAttribute("for", folderId);
      label.innerHTML = `
        <img src="assets/03_achv/fc.png" class="icon-folder" data-type="folder-icon" />
        <div class="text">${node.name}</div>
      `;

      // 🔄 아이콘 전환: 닫힘 ↔ 열림
      input.addEventListener("change", () => {
        const icon = label.querySelector("img[data-type='folder-icon']");
        icon.src = input.checked
          ? "assets/03_achv/fo.png"
          : "assets/03_achv/fc.png";
      });

      folderDiv.appendChild(input);
      folderDiv.appendChild(label);

      if (node.children) {
        const children = renderFolders(node.children);
        folderDiv.appendChild(children);
      }

      fragment.appendChild(folderDiv);
    } else if (node.type === "file") {
      const fileDiv = document.createElement("div");
      fileDiv.className = "file";
      fileDiv.innerHTML = `
        <img src="assets/03_achv/file.png" class="icon-file" />
        <div class="text">${node.name}</div>
      `;

      fileDiv.addEventListener("click", () => {
        const openCheckbox = document.getElementById("open");
        if (openCheckbox) openCheckbox.checked = true;

        const contentEl = document.querySelector(".arch-content");

        if (node.name.toLowerCase().endsWith(".txt")) {
          fetch(node.path)
            .then((res) => {
              if (!res.ok) throw new Error("파일 로드 실패");
              return res.text();
            })
            .then((txt) => {
              contentEl.innerHTML = `
                <h3 style="margin-left: 30%;">📄 ${node.name}</h3>
                <pre style="white-space: pre-wrap; word-break: break-word; padding-left: 20%;">${txt}
                <button onclick="location.href='#arch-container'" style="
                display: block;
                margin: 0 auto 20px auto;
                background-color: #a24d67;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 0.9rem;
              "> 처음(목록)으로 돌아가기</button>
                </pre>
              `;
            })
            .catch((err) => {
              contentEl.innerHTML = `<p>❌ 파일을 불러올 수 없습니다: ${err.message}</p>`;
            });
        }
        // 음성파일 mp3
        else if (node.name.toLowerCase().endsWith(".mp3")) {
          contentEl.innerHTML = `
            <h3 style="margin-left: 30%;">🎵 ${node.name}</h3>
            <div style="padding-left: 35%; margin-bottom: 20px;">
            <br><br><br>  
            <audio controls style="width: 400px;">
                <source src="${node.path}" type="audio/mpeg">
                브라우저에서 오디오를 지원하지 않습니다.
              </audio>
            </div>
          `;
        }
        // 비디오 mp4 
        else if (node.name.toLowerCase().endsWith(".mp4")) {
          const baseName = node.name.replace(/\.mp4$/i, "");
          const txtPath = node.path.replace(/\.mp4$/i, ".txt");
        
          fetch(txtPath)
            .then(res => {
              if (!res.ok) throw new Error("관련 텍스트 없음");
              return res.text();
            })
            .then(txt => {
              contentEl.innerHTML = `
                <h3 style="margin-left: 30%;">🎬 ${node.name}</h3>
                <div style="padding-left: 35%; margin-bottom: 20px;">
                  <br><br><br>
                  <video controls style="width: 450px;">
                    <source src="${node.path}" type="video/mp4">
                    브라우저에서 비디오를 지원하지 않습니다.
                  </video>
                </div>
                <div style="padding-left: 20%; margin-top: 30px;">
                  <h5 style="padding-left: 20%; margin-top: 30px;">📄 영상 스크립트</h5>
                  <pre style="white-space: pre-wrap; word-break: break-word;">${txt}</pre>
                </div>
              `;
            })
            .catch(() => {
              // 텍스트 없을 때는 영상만 출력
              contentEl.innerHTML = `
                <h3 style="margin-left: 30%;">🎬 ${node.name}</h3>
                <div style="padding-left: 35%; margin-bottom: 20px;">
                  <br><br><br>
                  <video controls style="width: 400px;">
                    <source src="${node.path}" type="video/mp4">
                    브라우저에서 비디오를 지원하지 않습니다.
                  </video>
                </div>
              `;
            });
        } 
        // 이미지 파일 jpg jpeg png
        else if (
          node.name.toLowerCase().endsWith(".jpg") ||
          node.name.toLowerCase().endsWith(".jpeg") ||
          node.name.toLowerCase().endsWith(".png")
        ) {
          contentEl.innerHTML = `
            <h3 style="margin-left: 30%;">🖼️ ${node.name}</h3>
            <div style="margin-left: 20%; text-align: center; margin-top: 30px; margin-bottom: 30px;">
              <p>이미지를 클릭(누르기)하면 원본으로 보실 수 있습니다.</p>
              <a href="${node.path}" target="_blank">
                <img src="${node.path}" alt="${node.name}" 
                    style="max-width: 70%; height: auto; border: 1px solid #ccc; border-radius: 10px; cursor: zoom-in;" />
              </a>
            </div>
          `;
        }
        
        else {
          contentEl.innerHTML = `
            <h3 style="margin-left: 30%;">📄 ${node.name}</h3>
            <br><p style="margin-left: 20%;">경로: <code>${node.path}</code></p>
            <p style="margin-left: 20%;">이 파일은미리보기가 제공되지 않습니다.</p>
            <p style="margin-left: 20%;">자료 확인 또는 다운로드는 운영자(전산실)에게 문의 바랍니다.</p>

          `;
        }
      });

      fragment.appendChild(fileDiv);
    }
  });

  return fragment;
}

// 컨테이너 초기화 버튼
document.getElementById("archCleanBtn").addEventListener("click", () => {
  const contentEl = document.querySelector(".arch-content");
  contentEl.innerHTML = ""; // 내용 초기화
  const openCheckbox = document.getElementById("open");
  if (openCheckbox) openCheckbox.checked = false;
});

// 파일 불러오기

// 방명록
// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("guestbook-form");
//   const list = document.getElementById("guestbook-list");
//   const pagination = document.getElementById("g-pagination");

//   // ✅ 쿠키 설정 함수
//   function setCookie(name, value, days) {
//     const expires = new Date();
//     expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
//     document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
//   }

//   // ✅ 쿠키 가져오기 함수
//   function getCookie(name) {
//     const cookies = document.cookie.split("; ");
//     for (let cookie of cookies) {
//       let [key, value] = cookie.split("=");
//       if (key === name) return value;
//     }
//     return null;
//   }

//   // ✅ 사용자 고유 ID 설정 (없으면 생성)
//   if (!getCookie("guestUserID")) {
//     setCookie("guestUserID", Math.random().toString(36).substring(2, 15), 30);
//   }
//   const userID = getCookie("guestUserID");

//   // ✅ 방명록 데이터 (쿠키에서 관리)
//   let comments = JSON.parse(getCookie("guestbook") || "[]");
//   let currentPage = 1;
//   const commentsPerPage = 10; // 한 페이지당 5행 2열 (총 10개)

//   // ✅ 방명록 등록
//   form.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const name = document.getElementById("name").value.trim();
//     const password = document.getElementById("password").value.trim();
//     const content = document.getElementById("content").value.trim();

//     if (!name || !password || !content) {
//       alert("모든 필드를 입력하세요!");
//       return;
//     }

//     const newComment = {
//       id: Date.now(),
//       userID,
//       name,
//       password,
//       content,
//       timestamp: new Date().toLocaleString(),
//     };

//     comments.unshift(newComment);
//     setCookie("guestbook", JSON.stringify(comments), 30); // 쿠키에 저장
//     form.reset();
//     displayComments();
//   });

//   // ✅ 방명록 출력 (페이지네이션 적용)
//   function displayComments() {
//     list.innerHTML = "";
//     pagination.innerHTML = "";

//     const start = (currentPage - 1) * commentsPerPage;
//     const end = start + commentsPerPage;
//     const paginatedComments = comments.slice(start, end);

//     paginatedComments.forEach((comment) => {
//       const entry = document.createElement("div");
//       entry.className = "guest-entry";
//       entry.innerHTML = `
//       <p><strong>😊 ${comment.name}</strong> | ${comment.timestamp}
//       | <small> IP: ${comment.ip}</small>
//       | <button class="delete-btn" data-id="${comment.id}">🗑 삭제</button>
//       </small>
//       </p>
//       <p>${comment.content}</p>

//       `;
//       list.appendChild(entry);
//     });

//     setupDeleteButtons();
//     displayPagination();
//   }

//   // ✅ 삭제 버튼 이벤트 추가
//   function setupDeleteButtons() {
//     document.querySelectorAll(".delete-btn").forEach((button) => {
//       button.addEventListener("click", function () {
//         const id = this.getAttribute("data-id");
//         const index = comments.findIndex((comment) => comment.id == id);

//         if (index !== -1) {
//           const inputPassword = prompt("비밀번호를 입력하세요:");
//           if (inputPassword === comments[index].password) {
//             comments.splice(index, 1);
//             setCookie("guestbook", JSON.stringify(comments), 30);
//             displayComments();
//           } else {
//             alert("비밀번호가 일치하지 않습니다.");
//           }
//         }
//       });
//     });
//   }

//   // ✅ 페이지네이션 설정
//   function displayPagination() {
//     const totalPages = Math.ceil(comments.length / commentsPerPage);
//     if (totalPages <= 1) return; // 페이지가 하나라면 페이지네이션 숨김

//     for (let i = 1; i <= totalPages; i++) {
//       const pageBtn = document.createElement("button");
//       pageBtn.className = `page-btn ${i === currentPage ? "active" : ""}`;
//       pageBtn.innerText = i;
//       pageBtn.addEventListener("click", () => {
//         currentPage = i;
//         displayComments();
//       });
//       pagination.appendChild(pageBtn);
//     }
//   }

//   displayComments();
// });

// <p><strong>😊 ${comment.name}</strong> | ${comment.timestamp}
// | <small> IP: ${comment.ip}</small>
// | <button class="delete-btn" data-id="${comment.id}">🗑 삭제</button>
// </small>
// </p>
// <p>${comment.content}</p>

// 헌화
// https://script.google.com/macros/s/AKfycby07SAJgFfuA8Mz1yCaHAyUy2_KlehIfEvnXYoUOuBGUqQcPAdSInNh0m1pLcki06IGAQ/exec

const scriptUrl =
  "https://script.google.com/macros/s/AKfycby07SAJgFfuA8Mz1yCaHAyUy2_KlehIfEvnXYoUOuBGUqQcPAdSInNh0m1pLcki06IGAQ/exec";
const typeMap = {
  love: 1,
  respect: 2,
  miss: 3,
  thanks: 4,
};

let flowerDataLoaded = false;

// ⏱ flower 섹션 보일 때 로딩
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !flowerDataLoaded) {
        flowerDataLoaded = true;
        console.log("🌸 flower 섹션 감지 → 데이터 로딩");
        loadFlowerData();
      }
    });
  },
  { threshold: 0.3 }
);
observer.observe(document.getElementById("flower"));

async function loadFlowerData() {
  try {
    const res = await fetch(scriptUrl);
    const { flowers, counts } = await res.json();

    // 추천 수 표시
    for (let key in typeMap) {
      const num = typeMap[key];
      const el = document.getElementById(`count-${key}`);
      if (el) el.textContent = counts[num] ?? 0;
    }

    // 꽃 렌더링
    flowers.forEach((f) => createFlower(f.type, f.x, f.y, f.rotation));
  } catch (err) {
    console.error("❌ 데이터 로딩 실패", err);
  }
}

// 모든 버튼을 3초간 비활성화하는 함수
function temporarilyDisableButtons(duration = 3000) {
  const buttons = document.querySelectorAll("#flower-buttons button");
  buttons.forEach((btn) => (btn.disabled = true));

  setTimeout(() => {
    buttons.forEach((btn) => (btn.disabled = false));
  }, duration);
}

document.querySelectorAll("#flower-buttons button").forEach((button) => {
  const key = button.dataset.type;
  const type = typeMap[key];

  button.addEventListener("click", async () => {
    const x = Math.random() * 90;
    const y = Math.random() * 90;
    const rotation = Math.random() * 360;
    temporarilyDisableButtons(5000);

    // 🌸 시각적 피드백
    createFlower(type, x, y, rotation);
    // 🌸 로딩 메시지 표시
    // document.getElementById("flower-loader").style.display = "block";
    showLoadingMessage(); // ← 로딩 메시지 동작

    // 🌐 서버 전송 (no-cors)
    try {
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors", // ✅ 핵심!
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, x, y, rotation }),
      });

      //  카운트 증가 (로컬 UI 반영만)
      const el = document.getElementById(`count-${key}`);
      if (el) el.textContent = parseInt(el.textContent) + 1;

      //  안내 메시지 (옵션)
      console.log("🌼 요청 보냄 (no-cors) — 응답은 확인할 수 없음");
    } catch (err) {
      alert("❌ 저장 실패: " + err.message);
    }
    // 3초 후 로딩 숨기기
    setTimeout(() => {
      document.getElementById("flower-loader").style.display = "none";
    }, 1000);
  });
});

function createFlower(type, x, y, rotation) {
  const flower = document.createElement("img");
  flower.src = `assets/flower/${type}.png`;
  flower.className = "flower";
  flower.style.position = "absolute";
  flower.style.left = `${x}%`;
  flower.style.top = `${y}%`;
  flower.style.transform = `rotate(${rotation}deg)`;
  flower.style.width = "40px";
  document.getElementById("flower-field").appendChild(flower);
}

// 꽃배달
let loadingInterval = null;

function startLoadingDots() {
  const dotEl = document.getElementById("loading-dots");
  let dotCount = 1;

  loadingInterval = setInterval(() => {
    dotCount = (dotCount % 3) + 1;
    dotEl.textContent = ".".repeat(dotCount);
  }, 500);
}

function stopLoadingDots() {
  clearInterval(loadingInterval);
  document.getElementById("loading-dots").textContent = ".";
}

function showLoadingMessage() {
  const loader = document.getElementById("flower-loader");
  const message = document.getElementById("loader-message");

  loader.style.display = "block";
  message.innerHTML = '🌸 천국에 꽃 배달 중<span id="loading-dots">.</span>';
  startLoadingDots();

  // 2.5초 후 점 멈추고 메시지 전환
  setTimeout(() => {
    stopLoadingDots();
    message.textContent = " ✅ 배달 완료! 💌 ";
  }, 2500);

  // 3초 후 전체 로딩 숨김
  setTimeout(() => {
    loader.style.display = "none";
  }, 3500);
}

// BG 이미지 이벤트
// document.addEventListener("DOMContentLoaded", function () {
//   gsap.registerPlugin(ScrollTrigger);

//   document.querySelectorAll(".parallax-section").forEach((section) => {
//     gsap.to(section, {
//       y: "-10%", // 배경이 천천히 위로 이동
//       ease: "none",
//       scrollTrigger: {
//         trigger: section,
//         start: "top bottom",
//         end: "bottom top",
//         scrub: 1, // 부드러운 스크롤 효과
//       },
//     });
//   });
// });

// labs
document.getElementById("openLabsLink").addEventListener("click", function (e) {
  e.preventDefault()
  window.open(
    "assets/labs/labs.html",
    "_blank",
    "width=1000,height=800,menubar=no,toolbar=no,location=no,status=no,fullscreen=yes"
  )
})
