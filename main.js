//年月表示関数
function viewMonth(year, month) {
	//yyyy-MMを取得（月は0埋め）
	var yM = year + "-" + ("0" + month).slice(-2);
	$(".month-view")[0].innerHTML = '<input type="month" id="select-month" value=' + yM + ' onchange="monthCange()">';
}

//年月変更関数
function monthCange() {
	var yM = $("#select-month").value;
	//変更された年月でカレンダー表示
	viewTable(yM.slice(0,4), yM.slice(-2));
}

//スケジュール登録関数
function insertSchedule(dbDate) { 
	//ダイアログ作成
	$(".schedule-view-main").append(
		'<div class="dialog" title="スケジュール登録" style="display:none;">'+
			'<p>開始時刻を入力してください</p>'+
			'<input type="time" id="input-start">'+
			'<p>終了時刻を入力してください</p>'+
			'<input type="time" id="input-end">'+
			'<p>スケジュール内容を入力してください</p>'+
			'<textarea cols="50" rows="5" id="input-schedule"></textarea>'+
		'</div>'
	);
	
	$(".dialog").dialog({
		width : 600,
		//ボタンを設定
		buttons: {
			//登録ボタン
			"登録": function(event) {
				//insert.php実行
				var request = new XMLHttpRequest();
				request.open('POST', 'insert.php', true);
				request.onreadystatechange = function (){
					switch(request.readyState){
					//通信が完了した場合
					case 4:
						if(request.status == 0){
							alert("登録に失敗しました。");
						} else {
							alert("登録しました。");
						}
						break;
					}
				};
				//送信するデータをテキスト形式に指定
				request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				request.send('&date=' + dbDate + '&start=' + $("#input-start").val() + '&end=' + $("#input-end").val() + '&schedule=' + $("#input-schedule").val());
				
				$(this).dialog("close");
				$(".dialog").remove();
				
				//schedule-view-main内の表示をすべて削除
				$(".schedule-view-main").empty();
				//スケジュール再表示
				showSchedule("date-" + dbDate);
			},
			//キャンセルボタン
			"キャンセル": function() {
				$(this).dialog("close");
				$(".dialog").remove();
			}
		},
		//×ボタン削除
		open:function(event, ui){ $(".ui-dialog-titlebar-close").hide();}
	});
}

//スケジュール変更関数
function updateSchedule(No, start, end, schedule, dbDate) {
	//ダイアログ作成
	$(".schedule-view-main").append(
		'<div class="dialog" title="スケジュール変更" style="display:none;">'+
			'<p>日付を入力してください</p>'+
			'<input type="date" value="' + dbDate + '" id="update-date">'+
			'<p>開始時刻を入力してください</p>'+
			'<input type="time" value="' + start + '" id="update-start">'+
			'<p>終了時刻を入力してください</p>'+
			'<input type="time" value="' + end + '" id="update-end">'+
			'<p>スケジュール内容を入力してください</p>'+
			'<textarea cols="50" rows="5" id="update-schedule">' + schedule + '</textarea>'+
		'</div>'
	);
	
	$(".dialog").dialog({
		width : 600,
		// ボタンを設定
		buttons: {
			//l変更ボタン
			"変更": function(event) {
				//update.php実行
				var request = new XMLHttpRequest();
				request.open('POST', 'update.php', true);
				request.onreadystatechange = function (){
					switch(request.readyState){
					//通信が完了した場合
					case 4:
						if(request.status == 0){
							alert("変更に失敗しました。");
						} else {
							alert("変更しました。");
						}
						break;
					}
				};
				//送信するデータをテキスト形式に指定
				request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				request.send('&dataNo=' + No + '&date=' + $("#update-date").val() + '&start=' + $("#update-start").val() + '&end=' + $("#update-end").val() + '&schedule=' + $("#update-schedule").val());
				
				$(this).dialog("close");
				$(".dialog").remove();
				
				//schedule-view-main内の表示をすべて削除
				$(".schedule-view-main").empty();
				//スケジュール再表示
				showSchedule("date-" + dbDate);
			},
			//キャンセルボタン
			"キャンセル": function() {
				$(this).dialog("close");
				$(".dialog").remove();
			}
		},
		//×ボタン削除
		open:function(event, ui){ $(".ui-dialog-titlebar-close").hide();}
	});
}

//スケジュール削除関数
function deleteSchedule(No, start, end, schedule, dbDate) {
	//ダイアログ作成
	$(".schedule-view-main").append(
		'<div class="dialog" title="スケジュール削除" style="display:none;">'+
			'<p>本当にこのスケジュールを削除しますか？</p>'+
			'<p>' + start + ' - ' + end + '</p>'+
			'<div style="border: 1px solid black">' + schedule + '</div>'+
		'</div>'
	);
	
	$(".dialog").dialog({
		width : 600,
		// ボタンを設定
		buttons: {
			//削除ボタン
			"はい": function(event) {
				//delete.php実行
				var request = new XMLHttpRequest();
				request.open('POST', 'delete.php', true);
				request.onreadystatechange = function (){
					switch(request.readyState){
					//通信が完了した場合
					case 4:
						if(request.status == 0){
							alert("削除に失敗しました。");
						} else {
							alert("削除しました。");
						}
						break;
					}
				};
				//送信するデータをテキスト形式に指定
				request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				request.send('&dataNo=' + No);
				
				$(this).dialog("close");
				$(".dialog").remove();
				
				//schedule-view-main内の表示をすべて削除
				$(".schedule-view-main").empty();
				//スケジュール再表示
				showSchedule("date-" + dbDate);
			},
			// キャンセルボタン
			"いいえ": function() {
				$(this).dialog("close");
				$(".dialog").remove();
			}
		},
		//×ボタン削除
		open:function(event, ui){ $(".ui-dialog-titlebar-close").hide();}
	});
	
}

//スケジュール表示関数
function showSchedule(date) {
	var yearPart = date.substr(5, 4);
	var monthPart = date.substr(10, 2);
	var datePart = date.substr(13, 2);
	//日付を表示用に整形
	var showDate = yearPart + "/" + monthPart + "/" + datePart;
	//日付をデータ操作用に整形
	var dbDate = yearPart + "-" + monthPart + "-" + datePart;
	
	//日付表示
	$(".schedule-view-main").append('<div id="schedule-date">' + showDate + '</div>');
	
	//新規登録ボタン追加
	$(".schedule-view-main").append('<input type="submit" value="新規登録" onClick=\'insertSchedule("' + dbDate + '")\'>');
	$(".schedule-view-main").append('<div class="schedule-space"></div>');
	
	//select.php実行
	var request = new XMLHttpRequest();
	request.open('POST', 'select.php', true);
	request.onreadystatechange = function (){
		switch(request.readyState){
		//通信が完了した場合
		case 4:
			if(request.status == 0){
				console.log("DB接続に失敗しました。");
			} else {
				//スケジュール一覧を表示
				for(var i = 0; i < request.response.length; i++) {
					$(".schedule-space").append(
						'<div class="accordion-trigger">'+
							'<div class="accordion-mark">▶ </div>'+
							'<div class="schedule-time">' + request.response[i]["start"] + '　-　'+ request.response[i]["end"] + '</div>'+
						'</div>'+
						'<div class="accordion-content">'+
							'<div class="schedule-content">' + request.response[i]["schedule"] + '</div>'+
							'<div class="schedule-button">'+
								//変更/削除ボタンを設置、処理後にスケジュール再表示するため年月日も渡す
								'<input type="submit" value="変更" onClick=\'updateSchedule(' + request.response[i]["No"] + ',"' + request.response[i]["start"] + '","' + request.response[i]["end"] + '","' + request.response[i]["schedule"] + '","' + dbDate + '")\'>'+
								'<input type="submit" value="削除" onClick=\'deleteSchedule(' + request.response[i]["No"] + ',"' + request.response[i]["start"] + '","' + request.response[i]["end"] + '","' + request.response[i]["schedule"] + '","' + dbDate + '")\'>'+
							'</div>'+
						'</div>'+
						'<br>'
					);
				}
			}
			
			//▶マーク回転フラグ
			var rotateFlag = 0;
			//accordion-triggerクラスの要素すべてに対して処理を実行
			$('.accordion-trigger').each(function(){
				$(this).on('click',function(){
					//隣接する要素を表示
					$(this).next().slideToggle(150);
					$(this).next().toggleClass('open');
					//フラグが立っていなければ▶マークを90°回転させる
					if(rotateFlag==0){
						$('.accordion-mark',this).css('transform', 'rotate(90deg)');
						rotateFlag=1;
					//フラグが立っていれば▶マークをもとに戻す
					} else {
						$('.accordion-mark',this).css('transform', 'rotate(0deg)');
						rotateFlag=0;
					}
				});
			});
			break;
		}
	};
	//送信するデータをテキスト形式に指定
	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	//返ってくる結果をjson形式に指定
	request.responseType = 'json';
	request.send('date=' + dbDate);
	
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
	
	//既にカレンダーに日付が表示されている場合は一度消去
	var rowsCount = $(".calendar-table")[0].rows.length;
	if(rowsCount > 1) {
		for(var i = 0; i < rowsCount-1; i++) {
			$(".calendar-table")[0].deleteRow(1);
		}
	}
	
	//月初の曜日まで日付を非表示にするフラグ
	var monthStartFlug = 0;
	//日付カウント
	var dateCount = 1;
	
	//カレンダー表示
	var j = 0;
	while(j == 0){
		var weekRow = $(".calendar-table")[0].insertRow(-1);
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
				dayCell.setAttribute("id","date-" + year + "-" + ("0" + month).slice(-2) + "-" + ("0" + dateCount).slice(-2));
				
				//背景色を白に設定
				dayCell.style.backgroundColor = "white";
				//日付を表示
				dayCell.innerHTML = '<span>' + dateCount + '</span>';
				
				
				dayCell.onclick = function(){
					//セルが白くなかったらフラグを立てる
					var colorFlg = 0;
					if($('#'+this.id).css("background-color") != "rgb(255, 255, 255)"){
						colorFlg = 1;
					}
					
					//active-dateクラスのセルをすべて白くする
					for (var l = 0; l < $(".active-date").length; l++){
						$(".active-date").eq(l).css("background-color" , "white");
					}
					
					//schedule-view-main要素をシンプルな変数に代入
					var elemScheView = document.getElementsByClassName("schedule-view-main")[0];
					//フラグが立っていない場合（セルが白い場合）
					if(colorFlg == 0){
						//セルの背景色を#c7c8fcに変更
						$('#'+this.id).css("backgroundColor" , "#c7c8fc");
						//schedule-view-mainを白く
						$(".schedule-view-main").css("backgroundColor" , "white");
						
						//schedule-view-main内の表示をすべて削除
						$(".schedule-view-main").empty();
						
						//スケジュール表示
						showSchedule(this.id);
					} else {
						//schedule-view-mainをグレーアウト
						$(".schedule-view-main").css("backgroundColor" , "#b8b8b8");
						
						//schedule-view-main内の表示をすべて削除
						$(".schedule-view-main").empty();
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