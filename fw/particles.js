document.addEventListener("DOMContentLoaded", function(event) {
//    const fw = require('./main');
    let particleSystem = ParticleSystem({
		centerx: 300, centery: 300,
		speedmean: .07, speedstdev: 0.025,
		lifetimemean: 2000,lifetimestdev: 1000,
		sizemean: 5, sizestdev: 0,
        fill: 'rgba(0, 255, 255, 0.75)',
        stroke: 'rgba(0, 255, 0, 0.5)',
        image: '../textures/fire.png',
        rate: 1,
        style: 'circle',
        angleOffset: Math.PI/8*3,
        angleTotal: Math.PI/4,
//        imagedHeight: 10,
//        imagedWidth: 10
    });

    function gameLoop(time) {
        var elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;
        
        console.log(elapsedTime);
        clear();
        particleSystem.update(elapsedTime);
        particleSystem.render();
        requestAnimationFrame(gameLoop);
    }
    
    var lastTimeStamp = performance.now();
    gameLoop(lastTimeStamp);
});