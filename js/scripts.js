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

document.addEventListener("DOMContentLoaded", () => {
  const mainNav = document.getElementById("mainNav");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      //  스크롤 이후 나타남
      mainNav.classList.add("show");
    } else {
      mainNav.classList.remove("show");
    }
  });
});

// 스크롤에 따라 텍스트 숨기기
function adjustBlendedTextOpacity1() {
  const blendedTextElements = document.querySelectorAll(".main-text4");
  const fadeStart = 0; // 스크롤 시작 지점
  const fadeEnd = 200; // 스크롤 끝 지점 (글씨가 완전히 사라지는 지점)
  const fadeRange = fadeEnd - fadeStart;

  blendedTextElements.forEach((element) => {
    const scrollY = window.scrollY;

    // opacity를 계산 (0에서 1 사이 값)
    let opacity =
      1 - Math.min(Math.max((scrollY - fadeStart) / fadeRange, 0), 1);

    // opacity를 설정하여 서서히 사라지게 함
    element.style.opacity = opacity;
  });
}

window.addEventListener("scroll", adjustBlendedTextOpacity1);

// 스크롤에 따라 텍스트 나오기
function adjustBlendedTextOpacity2() {
  const textElements = [
    { selector: ".main-image2", fadeStart: 500, fadeEnd: 1500 },
    { selector: ".main-text1", fadeStart: 1300, fadeEnd: 1800 },
    { selector: ".main-text2", fadeStart: 1000, fadeEnd: 2500 },
    { selector: ".main-text3", fadeStart: 3700, fadeEnd: 4200 },
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
window.addEventListener("scroll", adjustBlendedTextOpacity2);

function adjustBlendedTextOpacity3() {
  const blendedTextElements = document.querySelectorAll(".main-text5");
  const fadeStart = 500; // 스크롤 시작 지점 (점점 나타남)
  const fadeEnd = 600; // 스크롤 끝 지점 (점점 사라짐)
  const fadeRange = fadeEnd - fadeStart;

  blendedTextElements.forEach((element) => {
    const scrollY = window.scrollY;
    let opacity;

    if (scrollY < fadeStart) {
      // fadeStart 이전: 점점 나타나는 효과 (페이드 인)
      opacity = Math.min(scrollY / fadeStart, 1);
    } else if (scrollY >= fadeStart && scrollY <= fadeEnd) {
      // fadeStart ~ fadeEnd: 완전히 보임
      opacity = 1;
    } else {
      // fadeEnd 이후: 점점 사라지는 효과 (페이드 아웃)
      opacity = Math.max(1 - (scrollY - fadeEnd) / fadeRange, 0);
    }

    // opacity 값 적용
    element.style.opacity = opacity.toString();
  });
}

// 스크롤 이벤트 리스너 추가
window.addEventListener("scroll", adjustBlendedTextOpacity3);

// 비디오2 이벤트
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
    if (scrollY >= 300) {
      videoContainer.style.opacity = "0"; // 페이드아웃
      isPlaying = false;
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
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".masthead",
          scroller: window,
          scrub: true,
          pin: true, //  500px 동안 `.masthead` 고정
          pinSpacing: true, //  `#about`이 자연스럽게 올라오도록 설정 (false 제거)
          start: "top top",
          end: "+=1000", //   스크롤 후 효과 종료
          anticipatePin: 1,
          // markers: true //  디버깅용 (완성 후 제거 가능)
        },
      })
      .to(".masthead", { opacity: 0 });

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

// PDF
document.getElementById("openPdfBtn").addEventListener("click", function (e) {
  e.preventDefault();
  // 새 창 열기(주소창 없이)
  window.open(
    "pdf-viewer.html",
    "_blank",
    "width=1000,height=800,menubar=no,toolbar=no,location=no,status=no,fullscreen=yes"
  );
});

// achive 관련 이벤트
document.addEventListener("DOMContentLoaded", () => {
  // .achv 이미지에 hover 이벤트 추가
  document.querySelectorAll(".achv").forEach((img) => {
    img.addEventListener("mouseenter", function () {
      this.style.transform = "scaleX(-1)"; // 첫 번째 좌우 반전
      setTimeout(() => {
        this.style.transform = "scaleX(1)"; // 두 번째 반전 (원래 이미지로 복귀)
      }, 400); // 초 후 다시 원래대로
    });
    img.addEventListener("mouseleave", function () {
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
      toggleIcon.src = "assets/03_achv/qmenu8.png"; // "더 보기" 아이콘으로 변경
    } else {
      aboutContent.classList.add("show");
      aboutContent.style.display = "block"; // 표시되도록 변경
      setTimeout(() => {
        aboutContent.style.maxHeight = "300px"; // 충분한 높이 설정
        aboutContent.style.opacity = "1"; // 완전히 보이도록 설정
      }, 10); // display 속성이 적용된 후 max-height 변경 (애니메이션 적용)
      toggleIcon.src = "assets/03_achv/qmenu8.png"; // "접기" 아이콘으로 변경
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

// PDF 리더 pdf-viewer.html 이 파일안에 전체 작성

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

// 게시판 스타일
document.addEventListener("DOMContentLoaded", () => {
  const boardSection = document.getElementById("boardSection");
  const boardTitle = document.getElementById("boardTitle");
  const boardList = document.getElementById("boardList");
  const pagination = document.getElementById("pagination");
  const postContent = document.getElementById("postContent");
  const postBody = document.getElementById("postBody");
  const closePost = document.getElementById("closePost");
  const closeBoard = document.getElementById("closeBoard");

  if (
    !boardSection ||
    !boardTitle ||
    !boardList ||
    !pagination ||
    !postContent ||
    !postBody ||
    !closePost
  ) {
    console.error(
      "❌ 필수 HTML 요소가 없습니다! (게시판이 정상적으로 동작하지 않을 수 있음)"
    );
    return;
  }

  let posts = [];
  let currentPage = 1;
  const postsPerPage = 20;

  const categories = {
    1: "신앙 일화",
    2: "목회 철학",
    3: "불기둥 설교집",
    4: "The Pillar of Fire",
    5: "불기둥 칼럼",
    6: "특별 자료실",
    7: "환송 예배",
    8: "추모게시판",
  };

  // 테이블에서 클릭 시 게시판 표시
  document.querySelectorAll(".clickable-td").forEach((element) => {
    element.addEventListener("click", async (event) => {
      event.preventDefault();
      const categoryId = event.currentTarget.getAttribute("data-category");
      if (!categoryId) return;

      console.log(`📌 카테고리 ID: ${categoryId} 게시판 로드`);
      await loadBoard(categoryId);

      // 게시판 보이게 하기
      boardSection.classList.add("show");

      // 부드러운 스크롤 이동
      boardSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // 게시판 로드
  async function loadBoard(categoryId) {
    try {
      console.log(`📂 assets/03_achv/${categoryId}/index.txt 불러오는 중...`);
      const response = await fetch(`assets/03_achv/${categoryId}/index.txt`);
      if (!response.ok) throw new Error("파일을 찾을 수 없음");

      const text = await response.text();
      posts = text
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => {
          const [num, title] = line.split(". ");
          return { num: num.trim(), title: title.trim() };
        });

      boardTitle.textContent = `< ${categories[categoryId]} >`;
      currentPage = 1;
      displayBoardList(categoryId);
    } catch (error) {
      console.error("❌ 게시판 로드 실패:", error);
      boardList.innerHTML = "<p>게시판을 불러오는 데 실패했습니다.</p>";
    }
  }

  // 게시판 목록 표시 (페이지네이션 포함)
  function displayBoardList(categoryId) {
    boardList.innerHTML = "";
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const paginatedPosts = posts.slice(start, end);

    paginatedPosts.forEach(({ num, title }) => {
      const postItem = document.createElement("div");
      postItem.classList.add("board-item");
      postItem.textContent = title;
      postItem.dataset.postNum = num;
      postItem.dataset.categoryId = categoryId;
      postItem.addEventListener("click", () => loadPost(num, categoryId));
      boardList.appendChild(postItem);
    });

    displayPagination(categoryId);
  }

  // 페이지네이션 표시
  function displayPagination(categoryId) {
    pagination.innerHTML = "";
    const pageCount = Math.ceil(posts.length / postsPerPage);
    for (let i = 1; i <= pageCount; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.classList.add("page-button");
      if (i === currentPage) button.classList.add("active");
      button.addEventListener("click", () => {
        currentPage = i;
        displayBoardList(categoryId);
      });
      pagination.appendChild(button);
    }
  }

  // 게시글 불러오기 (TXT, PDF 지원)
  async function loadPost(postNum, categoryId) {
    postBody.innerHTML = `<p>게시글 ${postNum} 로딩 중...</p>`;
    postContent.style.display = "block";

    const txtFile = `assets/03_achv/${categoryId}/${postNum}.txt`;
    const pdfFile = `assets/03_achv/${categoryId}/${postNum}.pdf`;

    try {
      const response = await fetch(txtFile);
      if (!response.ok) {
        postBody.innerHTML = `<embed src="${pdfFile}" width="100%" height="600px" type="application/pdf" />`;
      } else {
        const text = await response.text();
        postBody.innerHTML = `<pre>${text}</pre>`;
      }
    } catch (error) {
      postBody.innerHTML = "<p>게시글을 불러오는 데 실패했습니다.</p>";
    }
  }

  // 닫기 버튼 클릭 시, 게시판 숨기기
  closeBoard.addEventListener("click", () => {
    document.getElementById("boardSection").classList.remove("show");

    // #achv 영역으로 부드럽게 스크롤 이동
    document.getElementById("achv").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// 방명록

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("guestbook-form");
  const list = document.getElementById("guestbook-list");
  const pagination = document.getElementById("g-pagination");
  let comments = JSON.parse(localStorage.getItem("guestbook")) || [];
  let currentPage = 1;
  const commentsPerPage = 10;

  // ✅ IP 주소 생성 (실제 서버에서는 API로 가져와야 함)
  function getFakeIP() {
    return `192.168.0.${Math.floor(Math.random() * 255)}`;
  }

  //  방명록 추가
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const password = document.getElementById("password").value.trim();
    const content = document.getElementById("content").value.trim();
    const isPrivate = document.getElementById("private").checked;
    const ip = getFakeIP();

    if (!name || !password || !content) {
      alert("모든 필드를 입력하세요!");
      return;
    }

    const newComment = {
      id: Date.now(),
      name,
      password,
      content: isPrivate ? "🔒 비밀글입니다." : content,
      ip,
      timestamp: new Date().toLocaleString(),
    };

    comments.unshift(newComment);
    localStorage.setItem("guestbook", JSON.stringify(comments));
    form.reset();
    displayComments();
  });

  //  방명록 출력 (페이지네이션 적용)
  function displayComments() {
    list.innerHTML = "";
    pagination.innerHTML = "";

    const start = (currentPage - 1) * commentsPerPage;
    const end = start + commentsPerPage;
    const paginatedComments = comments.slice(start, end);

    paginatedComments.forEach((comment) => {
      const entry = document.createElement("div");
      entry.className = "guest-entry";
      entry.innerHTML = `
        <p><strong>😊 ${comment.name}</strong> | ${comment.timestamp}
        | <small> IP: ${comment.ip}</small>
        | <button class="delete-btn" data-id="${comment.id}">🗑 삭제</button>
        </small>
        </p> 
        <p>${comment.content}</p>

        
      `;
      list.appendChild(entry);
    });

    setupDeleteButtons();
    displayPagination();
  }

  //  삭제 버튼 이벤트 추가
  function setupDeleteButtons() {
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        const password = prompt("비밀번호를 입력하세요:");
        const index = comments.findIndex((comment) => comment.id == id);

        if (index !== -1 && comments[index].password === password) {
          comments.splice(index, 1);
          localStorage.setItem("guestbook", JSON.stringify(comments));
          displayComments();
        } else {
          alert("비밀번호가 일치하지 않습니다.");
        }
      });
    });
  }

  //  페이지네이션 설정
  function displayPagination() {
    const totalPages = Math.ceil(comments.length / commentsPerPage);
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.className = `page-btn ${i === currentPage ? "active" : ""}`;
      pageBtn.innerText = i;
      pageBtn.addEventListener("click", () => {
        currentPage = i;
        displayComments();
      });
      pagination.appendChild(pageBtn);
    }
  }

  displayComments();
});
