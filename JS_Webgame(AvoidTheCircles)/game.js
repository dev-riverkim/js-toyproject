$(function () {
  // init

  //공의 개수
  let circleNumber = 0;
  // 공의 종류 - 크기(지름)/크기(반지름)/색/움직이는 속도
  const circleTypes = {
    option: ["color", "width", "border-radius", "speed"],
    small: ["black", 5, 2.5, 3000],
    medium: ["blue", 15, 7.5, 4000],
    large: ["yellow", 30, 15, 5000],
  };

  // 시간
  let time = 0;

  // 게임 실행 여부
  let gameOn = false;

  // 마우스 좌표
  let mouseX;
  let mouseY;

  // 마우스의 움직임을 좌표에 담아주는 함수
  $("body").mousemove(function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  // 타이머
  function timer() {
    if (gameOn == true) {
      setTimeout(function () {
        time = time + 0.01;
        $(".timer").html("<h1><div class='center'>" + time.toFixed(2) + "</div></h1>");
        timer();
      }, 10);
    }
  }

  // 시작함수
  $(".startbutton").click(function () {
    $(".startbutton").fadeToggle(500, function () {
      gameOn = true;
      timer();
      $(".space").mouseenter(function () {
        // 게임 종료
        endGame();
      });
      // 공생성
      createCircle();
    });
  });
});
