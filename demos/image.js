document.addEventListener("DOMContentLoaded", function(event) {
    const fw = require('../fw/main');

    var i = fw.graphics.Img('https://cnet1.cbsistatic.com/img/_hQqXhr3_GT2VJK36JhNq-QAcMQ=/1600x900/2016/11/22/92ef90df-13ae-4cdc-949e-035eac407727/brgavinshaw.jpg');
    var rot = 0;
    
    function gameLoop(time) {
        var elapsedTime = time - lastTimeStamp;
        rot += 30 * (elapsedTime / 1000);
        lastTimeStamp = time;
        
        fw.graphics.clear();
        fw.graphics.drawImage({
            image: i,
            dx: 100,
            dy: 100,
            dWidth: 1000,
            dHeight: 300,
            rotation: rot
        });
        
        requestAnimationFrame(gameLoop);
    }
    
    var lastTimeStamp = performance.now();
    gameLoop(lastTimeStamp);
});