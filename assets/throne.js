(function ($) {

    /* ============================================= */
    
    $(document).on('ready', function() {
        console.log('document ready');

        if ( window.location.href.includes('?cartmodal=1') ) {
          $('.logo a').css('display', 'block');
        } 

        if ( window.location.href != '/' ) {
          $('.logo a').css('display', 'block');
        } 


    });

    /* ============================================= */

    /* 
    ------------------------
    Draggables
    ------------------------
    */
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    if (mediaQuery.matches) {
      gsap.registerPlugin(Draggable);

      Draggable.create("#top-left", {
        type:"x,y",
        bounds: document.getElementById("hero-wrapper"),
        inertia: true
      });

      Draggable.create("#top-right", {
        type:"x,y",
        bounds: document.getElementById("hero-wrapper"),
        inertia: true
      });

      Draggable.create("#bottom-left", {
        type:"x,y",
        bounds: document.getElementById("hero-wrapper"),
        inertia: true
      });

      Draggable.create("#bottom-right", {
        type:"x,y",
        bounds: document.getElementById("hero-wrapper"),
        inertia: true
      });

      Draggable.create("#cloud", {
        type:"x,y",
        bounds: document.getElementById("hero-wrapper"),
        inertia: true
      });

    }
    
    /* ============================================= */

    /* 
    ------------------------
    Cart Overlay
    ------------------------
    */
    $('.hamburger').on('click', function() {

        if ($('.cart-overlay').is(':visible')) {

            gsap.to('.cart-overlay', {
                display: 'none'
            });

        } else {
            
            gsap.to('.cart-overlay', {
                display: 'flex'
            });

            gsap.to('.logo > a', {
                display: 'block'
            });

        }

    });
    
    /* 
    ------------------------
    Plus Menu
    ------------------------
    */
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

    /* 
    ------------------------
    Hero Links
    ------------------------
    */
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
          
    /* 
    ------------------------
    Newsletter Popup
    ------------------------
    */
    $('.newsletter-opener').on('click', function() {
        gsap.to(".shopify-section:has(.newsletter-modal)", {
          display: "flex",
        });
    });

    $('.newsletter-close').on('click', function() {
      gsap.to(".shopify-section:has(.newsletter-modal)", {
        display: "none",
      });
    });
      

    /* 
    ------------------------
    Variant Selectors
    ------------------------
    */
    $('.variant-selector-title').on('click', function() {

      var clicked = $(this).next('.variant-selector-box');
      $('.variant-selector-box').hide();
      $(clicked).css('display', 'flex');

    });

    $('.variant-selector-box > input').on('change', function() {
      $('.variant-selector-box').hide();
      // $('.selected-variant').text($(this).val());
      $('.selected-size-variant').text( '(' + $('input[name="Size"]:checked').val() + ')' );
      $('.selected-color-variant').text( '(' + $('input[name="Color"]:checked').val() + ')' );
    });


    /* 
    ------------------------
    Grid Changer
    ------------------------
    */
    $('.crosshair').on('click', function() {

      var wrapper = $('.shop-component-wrapper');

      if ( $(wrapper).attr('data-layout') === 'grid') {

        $('.crosshair-icon > img').css('transform', 'rotate(90deg)');
        $(wrapper).attr('data-layout', 'list');
        $('.products-grid.grid').css('display', 'none');
        $('.products-grid.dual').css('display', 'none');
        $('.products-grid.list').css('display', 'grid');
        
      } else if ( $(wrapper).attr('data-layout') === 'list') {

        $('.crosshair-icon > img').css('transform', 'rotate(180deg)');
        $(wrapper).attr('data-layout', 'dual');
        $('.products-grid.grid').css('display', 'none');
        $('.products-grid.dual').css('display', 'block');
        $('.products-grid.list').css('display', 'none');

      } else if ( $(wrapper).attr('data-layout') === 'dual') {

        $('.crosshair-icon > img').css('transform', 'rotate(270deg)');
        $(wrapper).attr('data-layout', 'grid');
        $('.products-grid.grid').css('display', 'grid');
        $('.products-grid.dual').css('display', 'none');
        $('.products-grid.list').css('display', 'none');

      }

      //  WORKS: 
      // if ( $(grid).css('display') === 'grid') {
      //   $('ul.products').hide();
      //   $(list).css('display', 'grid');

      //   $('.crosshair-icon > img').css('transform', 'rotate(90deg)');
      // } else {
      //   $('ul.products').hide();
      //   $(grid).css('display', 'grid');

      //   $('.crosshair-icon > img').css('transform', 'rotate(0deg)');
      // }

    });

    /* 
    ------------------------
    Grid Changer - Pinning
    ------------------------
    */
    let st = ScrollTrigger.create({
      trigger: ".shop-component",
      pin: ".grid-changer-wrapper",
      start: "top top",
      end: document.querySelector('.shop-component').innerHeight,
      pinSpacing: false,
      pinType: 'transform'
    });


    /* 
    ------------------------
    Cart Increment Items
    ------------------------
    */
    // $('.cart-quantity-controllers').on('click', function() {
    //   var inputs = $(this).find('.cart-quantity-input').attr('value');
    //   alert('this works. inputs is: ' + inputs)
    // })

    $('.quantity-add').on('click', function() {
      $(this).closest('.quantity-wrapper').find('input').val(function(i, v) {
        return ++v;
      });
    });

    $('.quantity-subtract').on('click', function() {
      $(this).closest('.quantity-wrapper').find('input').val(function(i, v) {
        return --v;
      });
    });



})(jQuery);


/* 
------------------------
Accordion Animation
------------------------
*/
class Accordion {
  constructor(el) {
    // Store the <details> element
    this.el = el;
    // Store the <summary> element
    this.summary = el.querySelector('summary');
    // Store the <div class="content"> element
    this.content = el.querySelector('.content');

    // Store the animation object (so we can cancel it if needed)
    this.animation = null;
    // Store if the element is closing
    this.isClosing = false;
    // Store if the element is expanding
    this.isExpanding = false;
    // Detect user clicks on the summary element
    this.summary.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    // Stop default behaviour from the browser
    e.preventDefault();
    // Add an overflow on the <details> to avoid content overflowing
    this.el.style.overflow = 'hidden';
    // Check if the element is being closed or is already closed
    if (this.isClosing || !this.el.open) {
      this.open();
    // Check if the element is being openned or is already open
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    // Set the element as "being closed"
    this.isClosing = true;
    
    // Store the current height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the height of the summary
    const endHeight = `${this.summary.offsetHeight}px`;
    
    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }
    
    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    });
    
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(false);
    // If the animation is cancelled, isClosing variable is set to false
    this.animation.oncancel = () => this.isClosing = false;
  }

  open() {
    // Apply a fixed height on the element
    this.el.style.height = `${this.el.offsetHeight}px`;
    // Force the [open] attribute on the details element
    this.el.open = true;
    // Wait for the next frame to call the expand function
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    // Set the element as "being expanding"
    this.isExpanding = true;
    // Get the current fixed height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the open height of the element (summary height + content height)
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;
    
    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }
    
    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    });
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(true);
    // If the animation is cancelled, isExpanding variable is set to false
    this.animation.oncancel = () => this.isExpanding = false;
  }

  onAnimationFinish(open) {
    // Set the open attribute based on the parameter
    this.el.open = open;
    // Clear the stored animation
    this.animation = null;
    // Reset isClosing & isExpanding
    this.isClosing = false;
    this.isExpanding = false;
    // Remove the overflow hidden and the fixed height
    this.el.style.height = this.el.style.overflow = '';
  }
}

document.querySelectorAll('details').forEach((el) => {
  new Accordion(el);
});

/*
  =======================================================================
*/
