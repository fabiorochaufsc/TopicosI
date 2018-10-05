
In my Javascript App (jQuery) I have two events that are fired asynchronously

widget 1 fires "Event1" when finishes loading
widget 2 fires "Event2" when finishes loading
How do I "sync" these two async events in order to "call a method" only after these two events fired.

I would need an approach that works for multiple events also.

-----------------------------------------------

var deferredObj1 = $.Deferred(),
    deferredObj2 = $.Deferred();

$.when(deferredObj1,deferredObj2).done(function(){
    console.log("They are both done!");
});

// inside the Event1 handler:
deferredObj1.resolve();

// inside the Event2 handler:
deferredObj2.resolve();