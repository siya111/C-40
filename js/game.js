class Game{
    constructor(){
      
    }
    
    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data){
            gameState = data.val();
        }) 
    }
 
    update(state){
        database.ref('/').update({
            gameState:state
        })
    }

    async start(){
       if(gameState === 0){
           player = new Player();
           var playerCountRef = await database.ref('playerCount').once("value");
           if(playerCountRef.exists()){
               playerCount = playerCountRef.val();
               player.getCount();
             }
           
           form = new Form();
           form.display();
       } 
       car1 = createSprite(100,200);
       car1.addImage("car1",car1img);

       car2 = createSprite(300,200);
       car2.addImage("car2",car2img);

       car3 = createSprite(500,200);
       car3.addImage("car3",car3img);

       car4 = createSprite(700,200);
       car4.addImage("car4",car4img);

       cars = [car1,car2,car3,car4];
    }
    
    play(){
        form.hide();
        
        Player.getPlayerInfo();
        player.getCarsAtEnd();
        
        if(allPlayers !== undefined){
            background("white");
            image(track,0,-displayHeight*4,displayWidth,displayHeight*5);

            var index = 0;
            var x =200;
            var y;

            for(var plr in allPlayers){
                 
                // add one to the index for every loop 
                
                index = index+1;
                
                // position the cars little away from each other in x direction

                x = x+175;

               // use data from the database to display the cars in y direction

               y = displayHeight - allPlayers[plr].distance;
               cars[index-1].x = x;
               cars[index-1].y = y;

               if(index === player.index){
                   fill(255,102,178);
                   ellipse(x,y,100,100);
                   camera.position.x = displayWidth/2;
                   camera.position.y = cars[index-1].y;
                   cars[index-1].shapeColor = "purple";
               }
            }    
        } 
        if(keyIsDown(UP_ARROW) && player.index !== null){
            player.distance += 10;
            player.update();
        }

        if(player.distance > 3500){
            gameState = 2;
            player.rank += 1;
            Player.updateCarsAtEnd(player.rank);
        }

        drawSprites();
    }

    end(){
        console.log("game ended");
        console.log(player.rank);
    }
}