var crudApp = new (function () {
  //수강 데이터를 담을 JSON 형식의 배열 만들기
  this.myClass = [
    { ID: "1", Class_Name: "운영체제", Category: "전공필수", Credit: 3 },
    { ID: "2", Class_Name: "컴퓨터구조론", Category: "전공선택", Credit: 4 },
    { ID: "3", Class_Name: "심리학의 이해", Category: "교양필수", Credit: 2 },
  ];
  // 선택할 수 있는 항목 미리 정의
  this.Category = ["전공필수", "전공선택", "교양필수", "교양선택"];

  // Table Header에 담길 데이터를 확장성을 위해 배열에 담기
  this.col = [];
  // 위의 데이터를 통해 실제로 테이블을 만들어주는 메서드
  this.createTable = () => {
    // 테이블을 만들고 데이터를 채우는 코드
    // col에 table header에 해당하는 데이터(myClass의 key값들)들을 넣어주는 코드 작성
    // 비어있는 col 배열에 myClass 배열 속 객체들의 key값들을 넣어줘야 함

    // myClass 속 객체들 순회
    for (var i = 0; i < this.myClass.length; i++) {
      // 각 객체들속 key 값 순회
      for (var key in this.myClass[i]) {
        // key를 col 배열에 담기
        // indexOf:문자열 속의 문자열 검색, 없으면 -1 반환
        if (this.col.indexOf(key) === -1) this.col.push(key);
      }
    }
    var table = document.createElement("table");
    table.setAttribute("id", "classTable");

    // tr : 새로운 행 추가
    // -1을 주면 마지막행 추가
    var tr = table.insertRow(-1);

    // th
    for (var h = 0; h < this.col.length; h++) {
      var th = document.createElement("th");
      th.innerHTML = this.col[h];
      tr.appendChild(th);
    }

    // td
    for (var i = 0; i < this.myClass.length; i++) {
      // table에 한 행을 추가한다.
      tr = table.insertRow(-1);
      // table header 길이만큼 순회하면서 매칭되는 데이터 가져오기
      for (var j = 0; j < this.col.length; j++) {
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = this.myClass[i][this.col[j]];
      }

      // 버튼 만들기
      // update
      this.td = document.createElement("td");
      tr.appendChild(this.td);
      var btUpdate = document.createElement("input");
      btUpdate.setAttribute("type", "button");
      btUpdate.setAttribute("value", "Update");
      btUpdate.setAttribute("id", "Edit" + i);
      btUpdate.setAttribute("style", "background-color:#44CCEB");
      btUpdate.setAttribute("onclick", "crudApp.Update(this)"); // 이 버튼이 클릭될 때 실행할 메서드
      this.td.appendChild(btUpdate);

      // save
      tr.appendChild(this.td);
      var btSave = document.createElement("input");
      btSave.setAttribute("type", "button");
      btSave.setAttribute("value", "Save");
      btSave.setAttribute("id", "Save" + i);
      btSave.setAttribute("style", "display:none");
      btSave.setAttribute("onclick", "crudApp.Save(this)"); // 이 버튼이 클릭될 때 실행할 메서드
      this.td.appendChild(btSave);

      // delete
      this.td = document.createElement("td");
      tr.appendChild(this.td);
      var btDelete = document.createElement("input");
      btDelete.setAttribute("type", "button");
      btDelete.setAttribute("value", "Delete");
      btDelete.setAttribute("id", "Delete" + i);
      btDelete.setAttribute("style", "background-color:#ED5650");
      btDelete.setAttribute("onclick", "crudApp.Delete(this)"); // 이 버튼이 클릭될 때 실행할 메서드
      this.td.appendChild(btDelete);
    }

    // 입력 행 추가
    tr = table.insertRow(-1);
    for (var j = 0; j < this.col.length; j++) {
      var newCell = tr.insertCell(-1);
      if (j >= 1) {
        if (j == 2) {
          //카테고리 선택 항목 생성
          var select = document.createElement("select");
          select.innerHTML = `<option value=""></option>`;
          // this.category 의 값을 순회하며 option 안에 넣어주기
          for (k = 0; k < this.Category.length; k++) {
            select.innerHTML =
              select.innerHTML +
              `<option value="${this.Category[k]}">${this.Category[k]}</option>`;
          }
          newCell.appendChild(select);
        } else {
          var tBox = document.createElement("input");
          tBox.setAttribute("type", "text");
          tBox.setAttribute("value", "");
          newCell.appendChild(tBox);
        }
      }
    }

    // create 버튼
    this.td = document.createElement("td");
    tr.appendChild(this.td);
    var btCreate = document.createElement("input");
    btCreate.setAttribute("type", "button");
    btCreate.setAttribute("value", "Create");
    btCreate.setAttribute("id", "New" + i);
    btCreate.setAttribute("style", "background-color:#207DD1");
    btCreate.setAttribute("onclick", "crudApp.CreateNew(this)"); // 이 버튼이 클릭될 때 실행할 메서드
    this.td.appendChild(btCreate);

    var div = document.getElementById("container");
    div.innerHTML = "수강관리 APP";
    div.appendChild(table);
  };

  // 삭제 함수
  this.Delete = (oButton) => {
    var targetIdx = oButton.parentNode.parentNode.rowIndex;
    this.myClass.splice(targetIdx - 1, 1);
    this.createTable();
  };

  // 생성
  this.CreateNew = (oButton) => {
    var writtenIdx = oButton.parentNode.parentNode.rowIndex;
    var trData = document.getElementById("classTable").rows[writtenIdx];
    var obj = {};

    // tr 데이터에서 입력한 데이터들을 가져오기
    for (var i = 1; i < this.col.length; i++) {
      var td = trData.getElementsByTagName("td")[i];
      //console.log(td);

      if (
        td.childNodes[0].getAttribute("type") === "text" ||
        td.childNodes[0].tagName === "SELECT"
      ) {
        var txtVal = td.childNodes[0].value;
        //console.log(txtVal);
        if (txtVal != "") {
          obj[this.col[i]] = txtVal;
        } else {
          obj = "";
          alert("모든 항목을 입력해 주세요");
          break;
        }
      }
    }
    // 자동으로 새 ID 값이 부여되어 obj의 0번째 인덱스에 담긴다.
    obj[this.col[0]] = this.myClass.length + 1;
    this.myClass.push(obj);
    this.createTable();
  };

  this.Update = (oButton) => {
    var writtenIdx = oButton.parentNode.parentNode.rowIndex;
    var trData = document.getElementById("classTable").rows[writtenIdx];

    // 기존에 입력한 데이터들을 가져오기
    for (var i = 1; i < this.col.length; i++) {
      // 기존에 입력한 데이터들을 담은 새로운 input/select를 띄워주기
      if (i === 2) {
        // 셀렉트인경우
        var td = trData.getElementsByTagName("td")[i];
        var select = document.createElement("select");
        select.innerHTML = `<option value="${td.innerText}">${td.innerText}</option>`;
        for (var k = 0; k < this.Category.length; k++) {
          select.innerHTML =
            select.innerHTML +
            `<option value="${this.Category[k]}">${this.Category[k]}</option>`;
        }
        td.innerText = "";
        td.appendChild(select);
      } else {
        var td = trData.getElementsByTagName("td")[i];
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("value", td.innerText);
        td.innerText = "";
        td.appendChild(input);
      }
    }
  };
})();

/*
var div = document.getElementById("container");
div.innerHTML = "수강관리 APP";
div.appendChild(table);
*/

crudApp.createTable();
