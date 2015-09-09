
/* feedreader.js
 * Contains all Jasmine tests for our UdaciFeeds app.
 */
$(function() {
  describe('RSS Feeds', function() {

    it('are defined', function() {
      expect(allFeeds).toBeDefined(); //allFeeds exists
      expect(allFeeds.length).not.toBe(0); //allFeeds hasat least one item
    });

    it('have URLs', function() {
      //loop through each entry of allFeeds
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined(); //each entry has a url
        expect(feed.url).not.toBe(''); //each url is not an empty string
      });
    });

    it('have names', function() {
      //loop through each entry of allFeeds
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined(); //each entry has a name
        expect(feed.name).not.toBe(''); //each name is not an empty string
      });
    });
  });



  describe('The menu', function() {
    it('starts hidden', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true); //First test that the body has the 'menu-hidden' class
    });
    //'click' the menu icon, and check <body> for the 'menu-hidden' class.
    it('hides/shows on icon click', function() {
      $('i.icon-list').click();
      expect($('body').hasClass('menu-hidden')).toBe(false); //first click reveals the menu (removes menu-hidden class)
      $('i.icon-list').click();
      expect($('body').hasClass('menu-hidden')).toBe(true); //second click hides menu again (restores menu-hidden class)
    });

  });

  describe('Initial entries', function() {
    //set up asynchronous functionality
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('should have at least one entry in the feed container', function() {
      expect($('.feed .entry').length).toBeGreaterThan(0); //at least one .entry item in the .feed area
    });

  });

  describe('New Feed Selection', function(done) {

    beforeEach(function(done) {
      // load feed first feed, set initial variables
      loadFeed(0, function() {
        title = $(".feed .entry h2").html();
        header = $("h1.header-title").html();
        //load second feed and move on to the 'it' statement
        loadFeed(1, function() {
          //finished, move on
          done();
        });
      });
    });
    it('has a new title and header', function(done) {
      //compare new feed (loadFeed(1)) with original data (saved from loadFeed(0))
      expect($(".feed .entry h2").html()).not.toBe(title);
      expect($("h1.header-title").html()).not.toBe(header);
      done();
    });

    // restore original state
    afterAll(function(done) {
      loadFeed(0, done);
    });

  });
});
