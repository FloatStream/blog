var aparted = false;

$("#open").click(function () {

	if (!aparted) {
		var typed = new Typed('.letter', {
			strings: [
				"^900致永远可爱的&nbsp&nbsp小董</br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;你收到这封信的时候应该是 2023 年 2 月 14 日情人节, 情人节快乐哦（这也算完成了给你一封情书的约定😁）^100 </br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;转眼之间, 我们相识已超过两年^200, 这中间发生了许许多多的事情, 它让我们开心^100、难过^100、失落^100、期盼^100, 它也让我从一个懵懂无知的少年逐渐成长。^3000",
				"</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^100青春的爱情总是遗憾的, 单纯的心灵无法承受爱的责任^300, 一次次误会与错误让曾热情似火的心灵逐渐冷却。^300这些道理我总是懂的很慢, 而命运也给了我致命的打击^300。但幸运的是你重新为我打开了一扇窗, 让阳光重新照在我身上。^200 </br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;你说的对, 如果我们自己都没有信心, 那如何会获得胜利的果实。^3000",
				"</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^100此刻我没有什么华丽的辞藻, 只有一片赤诚的真心, 接下来的时间我会用行动证明我要重新把你追回的决心</br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我想对你说 ^600我^100爱^100你^600 , 如果要给这句话加一个期限, 我希望是 ^600一^100万^100年^600 </br></br><p style='float:right; display:block; width:150px;'>永远爱你的小崔</p>"
			],
			typeSpeed: 130,
			backSpeed: 10,
			fadeOut: "true",
		});

		$('#open').find("span").eq(0).css('background-position', "0 -150px");

		aparted = true;

		var music = document.getElementById('music2');
		if (music.paused) {
			music.play();
			$('#music_btn2').css("opacity", "1");
		}
	}

});

function playPause() {
	var music = document.getElementById('music2');
	var music_btn = $('#music_btn2');

	if (music.paused) {
		music.play();
		music_btn.css("opacity", "1");
	}
	else {
		music.pause();
		music_btn.css("opacity", "0.2");
	}
}


window.onload = function () {

	var currentUrl = window.location.href;
	var firstIndex = currentUrl.indexOf("#");
	if (firstIndex <= 0) window.location.href = currentUrl + "#contact";

	$('#music2').attr('src', bgmsrc);

	document.addEventListener('touchstart', function (event) { if (event.touches.length > 1) event.preventDefault(); });

	var lastTouchEnd = 0;

	document.addEventListener('touchend', function (event) {

		var now = (new Date()).getTime();
		if (now - lastTouchEnd <= 300) event.preventDefault();
		lastTouchEnd = now;

	}, false);

	document.addEventListener('gesturestart', function (event) { event.preventDefault(); });

	$('body').css('opacity', '1');
	$('#jsi-cherry-container').css('z-index', '-99');

}
