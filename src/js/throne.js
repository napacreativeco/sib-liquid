(function ($) {

    /* ============================================= */
    $(document).on('ready', function() {

      // Theme Color
      $('meta[name="theme-color"]').attr('content', '#000000');

    });

    function changeTheme() {
      if ( window.location.pathname == '/' ) {
        $('meta[name="theme-color"]').attr('content', '#000000');
      }
    }
    changeTheme();


    /* 
    ------------------------
    Draggables
    ------------------------
    */
    const mediaQuery = window.matchMedia('(max-width: 767px)');

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

    
    /* ============================================= */
    
    /* 
    ------------------------
    Plus Menu
    ------------------------
    */
    $('.plus').on('click', function() {
      if ( $('.filter-menu').hasClass('filter-opened') ) {
          $('.filter-menu').removeClass('filter-opened');
      } else {
          $('.filter-menu').addClass('filter-opened');
      }
    });

    $('.pagination-link').on('click', function() {  
      if ( $('.filter-menu').hasClass('filter-opened') ) {
        $('.filter-menu').removeClass('filter-opened');
      } else {
        $('.filter-menu').addClass('filter-opened');
      }
    });
  
    // ----------------------
    // Plus Menu
    // -----------------------
    function hidePlus() {
      document.querySelector('.plus').style.display = 'none';
    }
    function showPlus() {
      document.querySelector('.plus').style.display = 'block';
    }
  
    // ----------------------
    // Logo
    // -----------------------
    // function hideLogo() {
    //   const mediaQuery = window.matchMedia('(max-width: 767px)');
    //   if (! mediaQuery.matches) {
    //     document.querySelector('.logo').style.display = 'none';
    //   }
    // }

    function showLogo() {
      document.querySelector('.logo').style.display = 'block';
    }

    function unpinHamburger() {
      $('.hamburger').css({
        position: 'relative',
        top: '0',
        right: '0'
      }).fadeIn('fast');
    }
      
    // Scroll Function
    window.addEventListener("scroll", () => {

      // Theme Bar
      if (window.scrollY == 0) {
        $('meta[name="theme-color"]').attr('content', '#000000');
      }

      if (window.scrollY > 100) { 

        $('meta[name="theme-color"]').attr('content', '#ffffff');

        showPlus();
        showLogo();

      } else { 

        // hidePlus();
        // hideLogo();
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

      $('.hamburger').fadeOut('fast');

      // Then, show the proper Component
      setTimeout(function() {
        $('.'+sect).css({
            'display': 'flex'
        });
      }, 500);

      gsap.to('.hero-section', {
        y: '-100vh',
        height: '0px',
        duration: 0.7,
        onComplete: function() {

          gsap.to(window, { 
            duration: 0.6,
            delay: 0,
            ease: 'ease-in-out',
            onStart: function() {

              gsap.to('.hero-section', {
                duration: 0.6,
                css: {
                  height: '0px',
                  overflow: 'hidden'
                },
              });

              $('meta[name="theme-color"]').attr('content', '#ffffff');
              showPlus();
              showLogo();
              unpinHamburger();
            },
            onComplete: function() {
              $('#user-logo').css('display', 'block');

              console.log(e.currentTarget.attr('data-url'));

              if (e.currentTarget.dataset('url') != '') {
                window.location = e.currentTarget.dataset('url');
              }
            }
          });


        }
      });


      console.log($(this).attr('data-title'));
    });
          
    /* 
    ------------------------
    Newsletter Popup
    ------------------------
    */
    $('.newsletter-opener').on('click', function() {
        gsap.to(".shopify-section:has(.newsletter-modal)", {
          display: "flex"
        });

        // $(document).on('click', function(e) {
        //   // e.preventDefault();
        //   if (e.target.matches('.newsletter-modal') || e.target.matches('input') || e.target.matches('button')) {
            
        //   } else {
        //     $('.shopify-section:has(.newsletter-modal)').css('display', 'none');
        //   }
        // });

    });

    $('.close-newsletter').on('click', function() {
      $('.shopify-section:has(.newsletter-modal)').css('display', 'none');
    });


    /* 
    ------------------------
    Popups
    ------------------------
    */
    var openPreorderModal = function() {
      gsap.to(".sign-up-modal", {
        display: "flex"
      });
    }

    var openSoldoutModal = function() {
      gsap.to(".soldout-modal", {
        display: "flex"
      });
    }

    $('.close-signup').on('click', function() {
      $('.sign-up-modal').css('display', 'none');
    });

    $('.close-soldout').on('click', function() {
      $('.soldout-modal').css('display', 'none');
    });


    $('.preorder-indicator').on('click', openPreorderModal);
    $('.preorder-button.with-popup').on('click', openPreorderModal);
    $('.preorder-button.soldout-signup').on('click', openSoldoutModal);
    $('.soldout-signup').on('click', openSoldoutModal);

    // When Product Sucessfull Added To Cart
    // reload page on click
    $('.buttons-added').on('click', function(e) {
      e.preventDefault();
      window.location = window.location;
    });

    /* 
    ------------------------
    Fade To White
    ------------------------
    */
    $('.logo > a').on('click', function(e) {
      e.preventDefault();

      gsap.to('.fade-to-white', {
        opacity: 1,
        display: 'block',
        duration: 0.6,
        onComplete: function() {
          window.location = '/';
        }
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
      $('.selected-size-variant').text( $('input[name="Size"]:checked').val() );
      $('.option-name').hide();
      $('.option-value').show();
      //$('.selected-color-variant').text( '(' + $('input[name="Color"]:checked').val() + ')' );
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
Product Page Details
------------------------
*/



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
