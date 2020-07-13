//年月表示関数
function viewMonth(year, month) {
	var monthOutput = document.getElementsByClassName("month-output");
	monthOutput[0].innerHTML=year + "年 " + month + "月";
}

//カレンダーテーブル表示関数
function viewTable(year, month) {
	//月初
	var begginingMonth = new Date(year, month-1, 1);
	//月初曜日
	var begginingWeekDay = begginingMonth.getDay();
	//月末
	var endMonth = new Date(year, month, 0);
	var endMonthDate = endMonth.getDate();

	var monthTable = document.getElementsByClassName("calendar-table");
	
	var monthStartFlug = 0;
	var dateCount = 1;
	
	for(var i = 0; i < 5; i++) {
		var weekRow = monthTable[0].insertRow(-1);
		for(var j = 0; j < 7; j++) {
			var dayCell = weekRow.insertCell(-1);
			//月初の曜日から月末まで日付を表示する
			if(begginingWeekDay > monthStartFlug) {
				monthStartFlug++;
			} else if(dateCount != (endMonthDate + 1)) {
				dayCell.innerHTML = "<span>" + dateCount + "</span>";
				dateCount++;
			}
			
		}
	}
}

var today = new Date();
//デフォルト年月表示（今月）
var year = today.getFullYear();
var month = today.getMonth()+1;
viewMonth(year, month);

//カレンダーテーブル表示
viewTable(year, month);