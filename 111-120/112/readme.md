**JS Quick Hit: Creating Elements**

Video URL: https://youtu.be/lv945qGRDrI

Sometimes it's necessary to create a brand new HTML element (for example, a `div` tag), and insert it into an existing document. That's easy to do with JavaScript, so let's quickly run through how to do it. We'll start with an existing HTML document, like this:

```
<!doctype html>
<html>
  <head>
    <title>DOM Insertion Example</title>
    <style type="text/css">
      #box1 { width: 400px; height: 400px; margin-bottom: 30px; background-color: #CCFFFF; padding: 30px; }
      #box2 { width: 400px; height: 400px; margin-bottom: 30px; background-color: #FFCCFF; padding: 30px; }
      #box3 { width: 400px; height: 400px; margin-bottom: 30px; background-color: #FFFFCC; padding: 30px; }
      .test-class { color: #FFFFFF; }
    </style>
  </head>
  <body>
    <div id="box1">Box 1</div>
    <div id="box2">Box 2</div>
    <div id="box3">Box 3</div>
  </body>
<script>
// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function() {

});
</script>
</html>
```

From here, we're going to create another small box. Then we're going to insert it inside box 2. Ready? Let's DO THIS. All of this code should go inside the event listener that we've already defined. First, create the element like this:

```
  const newBox = document.createElement('div');
  newBox.innerText = 'Box 4';
  newBox.style = 'width: 200px; height: 200px; padding: 30px; background-color: #0000CC';
```

As you can see, we're giving this box some inner text and setting some styles programmatically. If you wanted to do that with classes instead of inline styles (and in a real app you definitely would), you can add a class like this:

```
  newBox.classList.add('test-class');
```

That'll turn our text white and make it easier to see on the dark blue background. Hooray! Now we need to insert that new box into box number two. Fortunately, that, too, is super easy. Here's how to do it:

```
  const box2 = document.getElementById('box2');
  box2.appendChild(newBox);
```

That's it! You've put a blue box inside the pink one. Simple, right? There is one small catch though. Each element you create is unique, so you can't, for example, loop over the three original boxes and put a blue box in each one just by using the `box2` element. So, for example, this code:

```
  const newBox2 = document.createElement('div');
  newBox2.innerText = 'White Box';
  newBox2.style = 'width: 100px; height: 100px; padding: 30px; background-color: #FFFFFF';

  const boxes = document.querySelectorAll('div');
  boxes.forEach(box => {
    box.appendChild(newBox2);
  });
```

Is only going to put a white box down inside Box 3, because that's the final box in the DOM tree. So basically what it does is very rapidly (faster than the browser even refreshes) moves the white box through each of the other boxes, until it comes to rest in the last one.

So, that's it. Creating elements and appending them to other elements. Simple stuff, but definitely valuable.

See you next week!

_Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe)._
