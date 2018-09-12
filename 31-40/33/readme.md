**JS Quick Hit: Packaging the Node Module**

Video URL: https://youtu.be/KW4I8LXHLuw

All right, we've got our code written. We've imported our module into a test file and proven that, yes, it does what we expect it to do. Now it's time to package this thing up. We're going to start with getting the package ready, and then I'll explain how to get it up onto NPM.

First, open a command prompt or terminal window, `cd` to the directory in which your module lives, and type the following:

```
npm init
```

This is going to ask you a bunch of questions. Let's step through them quickly. Don't worry if you screw up (typo, accidentally hit enter, whatever) because you can change the file it's going to generate later.

  1. **Package Name:** let's go with `closebrace-test` plus a name of your choice that should prevent name conflicts, such as first initial, last name. So, for me, it's `closebrace-test-cbuecheler`.
  2. **Version:** the suggested `1.0.0` seems fine. You can just hit enter for that.
  3. **Description:** something along the lines of `A simple module that sorts arrays of objects by key in ascending or descending order.`
  4. **Entry Point:** `index.js` is correct. Just hit enter.
  5. **Test Command:** `node test.js`
  6. **Git Repository:** just hit enter to leave this blank, or if you have a git repo for this project, you can add it.
  7. **Keywords:** Single word values separated with spaces go here. I'd go with `test`, `array`, `sort`, `no-dependencies`
  8. **Author:** It's you!
  9. **License:** The default ISC is a fine open source license based on the also very common MIT license. I'd just hit enter and go with that, but if you have a preferred license then by all means, type its name here.

Once you've answered those questions, it'll output something like the following:

```
About to write to D:\sites\node\jsqh\31-40\33\package.json:

{
  "name": "closebrace-test-cbuecheler",
  "version": "1.0.0",
  "description": "A simple module that sorts arrays of objects by key in ascending or descending order.",
  "main": "index.js",
  "scripts": {
    "test": "node test.js"
  },
  "keywords": [
    "test",
    "array",
    "sort",
    "no-dependencies"
  ],
  "author": "Christopher Buecheler",
  "license": "ISC"
}


Is this ok? (yes)
```

Hit enter for yes. You could type `n` and hit enter, and it'll abort. But let's not do that. Just hit enter to generate `package.json`. If you have any experience at all working with node modules, you know that `package.json` is the heart of every module. It gives basic information about the module, tells NPM or Yarn what dependency packages need to be installed, has scripts for testing and potentially other actions, and more. You can manually edit package.json any time you want, but remember that using things like `npm install --save moment` to add a module to your package will also edit that file (in that case, adding the Moment module as a dependency).

OK, we've got package.json ready to go. NPM is going to want us to have a readme file, so real quick, create readme.md in that same directory, and add this text, or something similar, to it:

```
# Test Module

This module was created while following a tutorial at [CloseBrace.com](https://closebrace.com). It's not intended for public use, and the author assumes no responsibility for such use.
```

Save that file. The next step is getting our module onto NPM. For that, you're going to need to register over at [npmjs.com](https://npmjs.com). This is just like every other website for which you've ever registered, but keep in mind that the email address you use will be posted for the public to see on your repositories, so you might want to use a custom address for this purpose. I went with npm@closebrace.com (yes, you can email that address and yes, I will see it &hellip; but I wouldn't since as a public address it might get pretty spammy).

Once you have an NPM account, it's back to the command line for you, since that's how you actually publish. First, log in to your account by typing:

```
npm login
```

It'll ask for your username, password, and public email, so go ahead and give it those values. Then it'll let you know that you're logged in. Now all you have to do is type a command to publish the module. **Note: you do not have to publish this module if you don't feel like it.** We've gone through everything you need to know at this point. So if you don't want to clutter up your NPM repo with a test module, just skip this step.

Want to actually publish? Just type:

```
npm publish
```

It'll do its thing, and when it's done, you can check your packages page on the website and see that the module's been published! This also means you could install the package elsewhere with `npm install closebrace-test-cbuecheler` (only using what you named it). You'll also get a confirmation email from NPM that you successfully published your package.

And there you go! We've successfully built and published a node module, as promised. Now go forth, and use this new knowledge for good. Next week, we'll talk about something new. Have any requests? Hit me up by replying to this newsletter.

Until then!

*Enjoying these quick hits? You can get them five days early by [subscribing to our weekly newsletter](https://closebrace.com/newsletter/subscribe).*