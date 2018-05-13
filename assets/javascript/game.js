$(document).ready(function () {

    var character= {
        name: ["Gimli", "Legolas", "Gollum", "Lurtz"],
        health: [140, 125, 115, 135],
        attack: [4,5,4,5],
        counter: [17,6,5,18],
        team: [1,1,1,1],  //3 possible teams: 1- available characters, 2- selected hero, 3- active enemy
        images: ["assets/images/gimli.jpg", "assets/images/legolas.jpg", "assets/images/gollum.jpg", "assets/images/lurtz.jpg"]
    }

    //global variables don't reset between games
    var wins=0;
    var losses=0;    
    var attackPower= 0;  
    
    
    $("#battleResults").hide();
    $("#vs").hide();
    $("#scorecard").hide();
    $("#button").hide();    
    $("#choose").html("Welcome to Lego LOTR Battle Royale!");
    $("#button2").click(function(){        
        gameStart();
    });       
       
        function gameStart(){
        //for loop creates and displays each character, and assigns data to each one
        
        var charDisplay = $("#charDisplay");
        charDisplay.html("");
        for (var i = 0; i< character.name.length; i++){
           
           var imageCharacter = $("<img>");
           var charDisplay = $("#charDisplay");

           imageCharacter.addClass("character pointer");          
           imageCharacter.attr("src", character.images[i]);
           imageCharacter.attr("data-healthValue", character.health[i]);
           imageCharacter.attr("data-attackValue", character.attack[i]);
           imageCharacter.attr("data-counterValue", character.counter[i]);
           imageCharacter.attr("data-name", character.name[i]);
           imageCharacter.attr("data-team", character.team[i]); 
           charDisplay.append(imageCharacter);
           
        }
                         
            var charName= "";
            var charHealth= "";
            var charAttack= "";
            var enemyName= "";
            var enemyHealth= "";
            var enemyCounter= "";
            var charTeam="";
            var charPopulated= false;
            var enemyPopulated= false; 
            var battleNum=0;
            
             $("#scorecard").html("wins: " + wins + "<br>losses: " + losses);
             $("#vs").hide();          
             $("#button").hide();
             $("#button2").hide();
             $("#battleResults").hide();
             $("#scorecard").show();
             $("#choose").html("Choose your Hero");
           
            chooseHero(); 
            
            function chooseHero(){ 
            charDisplay.on("click", ".character", function(){   
            
            if (!charPopulated && $(this).attr("data-team") == 1){   //if there is a character already, nothing will happen on clicking
            
            $(this).attr("data-team", 2); //sets clicked character to "team 2"  
            charTeam= ($(this).attr("data-team"));
            
                  
            $(this).addClass("chosen");
            
             charName=($(this).attr("data-name"));
             charHealth=($(this).attr("data-healthValue"));
             charAttack=($(this).attr("data-attackValue"));

            charHealth= parseInt(charHealth);
            charAttack= parseInt(charAttack);                 

            $("#choose").html("Now choose character to fight");
            $("#choose").show(); 

            charPopulated = true;
            chooseEnemy();
            }; //end if checking that hero is not already populated, and clicked character is available
        }); //end click function choosing hero
    };  //end function chooseHero



        function chooseEnemy(){
        charDisplay.on("click", ".character", function(){ 
            
            if(!enemyPopulated && $(this).attr("data-team") == 1){  //only non chosen character will become enemy

                
             enemyName=($(this).attr("data-name"));
             enemyHealth=($(this).attr("data-healthValue"));
             enemyCounter=($(this).attr("data-counterValue")); 
             imageCharacter=($(this).attr("src"));


             enemyHealth= parseInt(enemyHealth);
             enemyCounter= parseInt(enemyCounter);

             $(this).attr("data-team", 3); //sets clicked character to "team 3" 
             
             $(".enemy").addClass("dead").removeClass("enemy");
             $(this).addClass("enemy");
             $("#vs").show(); 
             enemyPopulated = true;

             $("#battleInfo1").html(charName + " HP: " + charHealth);
             $("#battleInfo2").html(enemyName + " HP: " + enemyHealth);
             $("#battleInfo1").show();
             $("#battleInfo2").show();

             $("#choose").html("Now fight");
             $("#choose").show(); 

             battle()
                 }
             });
            }         
            
            function battle(){                      

                $("#button").show();  
                $("#button").on("click", function(e){
                    
                    e.stopImmediatePropagation(); //had to consult my brother in law on this one, function was running multiple times before
                    if(charPopulated && enemyPopulated){
                    
                    attackPower+= charAttack;  
                    charHealth-= enemyCounter;
                    enemyHealth-= attackPower;                    

                    $("#battleResults").show();
                    $("#battleResults").html(charName + " hits " + enemyName + " for " + attackPower + 
                    " damage <br> and " + enemyName + " counters for " + enemyCounter + " damage!");
                    $("#battleInfo1").html(charName + " HP: " + charHealth);
                    $("#battleInfo2").html(enemyName + " HP: " + enemyHealth);

                    

                    
                    
                    
                    if (charHealth <= 0){  //if hero dies, reset game
                        
                        losses++;
                        $("#scorecard").html("wins: " + wins + "<br>losses: " + losses);
                        $("#choose").html("You Lose!");
                        $("#choose").show();
                        $("#button").hide();
                        $("#button2").html("Click to play again")
                        $("#button2").show();
                        $("#button2").click(function(){

                            $(charDisplay).empty();                     
                            $("#battleInfo1").hide();
                            $("#battleInfo2").hide();
                            attackPower= 0;
                            charPopulated= false;
                            enemyPopulated= false;
                            gameStart();
                        });
                    }

                    if (enemyHealth <= 0 && charHealth > 0){
                    
                        $("#choose").html("Good job, select the next victim!");
                        $("#choose").show();
                    
                        enemyPopulated= false;

                        battleNum++;

                            if(battleNum===3){  //checks to make sure 3rd character is defeated, wins and resets game
                                wins++;
                                $("#scorecard").html("wins: " + wins + "<br>losses: " + losses);
                                $("#scorecard").show();
                                $("#choose").html("You Win!");

                                $("#choose").show();
                                $(charDisplay).empty();                                           
                                $("#battleInfo1").hide();
                                $("#battleInfo2").hide();
                                 attackPower= 0;
                                 charPopulated= false;
                                 enemyPopulated= false;
                                 $("#vs").hide(); 
                                 battleNum=0;     

                                 $("#button2").html("Click to play again")
                                 $("#button2").show();
                                 $("#button2").click(function(){
                                 gameStart();
                                 });
                            }
                            else {                                  
                            chooseEnemy();}

                    }// end if statement checking enemy health

                } // if statement checks if char and enemy are populated   

                }); //attack button
 
             }// function battle


    }//end function gameStart

  
});  //end document ready