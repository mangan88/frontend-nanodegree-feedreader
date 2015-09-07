
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

  describe('New Feed Selection', function() {

    beforeEach(function(done) {
      $('.feed').empty(); //clear out all content

      //Load a feed and save it's H2 text
      loadFeed(0, function() {
        entries_before = $('.feed').find("h2").text();
      });
      //Load another feed and save it's H2 text
      loadFeed(1, function() {
        entries_after = $('.feed').find("h2").text();
        done(); //Move on to the 'it' phase.
      });
    });

    it('changes when feed updates', function(done) {
      expect(entries_before).not.toEqual(entries_after); //caompare the two H2 element text, expect different values
      done(); //test completed, move on
    });
  });
});
