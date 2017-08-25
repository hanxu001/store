$(document).ready(function(){  

	// subo hacia arriba del todo al cargar, por si acaso
	$("html, body").animate({ scrollTop: "0px" });
	
	// control de eventos en el botón "menu"	
	$(".bt-menu").click(function () {
		$(".lang").toggleClass("hide-lang");
		$(this).find(".navicon-button").toggleClass("open");
		if($(".navicon-button").hasClass('open')){
		// oculto el canvas porque si no la animación falla
			$("#canvas").hide();
			$("#map").hide();

			TweenMax.to($('.menu-desp'), .6, {top:"0", ease:Power4.easeOut});
		} else {
		// muestro de nuevo el canvas al completar la animación
			TweenMax.to($('.menu-desp'), .4, {top:"-100%", ease:Power4.easeInOut, onComplete: function (){$("#canvas").show();}});
			$("#map").delay( 300 ).fadeIn();
		}
	});
	
	
	// botón menu en hover
	$('.bt-menu .sensor-bt-menu').hover(function(){
		if (!es_movil) {
		  	$('.bt-menu .mascara .txt-menu').toggleClass('hover');
		};
	});
	
	
	// logo de Ingenio 
		$('#logo img').hover(function(){
			if (!es_movil) {
		  	$('#logo .mascara h1').toggleClass('hover');
		};
	});

	if(Modernizr.touch){
		//$("#canvas").remove();
		//alert("mobile")
		setTimeout(function (){
			createjs.Ticker.setFPS(15);
		}, 2000)
	}

	//funciones de SCROLL
	var panelActual = 0;
	var intervalo;
	var intervalo2;
	var sections_top = getSectionsTop();
	var scroll_anterior = -1;
	var es_movil = false;
	
	//click en el botón de scrolldown
	$(document).on('click', '.bt-scroll-down', scroller);
	function scroller(event){
		panelActual++;
		if(panelActual>6){
			panelActual= 0;
		}
		//console.log("panelActual" + panelActual);
		var scrollYPos = $('.bg-panel-0'+panelActual).offset().top;
		TweenMax.to(window, 0.25, {scrollTo:{y:scrollYPos, x:0}, ease:Power4.easeInOut});
		
		
		//, onComplete: function (){ setTimeout(function (){$("#canvas").css("opacity", 1).stop().hide().delay(700).fadeIn(500);}, 300)}
		//TweenMax.to($('#bt-scroll-down-txt1'), .4, {bottom:"-100px"});
		//TweenMax.to($('#bt-scroll-down-txt2'), .4, {bottom:"-100px"});
		$('#bt-scroll-down-txt1').css({bottom:"-100px"});
		$('#bt-scroll-down-txt2').css({bottom:"-100px"});
		//$('.bt-scroll-down').fadeOut();
		event.preventDefault();
	}	
	
	// efecto hover botón scrolldown
	$(".bt-scroll-down").hover(function() {
		//window.controller.pausa=true;
		if (panelActual==0) {
			$('#bt-scroll-down-txt2').css({bottom:"60px"});
		} else {
			$('#bt-scroll-down-txt1').css({bottom:"60px"});
		};
	}, function() {
		$('#bt-scroll-down-txt1').css({bottom:"-100px"});
		$('#bt-scroll-down-txt2').css({bottom:"-100px"});
		//setTimeout(function (){	window.controller.pausa=false;}, 500);
	});

	

	$(document).on('click', '.nav li a', bajaSuave);
	function bajaSuave(e){
		var scrollYPos = $($(e.currentTarget).attr("href")).offset().top -155;
		//TweenMax.to(window, 0.5, {scrollTo:{y:scrollYPos, x:0}, ease:Power4.easeInOut});
		$("body, html").animate({scrollTop: scrollYPos}, 400);
		return false;
	}
  
	//Partners mouseenter
	$(".partners-image").mouseover(function() {
	    $(this).find(".partners-overlay").stop().fadeIn();
	    $(this).find(".partner-triangle").stop().fadeIn();
	  })
	  .mouseout(function() {
	    $(this).find(".partners-overlay").stop().fadeOut();
	    $(this).find(".partner-triangle").stop().fadeOut();
	  });



	//Info ABOUT
	$( "#info1" ).click(function() {
		$( "#content-info1" ).css("z-index", 100);
		$( "#info1" ).css("z-index", 100);
		$( "#info2" ).css("z-index", 99);
		$( "#info3" ).css("z-index", 99);
		if ($( "#triangle-info1" ).css("display")=="none"){
		
			$("#info1 span").fadeOut();
			$("#triangle-info1, #content-info1, #info1-circle").fadeIn();
			
			$("#info2 span").fadeIn();
			$("#triangle-info2, #triangle-info2, #info2-circle").fadeOut();
			
			
			$("#info3 span").fadeIn();
			$("#triangle-info3, #triangle-info3, #info3-circle").fadeOut();
			
			$("#content-info2, #content-info3").fadeOut();
			
		  	$("#info1, #info2, #info3").removeClass( "blue" );
		  	$("#info1").addClass( "blue" );
		} else {
			$("#info1 span").fadeIn();
			$("#triangle-info1, #triangle-info1, #info1-circle, #content-info1").fadeOut();
		  	$(this).removeClass( "blue" );
		}
	});
	$( "#info2" ).click(function() {
		$( "#content-info2" ).css("z-index", 100);
		$( "#info2" ).css("z-index", 100);
		$( "#info1" ).css("z-index", 99);
		$( "#info3" ).css("z-index", 99);
		if ($( "#triangle-info2" ).css("display")=="none"){
		
			$("#info2 span").fadeOut();
			$("#triangle-info2, #content-info2, #info2-circle").fadeIn();
			
			$("#info1 span").fadeIn();
			$("#triangle-info1, #triangle-info1, #info1-circle").fadeOut();
			
			
			$("#info3 span").fadeIn();
			$("#triangle-info3, #triangle-info3, #info3-circle").fadeOut();
			
			$("#content-info1, #content-info3").fadeOut();
			
		  	$("#info1, #info2, #info3").removeClass( "blue" );
		  	$("#info2").addClass( "blue" );
		} else {
			$("#info2 span").fadeIn();
			$("#triangle-info2, #triangle-info2, #info2-circle, #content-info2").fadeOut();
		  	$(this).removeClass( "blue" );
		}
	});
	$( "#info3" ).click(function() {
		$( "#content-info3" ).css("z-index", 100);
		$( "#info3" ).css("z-index", 100);
		$( "#info2" ).css("z-index", 99);
		$( "#info1" ).css("z-index", 99);
		if ($( "#triangle-info3" ).css("display")=="none"){
		
			$("#info3 span").fadeOut();
			$("#triangle-info3, #content-info3, #info3-circle").fadeIn();
			
			$("#info2 span").fadeIn();
			$("#triangle-info2, #triangle-info2, #info2-circle").fadeOut();
			
			
			$("#info1 span").fadeIn();
			$("#triangle-info1, #triangle-info1, #info1-circle").fadeOut();
			
			$("#content-info1, #content-info2").fadeOut();
			
		  	$("#info1, #info2, #info3").removeClass( "blue" );
		  	$("#info3").addClass( "blue" );
		} else {
			$("#info3 span").fadeIn();
			$("#triangle-info3, #triangle-info3, #info3-circle, #content-info3").fadeOut();
		  	$(this).removeClass( "blue" );
		}
	});
	var scroll_ant_window = 0;
	// control de posición de scroll en portada y en home
	$( window ).scroll(function() {
		// en páginas interiores
		//Sticky Menu en páginas de works
		if(  $("body").hasClass("interior")   ){
			if($("body").hasClass("project-details")){
				var st = ($( window ).scrollTop());
				if ((st>315) && (! $(".nav").hasClass("sticky"))){
					$(".nav").hide();
					$(".nav").addClass("sticky");
					$(".nav").addClass("green");
					$(".nav").hide().slideDown(200);
				}
				if ((st<270) && ( $(".nav").hasClass("sticky"))){
					$(".nav").removeClass("sticky");
					$(".nav").removeClass("green");
				}
				$(".nav li a").removeAttr("id");
				var actual = "insight";
				if (st>$("#our-work").offset().top - 156){
					actual = "our-work";
				}
				if (st>$("#impact").offset().top - 156){
					actual = "impact";
				}
				$(".nav a[href='#"+actual+"']").attr("id","anchor-active");
				
			}
		} else {
			// en la home
			if ($(window).scrollTop()!=scroll_ant_window){
				scroll_ant_window = $(window).scrollTop();
			
				if(Modernizr.touch){
					//$("#canvas").hide();
					//clearTimeout(intervalo_touch);
				} else {
					
					//$(".menu-desp").hide();
					$(".bkg-cuadricula .txt-ppal").css("opacity", 0);
					//$("#canvas").hide();
					// espero unos ms parado antes de reposicionar el scroll en la altura correcta
					var pos_vert = $('.bg-panel-0'+(window.controller.pagina)).offset().top -$(window).scrollTop() + $(window).height()/2;
					
					var opacidad_items = (1 - Math.abs(  $('.bg-panel-0'+(window.controller.pagina)).offset().top -$(window).scrollTop() )/ ($(window).height()/2));
					//console.log(opacidad_items);
					$("#canvas, .bkg-cuadricula").css({"top": pos_vert, "opacity": opacidad_items});
				}
				clearTimeout(intervalo);
				intervalo = setTimeout(reposicionaScroll, 100);
				//console.log("mandando reposicionar...")
					
				
				// guardo el valor de scroll por si se usa en el canvas
				window.controller.pos_scroll = $(window).scrollTop();
			}
		}
	});
	var intervalo_touch;
	
	// analizo en qué página ha quedado el scroll en portada y desplazo el scroll de forma que quede bien centrada
	var top_ant =0;
	function reposicionaScroll(){
				//console.log("Reposicionado")
		var top = $(window).scrollTop();
		/*
		if (top_ant!= top){
			if (top_ant-top >50){
				window.controller.pagina--;
			}
			if (top_ant-top <50){
				window.controller.pagina++;
			}
			window.controller.pagina=Math.max(0, window.controller.pagina);
			window.controller.pagina=Math.min(sections_top.length, window.controller.pagina);
			
			panelActual = window.controller.pagina;
			top_ant = top;
			
		}
		*/
		//console.log("window.controller.pagina")
		//console.log(window.controller.pagina);
		var pa = window.controller.pagina;
		var posiciones = sections_top;
		for (var i = posiciones.length -1;  i >= 0; i--) {
				if ( posiciones[i-1] < top ){
					//console.log(top - posiciones[i-1]);
					if( Math.abs(top - posiciones[i-1])+200 >  Math.abs(top - posiciones[i])){
						panelActual = i;
						window.controller.pagina = i;
					} else {
						panelActual = i-1;
						window.controller.pagina = i-1;
					}
					scroll_anterior = -1;
					break;
				}
		}
		
		if (posiciones[i]==undefined){
			panelActual = window.controller.pagina = 0;
			scroll_anterior = -1;
		}
		
		
		
		//console.log("panelActual " + panelActual);
		//console.log(posiciones[i] )
		//console.log("top " + top);
		if(panelActual==6){
			$('.bt-scroll-down').css({bottom:"-100px"});
		} else {
			
			$('.bt-scroll-down').css({bottom:"30px"});
		}
		var fondo_textura = "";
		switch(panelActual){
			case 0:
				fondo_textura = "cuadricula.png";
				break;
			case 1:
				fondo_textura = "n.gif";
				break;
			case 2:
				fondo_textura = "cuadricula.png";
				break;
			case 3:
				fondo_textura = "texture-analysis.png";
				break;
			case 4:
				fondo_textura = "texture-visual.png";
				break;
			case 5:
				fondo_textura = "texture-explain.png";
				break;
			case 6:
				fondo_textura = "texture-communicate.png";
				break;
				
		}// Cambiar después de la migración
		$(".bkg-cuadricula").css("background-image", "url(/wp-content/themes/ingenio/img/" + fondo_textura + ")");
		if (window.controller.pagina != scroll_anterior){
			var scrollYPos = $('.bg-panel-0'+(panelActual)).offset().top;
			TweenMax.to(window, 0.7, {scrollTo:{y:scrollYPos, x:0}, ease:Power4.easeOut});
			scroll_anterior = window.controller.pagina;
		}
		$(".bkg-cuadricula .txt-ppal").css({"display": "none"});
		$(".bkg-cuadricula .txt-ppal.pag-" + window.controller.pagina).css({"opacity": 0, "display": "block"});
		clearTimeout(intervalo2);
		intervalo2 = setTimeout(function () {
			//$("#canvas, .menu-desp").show();
			//$(".menu-desp").show();
			
			$(".bkg-cuadricula .txt-ppal.pag-" + window.controller.pagina).css({"opacity": 0.7, "display": "block"});
		}, 1400);

		var pos_vert = $('.bg-panel-0'+(window.controller.pagina)).offset().top -$(window).scrollTop() + $(window).height()/2;
		var opacidad_items = 1 - Math.abs(  $('.bg-panel-0'+(window.controller.pagina)).offset().top -$(window).scrollTop() )/ ($(window).height()/2);
		
		$("#canvas").css({"top": pos_vert, "opacity": opacidad_items});
		if(pa!=window.controller.pagina){
			//console.log("ocultando canvas");
			window.controller.pagina
			$("#canvas").stop().hide().delay(700).fadeIn(300);
		}
		$(".bkg-cuadricula").css({"top": pos_vert, "opacity": opacidad_items});
		
	}
	
	
	
	// gestión de redimensiones de la ventana
	$( window ).resize(recoloca);
	function recoloca() {
		// recalcula las posiciones de todos los bloques de página
		sections_top = getSectionsTop();
		var prop_canvas = 600/1200;
		var canvas_height = Math.max(640, $(window).width()) * prop_canvas;

		//console.log(canvas_height);
		var mgn = -(canvas_height )/2;
		//console.log(canvas_height);
		var mlft = 0;
		if ($(window).width()<640){
			mlft = ($(window).width()-640)/2;
		}
		// ajusto el margen superior del canvas para que muerda en la cantidad correspondiente
		$("#canvas").css("margin-top", mgn);
		$("#canvas").css("margin-left", mlft);
		
		if ($(window).width()<768){
			es_movil = true;
		} else {
			es_movil = false;
		}
		setupSlider();
	}
	recoloca();
	
	var slider_actual = 1;
	function setupSlider(){
		if ($("#slider-viewport").length){
			$('.slider-buttons li').each(function (a,b){
				$(b).attr("rel", a+1);
			});
			var num_slides = $("#slider-viewport .slider-page").length;
			var ancho_slide = $("#slider-viewport .slider-page").width();
			var espacio_dispo = $(window).width();
			var posicion_correspondiente = espacio_dispo/2 - ancho_slide/2 - ancho_slide*(slider_actual-1);
			$("#slider-viewport .slider-content").css("left",posicion_correspondiente);
			$('.slider-buttons li, .slider-page').removeClass("active").removeClass("selected");
			$($('.slider-buttons li')[slider_actual-1]).addClass("active");
			$($('.slider-page')[slider_actual-1]).addClass("selected");
			
		}
	}
	setupSlider();
	$(document).on('click', '.slider-buttons li', mueveSlider);
	function mueveSlider(e){
		//console.log("moviendo");
		slider_actual = $(e.currentTarget).attr("rel");
		setupSlider();
		//console.log(slider_actual);
	}
	
	
	
	$(document).on('mouseenter', '.menu-desp li a', encima_menu);
	function encima_menu(event){
		
		window.controller.elemento_menu = parseInt($(event.currentTarget).attr("rel"),10);
		$("#canvas2").css("top", $(event.currentTarget).parent().parent().offset().top - $(event.currentTarget).parent().parent().parent().offset().top + 30);

		// console.log(window.controller.elemento_menu);
	}
	function fuera_menu(event){
		window.controller.elemento_menu = 0;
		//console.log(window.controller.elemento_menu);
	}
	
});

	// recalculo el offset de cada página en portada
	function getSectionsTop(){
		if($('.bg-panel-00').length==0){
			return [];
		}
		var posiciones = new Array();
		posiciones.push($('.bg-panel-00').offset().top);
		posiciones.push($('.bg-panel-01').offset().top);
		posiciones.push($('.bg-panel-02').offset().top);
		posiciones.push($('.bg-panel-03').offset().top);
		posiciones.push($('.bg-panel-04').offset().top);
		posiciones.push($('.bg-panel-05').offset().top);
		posiciones.push($('.bg-panel-06').offset().top);
		return posiciones;
	}
	
// controlador de scroll desde el canvas
window.controller ={};
window.controller.pos_scroll = 0;
window.controller.pagina = 0;
