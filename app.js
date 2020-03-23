const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Mplayer = require('mplayer');


const player = new Mplayer();


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', function(req,res){
    const playing = player.status.playing;
    if(playing){
        res.render('main', {status: 'Playing!'});
    } else {
        res.render('main', {status: 'Stopped!'});
    }
});

app.post('/', function(req,res){
    const button = req.body.button;
    switch(button){
        case 'play':
            player.openFile('rain.mp3');
            break;
        case 'stop':
            player.stop();
            break;
        case 'pause':
            player.pause();
            break;
    }
    res.render('main', {status: player.status.playing})
});


app.listen(3000, function(req,res){
    console.log('Server up and running on port 3000');
}); 