// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).on('page:change', function() {

  var modalSetting = {
    onOpen: function (dialog) {
      dialog.data.fadeIn('medium');
      dialog.container.fadeIn('medium');
      dialog.overlay.fadeIn('fast');
      $("html,body").css("overflow","hidden"); // disables scrolling on page in background
    },
    onShow: function(dialog) {
      $('.flip-wrapper').height($('.pf-box').outerHeight()); // resizes modal to account for height of absolutely positioned flipping boxes
      $('#simplemodal-container').css({'height' : 'auto'}); // necessary to fix simplemodal positioning
      $('.pf-modal-container').on('click', '.pf-box-wrapper', function(e){
        var target = $(event.target).closest('.flip-wrapper');
        target.toggleClass('flipped');
      })
    },
    onClose: function(dialog) {
      dialog.data.fadeOut('fast');
        dialog.overlay.fadeOut('medium', function(){
          $.modal.close(); // without this, if you close modal with ESC, you can't open it again
        });
      $("html,body").css("overflow","auto"); //re-enables scrolling on main page
    },
    opacity: 88,
    overlayClose: true,
    show: true,
    overlayCss: {backgroundImage: "url('/images/backgrounds/bg-dark_exa.png')"},
  };

  $('.matches').on('click', '.individual-child', function(e) {
    e.preventDefault();
    $.ajax({
      url: $(this).find('a').attr('href'),
    }).done(function(data) {
      var source = $('#child-profile-template').html();
      var templatingFunction = Handlebars.compile(source);
      $(templatingFunction(data)).modal(modalSetting);
      $('#gallery-wrap').slick({
        dots: true,
        infinite: true,
        speed: 700,
        initialSlide: (data.profile.main_profile_image - 1),
        autoplay: true,
        slidesToShow: 1,
        autoplaySpeed: 6000,
        // fade: true,
        // cssEase: 'linear',
      });
      $(window).resize(); // necessary to fix simplemodal positioning
    }).fail(function(data) {
    });
  });

});

Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});
