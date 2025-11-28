(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Project and Testimonial carousel
    $(".project-carousel, .testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
			0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);
 
 
// ----- Budget options per country -----
const budgetMap = {
  pakistan: [
    "Under 20,000 PKR",
    "20,000 PKR - 50,000 PKR",
    "50,000 PKR - 150,000 PKR",
    "Above 150,000 PKR"
  ],

  uae: [
    "Under 500 AED",
    "500 AED - 2,000 AED",
    "2,000 AED - 7,000 AED",
    "Above 7,000 AED"
  ],

  usa: [
    "Under $300",
    "$300 - $1,000",
    "$1,000 - $3,000",
    "Above $3,000"
  ],

  uk: [
    "Under £250",
    "£250 - £900",
    "£900 - £2,500",
    "Above £2,500"
  ],

  germany: [
    "Under €250",
    "€250 - €900",
    "€900 - €2,500",
    "Above €2,500"
  ],

  australia: [
    "Under 400 AUD",
    "400 AUD - 1,200 AUD",
    "1,200 AUD - 3,000 AUD",
    "Above 3,000 AUD"
  ],

  canada: [
    "Under 350 CAD",
    "350 CAD - 1,000 CAD",
    "1,000 CAD - 3,000 CAD",
    "Above 3,000 CAD"
  ],

  saudiarabia: [
    "Under 500 SAR",
    "500 SAR - 2,000 SAR",
    "2,000 SAR - 7,000 SAR",
    "Above 7,000 SAR"
  ],

  qatar: [
    "Under 500 QAR",
    "500 QAR - 2,000 QAR",
    "2,000 QAR - 7,000 QAR",
    "Above 7,000 QAR"
  ],

  kuwait: [
    "Under 50 KWD",
    "50 KWD - 200 KWD",
    "200 KWD - 700 KWD",
    "Above 700 KWD"
  ],

  malaysia: [
    "Under 500 MYR",
    "500 MYR - 2,000 MYR",
    "2,000 MYR - 6,000 MYR",
    "Above 6,000 MYR"
  ],

  france: [
    "Under €250",
    "€250 - €900",
    "€900 - €2,500",
    "Above €2,500"
  ],

  italy: [
    "Under €250",
    "€250 - €900",
    "€900 - €2,500",
    "Above €2,500"
  ]
};

// ----- Countries we treat as WhatsApp-supported (text shown in select) -----
const whatsappSupportedText = [
  "Pakistan 🇵🇰","UAE 🇦🇪","UK 🇬🇧","Saudi Arabia 🇸🇦","Qatar 🇶🇦","Kuwait 🇰🇼","Malaysia 🇲🇾","India 🇮🇳"
];

// helper: update budget select when country changes
function updateBudgetOptions() {
  const countrySelect = document.getElementById('country');
  const budgetSelect = document.getElementById('budget');
  const countryValue = countrySelect.value; // e.g. "pakistan"
  // clear current options
  budgetSelect.innerHTML = '<option value="">Select Budget</option>';

  if (!countryValue || !budgetMap[countryValue]) return;

  budgetMap[countryValue].forEach(range => {
    const opt = document.createElement('option');
    opt.value = range;
    opt.textContent = range;
    budgetSelect.appendChild(opt);
  });
}

// main submit handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('bookingForm');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';

    // read fields
    const name = (document.getElementById('name').value || '').trim();
    const email = (document.getElementById('mail').value || '').trim();
    const mobile = (document.getElementById('mobile').value || '').trim();
    const service = (document.getElementById('service').value || '').trim();
    const business = (document.getElementById('business').value || '').trim();
    const countryText = (document.getElementById('country').options[document.getElementById('country').selectedIndex].text || '').trim();
    const budget = (document.getElementById('budget').value || '').trim();
    const startdate = (document.getElementById('startdate').value || '').trim();
    const message = (document.getElementById('message').value || '').trim();

    // whatsapp supported check uses the visible text (with flag)
    const isWhatsAppSupported = whatsappSupportedText.includes(countryText);

    // construct whatsapp message
    const whatsappMessage = `
📩 *New Project Inquiry via ConnectiQ Website*

👤 *Name:* ${name}
📧 *Email:* ${email}
📞 *Mobile:* ${mobile}
🏢 *Business / Brand:* ${business}
🌍 *Country:* ${countryText}
💼 *Service:* ${service}
💰 *Budget Range:* ${budget}
📅 *Preferred Start Date:* ${startdate}

📝 *Project Details:*
${message}

Please review and get in touch.
`;

    // number without +
    const phoneNumber = "923162522899";

    if (isWhatsAppSupported) {
      // open WhatsApp prefilled
      const encoded = encodeURIComponent(whatsappMessage);
      const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
      window.open(url, '_blank');

      // restore UI
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      // optionally reset form:
      form.reset();
    } else {
      // send to Google Apps Script (form.action must be Apps Script URL)
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form)
      })
      .then(response => {
        // success
        alert('✅ Your request has been sent successfully (via Email).');
        form.reset();
      })
      .catch(err => {
        console.error(err);
        alert('❌ Error sending your request. Please try again later.');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      });
    }
  });
});
 
