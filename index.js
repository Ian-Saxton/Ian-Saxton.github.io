// Popup cards

const moreInfoButtons = document.querySelectorAll('.more-info-button');

for (const moreInfoButton of moreInfoButtons) {
  moreInfoButton.addEventListener('click', (event) => {
    const popupSection = event.currentTarget.parentElement.nextElementSibling;
    popupSection.style.display = 'flex';
  });
}

const closePopupButtons = document.querySelectorAll('.close-popup-button');

for (const closePopupButton of closePopupButtons) {
  closePopupButton.addEventListener('click', (event) => {
    const popupSection =
      event.currentTarget.parentElement.parentElement.parentElement;
    popupSection.style.display = 'none';
  });
}

// Contact form validation.

const validateEmail = function (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const showStatus = function (message, type) {
  const formStatus = document.querySelector('#form-status');
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
};

const validateForm = function () {
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const message = document.querySelector('#message').value.trim();

  if (!name) {
    showStatus('Please enter your name.', 'error');
    return false;
  }
  if (!email || !validateEmail(email)) {
    showStatus('Please enter a valid email address.', 'error');
    return false;
  }
  if (!message) {
    showStatus('Please enter a message.', 'error');
    return false;
  }
  return true;
};

document.querySelector('#submit-btn').addEventListener('click', function (event) {
  event.preventDefault();
  if (validateForm()) {
    showStatus("Thanks for reaching out! I'll get back to you soon.", 'success');
    document.querySelector('#Contact').reset();
  }
});

document.querySelector('#reset-btn').addEventListener('click', function () {
  const formStatus = document.querySelector('#form-status');
  formStatus.textContent = '';
  formStatus.className = 'form-status';
});

// Accordion

const accordionData = [
  {
    title: 'Software Intrest',
    content: 'RPG Games, Software that empores people to access social saftey nets, Software that allows discorse to happen online, in a responsible and accountable way.',
  },
  {
    title: 'Outside of tech intrests',
    content: 'Time with family, Paddle boarding, Hiking, Camping, Table top Roll Playing games.',
  },
  {
    title: 'Software to Monotize',
    content: 'Social Media software that physically brings people together, or non profits to help people gathering resources reach out further.'
  }
];

const buildAccordion = function () {
  const skillsSection = document.querySelector('#Skills');
  if (!skillsSection) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'accordion';

  const heading = document.createElement('h2');
  heading.textContent = 'Quick Skills Overview';
  wrapper.appendChild(heading);

  for (const accordionItem of accordionData) {
    const item = document.createElement('div');
    item.className = 'accordion-item';

    const button = document.createElement('button');
    button.className = 'accordion-button';
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = `<span>${accordionItem.title}</span><i class="fa-solid fa-chevron-down accordion-icon"></i>`;

    const panel = document.createElement('div');
    panel.className = 'accordion-panel';

    const panelInner = document.createElement('p');
    panelInner.className = 'accordion-panel-inner';
    panelInner.textContent = accordionItem.content;

    panel.appendChild(panelInner);
    item.appendChild(button);
    item.appendChild(panel);
    wrapper.appendChild(item);

    button.addEventListener('click', function () {
      const isOpen = button.getAttribute('aria-expanded') === 'true';

      const allButtons = wrapper.querySelectorAll('.accordion-button');
      for (const b of allButtons) {
        b.setAttribute('aria-expanded', 'false');
        b.closest('.accordion-item').querySelector('.accordion-panel').style.maxHeight = null;
      }

      if (!isOpen) {
        button.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  }

  const cardRow = skillsSection.querySelector('.space-evenly-distributed-row-container');
  if (cardRow) {
    cardRow.insertAdjacentElement('afterend', wrapper);
  } else {
    skillsSection.appendChild(wrapper);
  }
};

buildAccordion();