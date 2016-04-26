

var r = 60;
var g = 60;
var b = 60;
var a = 1;

function color_aleatorio() {
	var gen_red = $( "#chk_red" ).is( ":checked" );
	var gen_green = $( "#chk_green" ).is( ":checked" );
	var gen_blue = $( "#chk_blue" ).is( ":checked" );

	if (gen_red) {
		var r = getRandomInt(0, 255);
		$("#rSlider").slider("value", r);
	}

	if (gen_green) {
		var g = getRandomInt(0, 255);
		$("#gSlider").slider("value", g);
	}

	if (gen_blue) {
		var b = getRandomInt(0, 255);
		$("#bSlider").slider("value", b);
	}

	dibujar();
}


function dibujar () {
	//	se obtienen los valores
	var r = $("#rSlider").slider("value");
	var g = $("#gSlider").slider("value");
	var b = $("#bSlider").slider("value");

	// se convierten los valores
	var rHex = rgbToHex(r,0,0);
	var gHex = rgbToHex(0,g,0);
	var bHex = rgbToHex(0,0,b);



	$("#rNumber").text("HEX: " + rHex + "   R: " + r);
	$("#gNumber").text("HEX: " + gHex + "   G: " + g);
	$("#bNumber").text("HEX: " + bHex + "   B: " + b);

	// rotulo preview
	$("#pNumber").text("HEX: " + rgbToHex(r, g, b) );
	$("#pHex").text("RGB: " + r + " " + g + " " + b );
	var rgb = changeColor(r,g,b);
}



function setSliders () {

	$("#rSlider").slider({
		value: r,
		step: 1,
		range: 'min',
		min: 0,
		max: 255,
		change: function () {

			var r = $("#rSlider").slider("value");
			var rgb = "rgb("+ r + ",0,0)"
			$("#rPreview").css("background", rgb);
			 dibujar();
		}
	});
	$("#gSlider").slider({
		value: g,
		step: 1,
		range: 'min',
		min: 0,
		max: 255,
		change: function () {
			var g = $("#gSlider").slider("value");
			var rgb = "rgb(0 ,"+g+",0)";
			$("#gPreview").css("background", rgb);
			dibujar();
		}
	});
	$("#bSlider").slider({
		value: b,
		step: 1,
		range: 'min',
		min: 0,
		max: 255,
		change: function () {
			var b = $("#bSlider").slider("value");
			var rgb = "rgb(0 ,0,"+b+")";
			$("#bPreview").css("background", rgb);
			dibujar();
		}
	});

	/* backgrounds */
	var rgb = dibujar();

	$("#rPreview").css("background",rgb);
	$("#gPreview").css("background",rgb);
	$("#bPreview").css("background",rgb);
}

function setButtons () {
	$("#btn_random").button().click(color_aleatorio);

	$("#rgb_select").buttonset();

	$( "#color_select" ).buttonset();
}

function set_spinner () {
	$( "#spinner" ).spinner({
		max: 100,
		min: 20,
		spin: function () {
			var size_text = $("#spinner").spinner("value");
			$("#text_content").css(
				{
					"font-size": size_text+'px'
				}
			);
		}
	}).val(100);
}

function changeColor (r, g, b) {
	var rgb = "rgb( "+ r +", "+ g +", "+ b +" )";

	$("#rgbPreview").css(
		{
			"background": rgb
		}
	);

		var set_text = $( "#radio_font" ).is( ":checked" );
		var set_back = $( "#radio_back" ).is( ":checked" );

		if (set_text) {
			$("#text_content").css(
				{
					"color": rgb
				}
			);
		}

		if (set_back) {
			$("#text_content").css(
				{
					"background-color": rgb
				}
			);
		}


	return rgb;
}

window.onready = function () {
	setSliders();
	setButtons();
	set_spinner();
}

//mozilla developers
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
