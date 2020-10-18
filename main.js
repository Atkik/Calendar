//年月表示関数
function viewMonth(year, month) {
	var monthOutput = document.getElementsByClassName("month-view");
	//yyyy-MMを取得（月は0埋め）
	var yM = year + "-" + ("0" + month).slice(-2);
	monthOutput[0].innerHTML = '<input type="month" id="select-month" value=' + yM + ' onchange="monthCange()">';
}

//カレンダー表示関数
function viewTable(year, month) {
	//月初
	var begginingMonth = new Date(year, month-1, 1);
	//月初曜日
	var begginingWeekDay = begginingMonth.getDay();
	//月末
	var endMonth = new Date(year, month, 0);
	var endMonthDate = endMonth.getDate();
	
	//カレンダーテーブルクラス取得
	var monthTable = document.getElementsByClassName("calendar-table");
	
	//既にカレンダーに日付が表示されている場合は一度消去
	var rowsCount = monthTable[0].rows.length;
	if(rowsCount > 1) {
		for(var i = 0; i < rowsCount-1; i++) {
			monthTable[0].deleteRow(1);
		}
	}
	
	//月初の曜日まで日付を非表示にするフラグ
	var monthStartFlug = 0;
	//日付カウント
	var dateCount = 1;
	
	//カレンダー表示
	var j = 0;
	while(j == 0){
		var weekRow = monthTable[0].insertRow(-1);
		for(var k = 0; k < 7; k++) {
			var dayCell = weekRow.insertCell(-1);
			//月初の曜日から月末まで日付を表示する
			if(begginingWeekDay > monthStartFlug) {
				monthStartFlug++;
			} else if(dateCount != (endMonthDate + 1)) {
				dayCell.innerHTML = '<span class="date">' + dateCount + '</span>';
				dateCount++;
			}
			
		}
		if(dateCount == (endMonthDate + 1)) {
			j = 1;
		}
	}
}

//年月変更関数
function monthCange() {
	var yM = document.getElementById("select-month").value;
	//変更された年月でカレンダー表示
	viewTable(yM.slice(0,4), yM.slice(-2));
}

var today = new Date();
//デフォルト年月表示（今月）
var year = today.getFullYear();
var month = today.getMonth()+1;
viewMonth(year, month);

//カレンダー表示
viewTable(year, month);