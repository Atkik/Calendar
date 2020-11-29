//年月表示関数
function viewMonth(year, month) {
	var monthOutput = document.getElementsByClassName("month-view");
	//yyyy-MMを取得（月は0埋め）
	var yM = year + "-" + ("0" + month).slice(-2);
	monthOutput[0].innerHTML = '<input type="month" id="select-month" value=' + yM + ' onchange="monthCange()">';
}

//年月変更関数
function monthCange() {
	var yM = document.getElementById("select-month").value;
	//変更された年月でカレンダー表示
	viewTable(yM.slice(0,4), yM.slice(-2));
}

//スケジュール追加入力関数
function addSchedule() { 
	//ダイアログ作成
	$(".schedule-view-main").append(
		'<div class="dialog" title="スケジュール登録" style="display:none;">'+
			'<p>開始時刻を入力してください</p>'+
			'<input type="time">'+
			'<p>終了時刻を入力してください</p>'+
			'<input type="time">'+
			'<p>スケジュール内容を入力してください</p>'+
			'<textarea cols="50" rows="5"></textarea>'+
		'</div>'
	);
}

//スケジュール表示関数
function showSchedule(date) {
	//日付をyyyy/mm/ddに整形
	var showDate = date.substr(5, 4) + "/" + date.substr(10, 2) + "/" + date.substr(13, 2);
	
	//日付表示
	$(".schedule-view-main").append('<div id="schedule-date">' + showDate + '</div>');
	
	//新規登録ボタン追加
	$(".schedule-view-main").append('<input type="submit" value="新規登録" onClick="addSchedule()">');
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
				//カレンダーセルにdateのIDを設定
				dayCell.setAttribute("id","date");
				monthStartFlug++;
			} else if(dateCount != (endMonthDate + 1)) {
				//カレンダーセルにactive-dateクラスとdate_yyyymmddのIDを設定
				dayCell.setAttribute("class","active-date");
				dayCell.setAttribute("id","date-" + year + "-" + month + "-" + ("0" + dateCount).slice(-2));
				
				//背景色を白に設定
				dayCell.style.backgroundColor = "white";
				//日付を表示
				dayCell.innerHTML = '<span>' + dateCount + '</span>';
				
				
				dayCell.onclick = function(){
					//セルが白くなかったらフラグを立てる
					var colorFlg = 0;
					if(document.getElementById(this.id).style.backgroundColor != "white"){
						colorFlg = 1;
					}
					
					//active-dateクラスのセルをすべて白くする
					var elemActivedate = document.getElementsByClassName("active-date");
					for (var l = 0; l < elemActivedate.length; l++){
						elemActivedate[l].style.backgroundColor = "white";
					}
					
					//schedule-view-main要素をシンプルな変数に代入
					var elemScheView = document.getElementsByClassName("schedule-view-main")[0];
					//フラグが立っていない場合（セルが白い場合）
					if(colorFlg == 0){
						//セルの背景色を#c7c8fcに変更
						document.getElementById(this.id).style.backgroundColor = "#c7c8fc";
						//schedule-view-mainを白く
						elemScheView.style.backgroundColor = "white";
						
						//schedule-view-main内の表示をすべて削除
						while(elemScheView.firstChild){
							elemScheView.removeChild(elemScheView.firstChild);
						}
						//スケジュール表示
						showSchedule(this.id);
					} else {
						//schedule-view-mainをグレーアウト
						elemScheView.style.backgroundColor = "#b8b8b8";
						//schedule-view-main内の表示をすべて削除
						while(elemScheView.firstChild){
							elemScheView.removeChild(elemScheView.firstChild);
						}
					}
				}
				
				dateCount++;
			} else {
				//カレンダーセルにdateクラスを設定
				dayCell.setAttribute("id","date");
			}
		}
		if(dateCount == (endMonthDate + 1)) {
			j = 1;
		}
	}
}

var today = new Date();
//デフォルト年月表示（今月）
var year = today.getFullYear();
var month = today.getMonth()+1;
viewMonth(year, month);

//カレンダー表示
viewTable(year, month);