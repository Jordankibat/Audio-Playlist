// html5media enables <video> and <audio> tags in all major browsers
// External File: http://api.html5media.info/1.1.8/html5media.min.js


// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = '',
            extension = '',
            tracks = [
                               {
                "track": 1,
                "name": "Afternoon on You",
                "length": "2:08",
                "file": "Afternoon_on_you"
            },
				
			{
                "track": 2,
                "name": "Traffic Patterns",
                "length": "3:53",
                "file": "Escape_Velocity"
            },	
				
				
            {
                "track": 3,
                "name": "1 of those nights",
                "length": "4:47",
                "file": "Just_One_of_Those_Nights"
            },
                      {
                "track": 4,
                "name": "Meant to Be Left Alone",
                "length": "3:50",
                "file": "Meant_To_Be_Left_Alone"
            }, 
				{
                "track": 5,
                "name": "Nighttime Sleigh ride",
                "length": "2:26",
                "file": "Nighttime_Sleighride"
            }, 
				{
                "track": 6,
                "name": "Sleeping In",
                "length": "1:01",
                "file": "Sleeping_In"
            }, 
          
				
			{
                "track": 7,
                "name": "100 Year Hatch",
                "length": "1:46",
                "file": "100_Year_Hatch"
            },	
				
				
            {
                "track": 8,
                "name": "Gypsy Wagon",
                "length": "2:53",
                "file": "Gypsy_Wagon"
            },
                      {
                "track": 9,
                "name": "Black Island Rising",
                "length": "2:25",
                "file": "Black_Island_Rising"
            }, 
				{
                "track": 10,
                "name": "The Drifts Are Coming",
                "length": "1:07",
                "file": "The_Drifts_Are_Coming"
            }, 
				{
                "track": 11,
                "name": "Walkin'",
                "length": "3:59",
                "file": "Walkin"
            }, 
				{
                "track": 12,
                "name": "Live, Learn, Forget.",
                "length": "3:22",
                "file": "LiveLearnForget"
            }, 
				{
                "track": 13,
                 "name": "A Few Friends",
                "length": "3:13",
                "file": "A_Few_Friends"
            }, 
				{
                "track": 14,
                 "name": "Warm Holiday Table",
                "length": "1:04",
                "file": "Warm_Holiday_Table"
            }, 
				
				{
                "track": 15,
                "name": "Teen Wolf 2'n",
                "length": "4:13",
                "file": "Teen_Wolf_2n"
            },
				{
                "track": 16,
                 "name": "What's it to ya?",
                "length": "2:59",
                "file": "WhatsItToYa"
            }, 
				{
                "track": 17,
                 "name": "Pursuit of Happiness",
                "length": "2:57",
                "file": "Pursuit_Of_Happiness"
            }, 
				
				{
                "track": 18,
                "name": "Chains",
                "length": "4:36",
                "file": "Chains"
            },
			],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackLength = value.length;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                } else {
                    trackNumber = '' + trackNumber;
                }
                $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).bind('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});
