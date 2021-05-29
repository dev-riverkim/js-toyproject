const toysrusApp = new (function () {
  // 토이저러스(toysrus) 재고를 담을 Json 형식의 배열
  this.toysrusItem = [
    {
      ID: "1",
      Brand: "옥스포드",
      Model: "짱구는못말려 떡잎유치원",
      Price: "43,700",
      Quantity: "10",
      Tel: "02-000-000",
      Email: "toysrus@mail.com",
      Edit: "",
      Delete: "",
    },
    {
      ID: "2",
      Brand: "터닝메카드",
      Model: "터닝메카드 점보 네오 (2021)",
      Price: "32,000",
      Quantity: "5",
      Tel: "02-000-000",
      Email: "toysrus@mail.com",
      Edit: "",
      Delete: "",
    },
    {
      ID: "3",
      Brand: "시크릿쥬쥬",
      Model: "영실업 시크릿셀카폰",
      Price: "59,000",
      Quantity: "3",
      Tel: "02-000-000",
      Email: "toysrus@mail.com",
      Edit: "",
      Delete: "",
    },
    {
      ID: "4",
      Brand: "닌텐도",
      Model: "스위치 모여봐요 동물의 숲 에디션",
      Price: "360,000",
      Quantity: "50",
      Tel: "02-000-000",
      Email: "toysrus@mail.com",
      Edit: "",
      Delete: "",
    },
  ];
  // 브랜드 선택항목 미리 정의
  this.Brand = ["옥스포드", "터닝메카드", "시크릿쥬쥬", "닌텐도", "헬로카봇", "신비아파트", "핑크퐁", "레고"];

  // Table Header에 담길 데이터를 확장성을 위한 배열생성
  this.tableHeader = [];

  // 테이블 생성 메서드
  this.createTable = () => {
    // init

    // Table Header

    for (let i = 0; i < this.toysrusItem.length; i++) {
      for (let key in this.toysrusItem[i]) {
        // key값을 tableHeader 배열에 담기
        // console.log(key);
        // key값이 tableHeader 배열안에 없으면
        if (this.tableHeader.indexOf(key) === -1) {
          this.tableHeader.push(key);
          // console.log(this.tableHeader);
        }
      }
    }

    const tableElem = document.createElement("table");
    tableElem.setAttribute("id", "toysrusTable");
    tableElem.setAttribute("class", "min-w-full bg-white");
    // tr

    const theadElem = tableElem.createTHead();
    theadElem.setAttribute("class", "bg-gray-800 text-white");
    const theadTrElem = theadElem.insertRow(-1); // 첫번째 tr 생성, 가장 마지막 부분에

    // console.log(theadTrElem);

    // tableHeader 안의 데이터를 생성
    for (let h = 0; h < this.tableHeader.length; h++) {
      //   console.log(this.tableHeader);
      const thElem = document.createElement("th");
      thElem.setAttribute("class", "text-center py-3 px-4 uppercase font-semibold text-sm");
      thElem.innerHTML = this.tableHeader[h];
      //   console.log(this.tableHeader[h]);
      //   console.log(thElem);
      theadTrElem.appendChild(thElem);
    }

    const tbodyElem = tableElem.createTBody();
    tbodyElem.setAttribute("class", "text-gray-700");
    // let lastRow = tableElem.cells[tableElem.rows.length - 1];
    // console.log(lastRow, "lastRow");
    // tbody 내용 작성
    for (var i = 0; i < this.toysrusItem.length; i++) {
      // 테이블의 한 행 추가
      const tbodyTrElem = tbodyElem.insertRow(-1);
      for (var j = 0; j < this.tableHeader.length; j++) {
        const tableCell = tbodyTrElem.insertCell();
        tableCell.innerHTML = this.toysrusItem[i][this.tableHeader[j]];
        tableCell.setAttribute("class", "text-center py-3 px-4");
      }

      // 버튼 생성

      // Update
      const editCell = tbodyTrElem.cells[7];
      const btnUpdate = document.createElement("button");
      btnUpdate.setAttribute("type", "button"); // SET ATTRIBUTES.
      btnUpdate.setAttribute("value", "수정");
      btnUpdate.setAttribute("id", "Edit" + i);
      btnUpdate.setAttribute("class", "border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline");
      btnUpdate.setAttribute("onclick", "toysrusApp.Update(this)"); // ADD THE BUTTON's 'onclick' EVENT.
      btnUpdate.innerText = "수정";
      editCell.appendChild(btnUpdate);

      // Save
      const saveCell = tbodyTrElem.cells[7];
      const btnSave = document.createElement("button");
      btnSave.setAttribute("type", "button"); // SET ATTRIBUTES.
      btnSave.setAttribute("value", "저장");
      btnSave.setAttribute("id", "Save" + i);
      btnSave.setAttribute("style", "display:none");
      btnSave.setAttribute("class", "border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline");
      btnSave.setAttribute("onclick", "toysrusApp.Save(this)"); // ADD THE BUTTON's 'onclick' EVENT.
      btnSave.innerText = "저장";
      saveCell.appendChild(btnSave);

      // Delete
      const deleteCell = tbodyTrElem.cells[8];
      const btnDelete = document.createElement("button");
      btnDelete.setAttribute("type", "button"); // SET ATTRIBUTES.
      btnDelete.setAttribute("value", "수정");
      btnDelete.setAttribute("id", "Delete" + i);
      btnDelete.setAttribute("class", "border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline");
      btnDelete.setAttribute("onclick", "toysrusApp.Delete(this)"); // ADD THE BUTTON's 'onclick' EVENT.
      btnDelete.innerText = "삭제";
      deleteCell.appendChild(btnDelete);
    }

    // 입력을 할 수 있는 마지막 행 추가
    const trElem = tableElem.insertRow(-1);
    for (let j = 0; j < this.tableHeader.length - 2; j++) {
      const inputElem = trElem.insertCell(-1);
      inputElem.setAttribute("class", "text-center py-3 px-4");
      if (j >= 1) {
        if (j === 1) {
          const selectElem = document.createElement("select");
          selectElem.innerHTML = `<option value=""></option>`;
          selectElem.setAttribute("class", "py-1 text-sm bg-white rounded shadow-lg border border-gray-300");
          for (k = 0; k < this.Brand.length; k++) {
            selectElem.innerHTML = selectElem.innerHTML + `<option value="${this.Brand[k]}">${this.Brand[k]}</option>`;
          }
          inputElem.appendChild(selectElem);
        } else {
          const textBoxElem = document.createElement("input");
          textBoxElem.setAttribute("class", "shadow appearance-none border rounded py-2 px-3 text-grey-darker");
          textBoxElem.setAttribute("type", "text");
          textBoxElem.setAttribute("value", "");
          inputElem.appendChild(textBoxElem);
        }
      }
    }
    // create 버튼 생성
    this.tdElem = document.createElement("td");
    // const tbodyTrElem = tbodyElem.insertRow(-1);
    trElem.appendChild(this.tdElem);
    this.tdElem.setAttribute("class", "text-center py-3 px-4");
    // const createCell = tbodyTrElem.cells[7];
    // console.log(createCell);
    const btnCreate = document.createElement("button");

    btnCreate.setAttribute("type", "button"); // SET ATTRIBUTES.
    btnCreate.setAttribute("value", "생성");
    btnCreate.setAttribute("id", "Create" + i);
    btnCreate.setAttribute("class", "border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline");
    btnCreate.setAttribute("onclick", "toysrusApp.Create(this)"); // ADD THE BUTTON's 'onclick' EVENT.
    btnCreate.innerText = "생성";
    this.tdElem.appendChild(btnCreate);

    const containerElem = document.getElementById("container");
    containerElem.innerHTML = "<h1 class='text-5xl font-mono my-4'>토이저러스(toysrus) 재고관리 시스템</h1>";
    containerElem.appendChild(tableElem);
  };

  // 삭제 메서드
  this.Delete = (onClickBtn) => {
    console.log(onClickBtn);
    const targetIndex = onClickBtn.parentNode.parentNode.rowIndex;
    console.log(targetIndex);
    this.toysrusItem.splice(targetIndex - 1, 1);
    this.createTable();
  };
  // 추가 메서드
  this.Create = (onClickBtn) => {
    const createIndex = onClickBtn.parentNode.parentNode.rowIndex;
    const trData = document.getElementById("toysrusTable").rows[createIndex];
    //console.log(trData);

    let objItem = {};
    // tr 데이터 안의 td 속 key:value 를 선택해서 objItem 에 저장

    for (let i = 1; i < this.tableHeader.length - 2; i++) {
      const tdTag = trData.getElementsByTagName("td")[i];
      console.log(tdTag);

      if (tdTag.childNodes[0].getAttribute("type") === "text" || tdTag.childNodes[0].tagName === "SELECT") {
        const textValue = tdTag.childNodes[0].value;
        console.log(textValue);
        // 만약

        if (textValue != "") {
          objItem[this.tableHeader[i]] = textValue;
          console.log(objItem);
        } else {
          objItem = "";
          alert("모든 항목을 입력하세요");
          break;
        }
      }
    }

    objItem[this.tableHeader[0]] = this.toysrusItem.length + 1; // ID값
    objItem[this.tableHeader[7]] = "";
    objItem[this.tableHeader[8]] = "";
    this.toysrusItem.push(objItem);
    this.createTable();
  };
  this.Update = (onClickBtn) => {
    const updateIndex = onClickBtn.parentNode.parentNode.rowIndex;
    const tdTag = document.getElementById("toysrusTable").rows[updateIndex];

    // 기존에 입력한 데이터들을 가져오기

    for (let i = 1; i < this.tableHeader.length - 2; i++) {
      if (i == 1) {
        let td = tdTag.getElementsByTagName("td")[i];
        const selectElem = document.createElement("select");
        selectElem.setAttribute("class", "py-1 text-sm bg-white rounded shadow-lg border border-gray-300");
        selectElem.innerHTML = `<option value="${td.innerText}">${td.innerText}</option>`;
        for (k = 0; k < this.Brand.length; k++) {
          selectElem.innerHTML = selectElem.innerHTML + `<option value="${this.Brand[k]}">${this.Brand[k]}</option>`;
        }

        td.innerText = "";
        td.appendChild(selectElem);
      } else {
        let td = tdTag.getElementsByTagName("td")[i];
        let inputElem = document.createElement("input"); // TEXTBOX.

        inputElem.setAttribute("type", "text");
        inputElem.setAttribute("class", "shadow appearance-none border rounded py-2 px-3 text-grey-darker");
        // input값(input value)에는 이전에 입력한 값이 있게 하기
        inputElem.setAttribute("value", td.innerText);
        // input 태그 이외에 다른 문자열은 없음
        td.innerText = "";
        td.appendChild(inputElem);
      }
    }
    let saveBtn = document.getElementById("Save" + (updateIndex - 1));
    // console.log(saveBtn);
    saveBtn.setAttribute("style", "display:block;");
    onClickBtn.setAttribute("style", "display:none");
  };

  // save
  this.Save = (onClickBtn) => {
    const saveIndex = onClickBtn.parentNode.parentNode.rowIndex;
    const tdTag = document.getElementById("toysrusTable").rows[saveIndex];
    for (let i = 1; i < this.tableHeader.length; i++) {
      let td = tdTag.getElementsByTagName("td")[i];
      if (td.childNodes[0].getAttribute("type") == "text" || td.childNodes[0].tagName == "SELECT") {
        this.toysrusItem[saveIndex - 1][this.tableHeader[i]] = td.childNodes[0].value;
      }
    }
    this.createTable();
  };
})();
toysrusApp.createTable();
