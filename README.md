# photo-sketch
A Lightweight simple JavaScript library to have a set of tools to draw, add photo, rotate, and download canvas elements. 
### Overview
This simple JS library lets you to create a few tools to edit HTML canvas elements. The functions include:
* Draw
* Change pen size
* Change pen colour
* Discard/Clean
* Set a file input to take image files and draw image on canvas
* Rotate clockwise
* Get Data URL of annotated image (for download or other uses)

### Prerequisites
This library required jQuery to function

### Usage Example
```html
<html>
    <head>
    <style>
    .colour {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        border: 1px solid;
        float: left;
    }
    </style>
    </head>
    <body>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script src="photo-sketch.js"></script>
        <script type="text/javascript">
            var myCanvas = false;
            $(function() {
                myCanvas = new Canvas('my-canvas');
                myCanvas.setImgInput('file');
            });
        </script>
        <canvas id="my-canvas" width="400" height="400" ></canvas>
        <span class="btn-file">
            Browse File <input type="file" id="file" />
        </span>
        <!-- change colours -->
        <div class="colour" id="green" onclick="myCanvas.changeColour('green')"></div>
        <div class="colour" id="red" onclick="myCanvas.changeColour('#FF0000')"></div>
        <div class="colour" id="yellow" onclick="myCanvas.changeColour('yellow')"></div>
        <div class="colour" id="white" onclick="myCanvas.changeColour('white')"></div>


        <!-- change size -->
        <button onclick="myCanvas.changeSize(1)">Thin</button>
        <button onclick="myCanvas.changeSize(5)">Medium</button>
        <button onclick="myCanvas.changeSize(10)">Thick</button>

        <!-- other functions -->
        <input type="button" value="Clear" onclick="myCanvas.discard()" />
        <input type="button" value="Rotate" onclick="myCanvas.rotateClockwise()" />
        <input type="button" value="Data URL" onclick="alert(myCanvas.getDataURL());" />
    </body>
</html>
```
