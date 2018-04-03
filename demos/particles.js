document.addEventListener("DOMContentLoaded", function(event) {
    const fw = require('./../fw/main');
    let manager = fw.particles.ParticleSystemManager();
    let c = {x:300, y:300};
    manager.addParticleSystem(c, {
		speedmean: .1, speedstdev: 0.04,
		lifetimemean: 2000,lifetimestdev: 1000,
		sizemean: 5, sizestdev: 0,
        fill: 'rgba(0, 255, 255, 0.75)',
        stroke: 'rgba(0, 255, 0, 0.5)',
        image: '../textures/fire.png',
        rate: 5, // If rate is undefined, it will use amount
        amount: 1000,
        style: 'circle',
        //angleOffset: Math.PI/8*3,
        //angleTotal: Math.PI/4,
        imagedHeight: 20,
        imagedWidth: 20
    });

    // function myTimer() {
    //     c.y = (c.y - 2);
    //     if(c.y<0)c.y=1000;
    // }
    
    // var myVar = setInterval(myTimer, 50);

    function gameLoop(time) {
        var elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;
        
        // console.log(elapsedTime);
        fw.graphics.clear();
        manager.update(elapsedTime);
        manager.render();
        requestAnimationFrame(gameLoop);
    }
    
    var lastTimeStamp = performance.now();
    gameLoop(lastTimeStamp);
});