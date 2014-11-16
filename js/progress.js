var circle = new ProgressBar.Circle('#progress-circle', {
    color: '#FCB03C',
    strokeWidth: 2,
    fill: '#aaa' //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
});

circle.animate(1, function() {
    circle.animate(0);
})

