class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){

      question.hide();

      background("black");

      textSize(22);

      fill("yellow");

      text("Result of the Quiz", 200, 300);

      Contestant.getPlayerInfo();

      if(allContestants!== undefined){

        var ypos = 230;

        textSize(14);

        fill("blue");

        text("*NOTE : Contestants who answered correctly are highlighted with Green Color whereas who did it wrong are highlighted with Red Color", 10, 100)

        for(var plr in allContestants){

          var correctAns = "2";
    
          if(correctAns === allContestants[plr].answer)
    
            fill("green");
    
            else
    
            fill("red");

            ypos = ypos+30;

            textSize(22);

            text(allContestants[plr].name + ":" + allContestants[plr].answer, 300, ypos);
    
        }

      }
    
  }

}
