class Form{
    constructor(){
       this.input = createInput('Name');
       this.button = createButton('Play');
       this.greeting = createElement('H1');
    }

    hide(){
        this.input.hide();
        this.button.hide();
        this.greeting.hide();
    }

    display(){
         var title = createElement('H1');
         title.html("Racing Cars");
         title.position(displayWidth/2 - 20,0);

         this.input.position(displayWidth/2 -40, displayHeight/2 -60);

         this.button.position(displayWidth/2 +40, displayHeight/2 );
         this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();

            player.name = this.input.value();
            playerCount += 1;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);

            this.greeting.html("Welcome "+ player.name);
            this.greeting.position(displayWidth/2 -40, displayHeight/2 -60);
        });

       
    }
}