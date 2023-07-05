(function ($) {

    $(document).on('ready', function() {
        console.log('document ready');

    });

    /* ============================================= */

    const mediaQuery = window.matchMedia('(max-width: 767px)')

    if (mediaQuery.matches) {
      gsap.registerPlugin(Draggable);

      Draggable.create("#top-left", {
        type:"x,y",
        bounds: document.getElementById("hero-wrapper"),
        inertia: true,
        onClick: function() {
            console.log("clicked top-left");
        },
        onDragEnd: function() {
            console.log("drag ended top-left");
        }
      });

      Draggable.create("#top-right", {
        type:"x,y",
        bounds: document.getElementById("hero-wrapper"),
        inertia: true,
        onClick: function() {
            console.log("clicked top-right");
        },
        onDragEnd: function() {
            console.log("drag ended top-right");
        }
      });

      Draggable.create("#bottom-left", {
        type:"x,y",
        bounds: document.getElementById("hero-wrapper"),
        inertia: true,
        onClick: function() {
            console.log("clicked bottom-left");
        },
        onDragEnd: function() {
            console.log("drag ended bottom-left");
        }
      });

      Draggable.create("#bottom-right", {
        type:"x,y",
        bounds: document.getElementById("hero-wrapper"),
        inertia: true,
        onClick: function() {
            console.log("clicked bottom-right");
        },
        onDragEnd: function() {
            console.log("drag ended bottom-right");
        }
      });

      Draggable.create("#cloud", {
        type:"x,y",
        bounds: document.getElementById("hero-wrapper"),
        inertia: true,
        onClick: function() {
            console.log("clicked cloud");
        },
        onDragEnd: function() {
            console.log("drag ended cloud");
        }
      });

    }
    
    /* ============================================= */

    /* Toggle Cart Overlay */
    $('.hamburger').on('click', function() {

        if ($('.cart-overlay').is(':visible')) {

            gsap.to('.cart-overlay', {
                display: 'none'
            });

        } else {
            
            gsap.to('.cart-overlay', {
                display: 'flex'
            });
        }

    });

    
    /* Toggle Plus Menu */
    $('.plus').on('click', function() {
      $('.filter-menu-text').hide();
      
        if ( $('.filter-menu').hasClass('filter-opened') ) {

            $('.filter-menu').removeClass('filter-opened');
            
            gsap.fromTo(".filter-menu", {x: '0vw'}, {x: '100vw', duration: 0.2});

        } else {

            $('.filter-menu').addClass('filter-opened');
            gsap.fromTo(".filter-menu", {x: '100vw' }, {x: '0vw', duration: 0.2});
        }

    });

    // Hero Links
    $('.scroll-to-link').on('click', function(e) {
        e.preventDefault();

        var sect = $(this).attr('data-component');

        // Hide All Components
        $('.page-component').css("display", "none");

        // Then, show the proper Component
        setTimeout(function() {
          $('.'+sect).css({
              'display': 'flex'
          });
        }, 100);

        // Scroll to Component
        gsap.to(window, { duration: 0.7, delay: 0.1, scrollTo: window.innerHeight, ease: 'ease-in-out' });

        console.log($(this).attr('data-title'));
    });
          
    /* Newsletter Popup */
    setTimeout(function() {
        gsap.to(".shopify-section:has(.newsletter-modal)", {
          display: "flex",
        });
    }, 30000);

    $('.newsletter-close').on('click', function() {
      gsap.to(".shopify-section:has(.newsletter-modal)", {
        display: "none",
      });
    });
      

    // Show Variant Selectors
    $('.variant-selector-title').on('click', function() {

      var clicked = $(this).next('.variant-selector-box');
      $('.variant-selector-box').hide();
      $(clicked).css('display', 'flex');

    });

    $('.variant-selector-box > input').on('change', function() {
      $('.variant-selector-box').hide();
    });

    /* Grid Changer */
    $('.crosshair').on('click', function() {

      var grid = $('ul.products.grid');
      var list = $('ul.products.list');

      if ( $(grid).css('display') === 'grid') {
        $('ul.products').hide();
        $(list).css('display', 'grid');

        $('.crosshair-icon > img').css('transform', 'rotate(90deg)');
      } else {
        $('ul.products').hide();
        $(grid).css('display', 'grid');

        $('.crosshair-icon > img').css('transform', 'rotate(0deg)');
      }

    });

})(jQuery);


/*
  =======================================================================
*/
