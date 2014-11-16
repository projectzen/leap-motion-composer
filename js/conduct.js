function conduct(frame) {
    console.log("look ma I'm getting run");
}

conductController = new Leap.Controller({
  frameEventName: 'animationFrame',
  useAllPlugins: true
});

conductController.connect();

conductController.on('frame', function(frame) {
    console.log("3");
});
