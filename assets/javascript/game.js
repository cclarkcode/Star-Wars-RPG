
//Save character divs to bring back on game restart
var div1 = $("#obiwan");
var div2 = $("#luke");
var div3 = $("#sidious");
var div4 = $("#maul");


var game = {
	//Game characters as objects
	luke: {
		attack: 15,
		counterattack: 5,
		hp: 100

	},
	obiwan: {
		attack: 10,
		counterattack: 10,
		hp: 120
	},
	maul: {
		attack: 5,
		counterattack: 25,
		hp: 180
	},
	sidious: {
		attack: 8,
		counterattack: 30,
		hp: 150
	},
	//Game variables
	attacklevel: 1,
	charchosen: false,
	charname: "",
	enemychosen: false,
	enemyname: "",
	firstfight: true,
	enemiesleft: 3,


	//Game methods
	//Move player character div
	chooseplayer: function(char) {

		game.charchosen=true;
		game.charname=char;
		var element = $("#" + game.charname);
		element.remove();

		$(".yourcharacter").html("<h2>Your Character</h2>").append(element);

		//Move enemes to enemy list.
		var leftovers = $(".char-container").children(".character");
		leftovers.remove();
		$(".enemiesleft").html("<h2>Choose your enemy</h2>").append(leftovers);
		game.firstfight=false;



	},

	//Move enemy div and also take remaining characters to new home
	chooseenemy: function(char) {
		game.enemychosen=true;
		game.enemyname=char;
		var element = $("#" + game.enemyname);
		element.remove();
		
		$(".currentenemy").html("<h2>Defender</h2>").append(element);
		$("#attack").css("display","inline").prop("disabled",false);
		game.enemiesleft--;
		if(game.enemiesleft > 0) {
			$(".enemiesleft").find("h2").replaceWith("<h2>Enemies Left</h2>");
		}		
		else {
			$(".enemiesleft").html("");
		}
		
	},

	attack: function() {

		var you = game[game.charname];
		var enemy = game[game.enemyname];

		// Make sure there is a valid enemy
		$("#attack").prop("disabled",true);

		if (game.enemychosen) {

			//Calculate user attack
			enemy.hp = enemy.hp - (you.attack * game.attacklevel);
			$("#attackbanner").html("You hit " + $(".currentenemy").find(".name").text() + " for " + (you.attack * game.attacklevel) + " damage.")

			//Level up attack
			game.attacklevel++;

			//Check if enemy defeated
			if (enemy.hp <=0 ) {
				

				//Check if all enemies defeated
				if (game.enemiesleft > 0) {
					setTimeout( function() {
						$("#" + game.enemyname + "hp").html("0");
						$("#attackbanner").append(".. He is defeated. Choose a new enemy.");
						$("#" + game.enemyname).remove();
					}, 500);
					
					game.enemychosen=false;
				}
				//Display game win and restart button
				else {
					setTimeout( function() {
					$("#" + game.enemyname + "hp").html("0");
					$("#attackbanner").append(".. He is defeated. You have defeated all enemies. Congratulations, you win!");
					$("#" + game.enemyname).remove();
					$("#restart").css("display", "inline")
				} , 500);
					
				}
			}
		
			//Calculate counter attack
			else {
				$("#" + game.enemyname + "hp").html(enemy.hp);
				you.hp = you.hp - enemy.counterattack;
				setTimeout( function() {
					$("#attackbanner").append(" He counter-attacked for " + enemy.counterattack + " damage.");
					// Check if user defeated and display restart button
					if (you.hp <=0) {
						$("#attackbanner").append(" . You have been deafeated. Please try again!")
						
						$("#" + game.charname + "hp").html("0");
						$("#restart").css("display","inline");
						}
					else {
						$("#" + game.charname + "hp").html(you.hp);
						$("#attack").prop("disabled",false);
					}

				}, 500);	
				
				

			}

		}

	},

	restart: function() {

		//Put character divs back in original container

		$(".yourcharacter").html("<h2>Choose Your Character</h2>");
		$(".char-container").append(div1).append(div2).append(div3).append(div4);
		$("#attackbanner").html("");

		//Reset all necessary game variables
		game.attacklevel = 1;
		game.charchosen = false;
		game.charname = "";
		game.enemychosen = false;
		game.enemyname = "";
		game.enemiesleft = 3;

		//Restore hp and correct character div
		game.luke.hp = 100;
		$("#lukehp").html(game.luke.hp);
		game.obiwan.hp = 120;
		$("#obiwanhp").html(game.obiwan.hp);
		game.maul.hp = 180;
		$("#maulhp").html(game.maul.hp);
		game.sidious.hp = 150;
		$("#sidioushp").html(game.sidious.hp);

		$("#restart").css("display", "none");
		$("#attack").css("display", "none");
		$(".currentenemy").html("");
		$(".enemiesleft").html("");
	},

	characterdisplay: function(character) {
		$("#" + character).find(".charimg").css("opacity" , ".5");
		var stats = $("<div/>");
		stats.addClass("over");
		stats.html("<h3> Attack Power: " + game[character].attack).append("<h3> Counter-Attack: " + game[character].counterattack)
		stats.append("<h3> Hit Points: " + game[character].hp);
		stats.css("postion","absolute").css("left","20px").css("top","20px").css("color","green").css("line-height","1.5");
		$("#" + character).find(".image").append(stats);
	},

	displayremoval: function(character) {
		$("#" + character).find(".charimg").css("opacity" , "1");
		$("#" + character).find(".over").remove();
	}
}

$(".char-container").on("click", ".character", function() {

	game.chooseplayer(this.id);

});

$(".enemiesleft").on("click", ".character", function(){


	if (!game.enemychosen) {
		game.chooseenemy(this.id);

	}
	else {
		alert('You already have an enemy selected. Defeat him to contine to a new enemy');
	}
});

// $("0").on("click", function() {

// 	alert('hello');

// 	if(!game.enemychosen) {
// 		game.chooseenemy(this.id);
// 	}
// 	else {
// 		alert ('You already have an enemy selected. Defeat him to continue to a new enemy.');
// 	}
// });

$("#attack").on("click", function()  {

	if(game.enemychosen) {
		game.attack();


	}

});

$("#restart").on("click", function(){
	game.restart();

})
$(".container").on("mouseenter",".character", function() {
	game.characterdisplay(this.id);
});
$(".container").on("mouseleave", ".character", function() {
	game.displayremoval(this.id);
});
	

