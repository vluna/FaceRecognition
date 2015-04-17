/*
*
* This file will load picture chosen by the user and the video from the canvas and it will conmpare them how similar they ar
*
*/

'use strict';

// Boolean expression used to control some features in the application
var vidPause = false,
    vidStart = false,
    trackStart = false,
    imgLoaded = false;


// When the window is ready it will run the canvas and start the face detection
window.onload = function() 
{
    // Declare the canvas for the video
    var video = document.getElementById('videoel'),
        overlay = document.getElementById('overlay'),
        overlayContext = overlay.getContext('2d');
    
    // Loads the rectangle were your face is supposed to be
    var posFace = new Image();
    posFace.src = 'face_rect_blue.png';
    posFace.onload = function()
    {
        overlayContext.drawImage(posFace, 0, 0);
    }

    // Declare the canvas for the image
    var cc2 = document.getElementById('image').getContext('2d'),
        overlay2 = document.getElementById('overlayAgent'),
        overlayCC2 = overlay2.getContext('2d');
    
    // Declare and initialize the tracker for the video
    var trackVideo = new clm.tracker({ useWebGL : true });
    trackVideo.init(pModel);

    // Declare and initialize the tracker for the image
    var trackImage = new clm.tracker({ useWebGL : true });
    trackImage.init(pModel);
    
    // This function will enable the start and pause button 
    function enablestart() 
    {
        var startbutton = document.getElementById('startbutton');
        var pausebutton = document.getElementById('pausebutton');
        vidStart = true;
    }

    // Get the navigator user Media
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;
    
    // Set the video to true
    var videoSelector = { video : true };
    
    // Play the video if video is available from the webcam
    navigator.getUserMedia(videoSelector, function( stream ) {
        video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
        video.play();
        }, function() {});

    // Run the video
    video.addEventListener('canplay', enablestart, false);
    
    // This function will update the tracking
    function drawLoop() 
    {
        requestAnimationFrame(drawLoop);

        // Clear the context and load a new face to track the video
        overlayContext.clearRect(0, 0, 400, 300);
        if (trackVideo.getCurrentPosition()) 
        {
            overlayContext.drawImage(posFace, 0, 0);
            trackVideo.draw(overlay);
        }

        // Clear the context and load a new face to track the image
        overlayCC2.clearRect(0, 0, 320, 240);
        if (trackImage.getCurrentPosition()) 
        {
            trackImage.draw(overlay2);
        }
    }

    // This function will setup the controls that we need inorder to load the image and start the application 
    var Tracker = function() 
    {
        // Part of our UI feature showing "where the information is ocming from"
        this.Load = 'sudo launchctl load -w /System/Library/Launch/S.I.A.T.I.S.';

        // Loads the image from the web
        this.LoadImage = function() 
        {
            var url = window.prompt('Enter image url');
            var imgAgent = new Image();
            imgAgent.crossOrigin = true;
            imgAgent.onload = function() 
            {
                // Scales image to fit the canvas
                if (imgAgent.height > 240 || imgAgent.width > 320) 
                {
                    var rel = imgAgent.height/imgAgent.width;
                    var neww = 300;
                    var newh = neww*rel;
                    if (newh > 200) 
                    {
                        newh = 200;
                        neww = newh/rel;
                    }
                }

                // Deckare and initialize the image canvas and context
                var cc2 = document.getElementById('image');
                var cc2context = cc2.getContext('2d');

                // Draw image we just load
                cc2context.clearRect(0,0, 320,240);
                cc2context.drawImage(imgAgent,0, 0, neww, newh);
            };
            // Display message if the image was sucessfuly loaded
            imgLoaded = true;
            if(imgLoaded) { document.getElementById('positions').innerHTML = "Image Loaded"; }
            imgAgent.src = 'http://www.corsproxy.com/' + url.substr(url.indexOf('//') + 2);
        };

        // Start the tracker
        this.StartTracking = function() 
        {
            // Excpetion error, if video has not beein initialized throw error
            try 
            { 
                if(!vidStart) 
                { 
                    throw "Initialize the video before proceeding"; 
                }
            } 
            catch(err) 
            { 
                alert(err) 
            }

            // Starts the video
            video.play();

            // Starts the tracking
            trackImage.start(document.getElementById('image'));
            trackVideo.start(video);

            // Starts the loop to draw the face
            drawLoop();

            // vidPause to false to show the Tracking process
            vidPause = false;
            trackStart = true;
            document.getElementById('positions').innerHTML = "Tracking....";
        }
        // Displays the percentage
        this.GetResults = function() 
        {
            try 
            { 
                // Excpetion error, if video has not beein initialized throw error
                if(!vidStart)
                {
                    throw "Initialize the video before proceeding"; 
                }

                // Excpetion error, if image has not beein initialized throw error
                if(!imgLoaded) 
                { 
                    throw "Please load an image to proceed with the comparision"; 
                }

                // If tracker has not started
                if(!trackStart)
                {
                    throw "Please start the tracking before comparing"
                }
            } 
            catch(err) 
            { 
                alert(err) 
            }

            // Pauses the video
            vidPause = true;
            video.pause();

            // Starts to make the comparision
            positionRatio();
        }
    };

    // This function will make the comparision between the image and the video
    function positionRatio()
    {
        requestAnimationFrame(positionRatio);

        // Points that we will compare
        var points = [30, 28, 23, 28, 35, 39, 33, 62, 7, 33, 19, 22, 19, 15, 60, 57, 57, 53];

        var absoluteValue = 0;

        // Get the position of the points
        var positions = trackVideo.getCurrentPosition();
        var positions2 = trackImage.getCurrentPosition();

        // If positions have a value execute the for lopp
        if (positions && positions2) 
        {
            //var scale = ((positions[7][1] - positions[21][1]) + (positions[13][0] - positions[1][0])) - (((positions[7][1] - positions[21][1]) + (positions[13][0] - positions[1][0])) - ((positions2[7][1] - positions2[21][1]) + (positions2[13][0] - positions2[1][0])));

            // This for loop will iterate through each point and compare the distance between image and video
            for(var i = 0; i < 18; i+=2)
            {   
                // First point x and y
                var p1x = positions[points[i]][0].toFixed(2);
                var p1y = positions[points[i]][1].toFixed(2);

                // Second point x and y
                var p2x = positions[points[i+1]][0].toFixed(2);
                var p2y = positions[points[i+1]][1].toFixed(2);

                // Third point x and y
                var p3x = positions2[points[i]][0].toFixed(2);
                var p3y = positions2[points[i]][1].toFixed(2);

                // Fourth point x and y
                var p4x = positions2[points[i+1]][0].toFixed(2);
                var p4y = positions2[points[i+1]][1].toFixed(2);
                    
                // Gets the distance between the two points using Pitagoras Theorem distance formula
                var dist1 = Math.sqrt((Math.pow(p2x - p1x),2) + Math.pow((p2y - p1y),2));
                var dist2 = Math.sqrt((Math.pow(p4x - p3x),2) + Math.pow((p4y - p3y),2));

                // Get the difference between two distances
                var difference = Math.max(dist1, dist2) - Math.min(dist1, dist2);
                
                // Absolute value will add up each one of the point differences
                absoluteValue += difference;
            }

            // Converts the value to percentage escaling them between 1 - 100
            if(absoluteValue > 100) { absoluteValue = 100; } else if(absoluteValue < 0){ absoluteValue = 0; }
            var percentage = ((absoluteValue * 100) / 100) - 10;
        }

        // Prints the status of the tracking on the screen
        if(vidPause == true) 
        {
            document.getElementById('positions').innerHTML = percentage.toFixed(0) + " %";
        }
        else
        {
            document.getElementById('positions').innerHTML = "Tracking....";
        }
    }

    // Dat gui setup controlers
    var tracker = new Tracker('dat.gui'),
        gui = new dat.GUI();
    
    gui.add(tracker, 'Load');
    gui.add(tracker, 'LoadImage'); 
    gui.add(tracker, 'StartTracking');  
    gui.add(tracker, 'GetResults');
}

