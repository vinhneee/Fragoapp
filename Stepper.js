class FragoStepper {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = document.querySelectorAll('.step-item').length;
    this.stepItems = document.querySelectorAll('.step-item');
    this.backButton = document.getElementById('backButton');
    this.nextButton = document.getElementById('nextButton');
    this.footerNav = document.getElementById('footerNav');
    this.footerContainer = document.getElementById('footerContainer');
    this.stepContentWrapper = document.getElementById('stepContentWrapper');
    
    this.formData = {};
    this.direction = 1;
    
    this.init();
  }
  
  init() {
    this.createStepIndicators();
    this.setupEventListeners();
    this.updateUI();
    this.loadSavedData();
  }
  
  createStepIndicators() {
    const row = document.getElementById('stepIndicatorRow');
    row.innerHTML = '';
    
    for (let i = 1; i <= this.totalSteps; i++) {
      const indicator = document.createElement('div');
      indicator.className = 'step-indicator';
      indicator.dataset.step = i;
      
      const inner = document.createElement('div');
      inner.className = `step-indicator-inner ${i === 1 ? 'active' : 'inactive'}`;
      
      const number = document.createElement('span');
      number.className = 'step-number';
      number.textContent = i;
      
      inner.appendChild(number);
      indicator.appendChild(inner);
      
      indicator.addEventListener('click', () => {
        if (i <= this.currentStep) {
          this.direction = i < this.currentStep ? -1 : 1;
          this.goToStep(i);
        }
      });
      
      row.appendChild(indicator);
      
      if (i < this.totalSteps) {
        const connector = document.createElement('div');
        connector.className = 'step-connector';
        const connectorInner = document.createElement('div');
        connectorInner.className = 'step-connector-inner';
        connector.appendChild(connectorInner);
        row.appendChild(connector);
      }
    }
  }
  
  setupEventListeners() {
    this.backButton.addEventListener('click', () => this.prevStep());
    this.nextButton.addEventListener('click', () => this.nextStep());
    
    // Option cards
    document.querySelectorAll('.option-card').forEach(card => {
      card.addEventListener('click', () => {
        const field = card.dataset.field;
        document.querySelectorAll(`.option-card[data-field="${field}"]`).forEach(c => 
          c.classList.remove('selected')
        );
        card.classList.add('selected');
        this.formData[field] = card.dataset.value;
        if (field === 'userType') {
          localStorage.setItem('ifUserSupplier', card.dataset.value);
        }
      });
    });
    
    // Option items
    document.querySelectorAll('.option-item').forEach(item => {
      item.addEventListener('click', () => {
        const field = item.dataset.field;
        document.querySelectorAll(`.option-item[data-field="${field}"]`).forEach(i => 
          i.classList.remove('selected')
        );
        item.classList.add('selected');
        this.formData[field] = item.dataset.value;
      });
    });
    
    // Multi-select
    document.querySelectorAll('.multi-option').forEach(option => {
      option.addEventListener('click', () => {
        option.classList.toggle('selected');
        const field = option.dataset.field;
        const selectedValues = Array.from(
          document.querySelectorAll(`.multi-option[data-field="${field}"].selected`)
        ).map(opt => opt.dataset.value);
        this.formData[field] = selectedValues;
      });
    });
    
    // Form inputs
    const inputs = {
      fullName: 'userFullName',
      gender: 'gender',
      birthday: 'userBirthDate',
      email: 'userEmail',
      phone: 'userPhone'
    };
    
    Object.entries(inputs).forEach(([inputId, storageKey]) => {
      const input = document.getElementById(inputId);
      if (input) {
        input.addEventListener('change', (e) => {
          this.formData[inputId] = e.target.value;
          localStorage.setItem(storageKey, e.target.value);
        });
      }
    });
  }
  
  nextStep() {
    if (!this.validateStep()) return;
    
    if (this.currentStep < this.totalSteps) {
      this.direction = 1;
      this.currentStep++;
      this.updateUI();
      this.saveData();
    } else if (this.currentStep === this.totalSteps) {
      this.direction = 1;
      this.currentStep++;
      this.updateUI();
      this.saveData();
      console.log('Form completed!', this.formData);
    }
  }
  
  prevStep() {
    if (this.currentStep > 1) {
      this.direction = -1;
      this.currentStep--;
      this.updateUI();
    }
  }
  
  goToStep(step) {
    if (step >= 1 && step <= this.totalSteps && step !== this.currentStep) {
      this.currentStep = step;
      this.updateUI();
    }
  }
  
  validateStep() {
    const currentStepItem = document.querySelector(`.step-item[data-step="${this.currentStep}"]`);
    
    const inputs = currentStepItem.querySelectorAll('input[required], select[required]');
    for (let input of inputs) {
      if (!input.value) {
        input.focus();
        input.style.borderColor = '#ef4444';
        input.style.boxShadow = '0 0 0 5px rgba(239, 68, 68, 0.1)';
        setTimeout(() => {
          input.style.borderColor = '';
          input.style.boxShadow = '';
        }, 2000);
        return false;
      }
    }
    
    if (this.currentStep === 2 && !document.querySelector('.option-card.selected')) {
      this.showError('Vui lòng chọn vai trò của bạn');
      return false;
    }
    
    if (this.currentStep === 3 && !document.querySelector('.option-item.selected')) {
      this.showError('Vui lòng chọn ngân sách');
      return false;
    }
    
    if (this.currentStep === 4 && !document.querySelector('.multi-option.selected')) {
      this.showError('Vui lòng chọn ít nhất một ngành nghề');
      return false;
    }
    
    return true;
  }
  
  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #fee2e2;
      color: #991b1b;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      z-index: 9999;
      font-weight: 600;
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
      errorDiv.style.opacity = '0';
      errorDiv.style.transition = 'opacity 0.3s ease';
      setTimeout(() => errorDiv.remove(), 300);
    }, 3000);
  }
  
  updateUI() {
    this.stepItems.forEach((item, index) => {
      item.classList.remove('active');
      if (index + 1 === this.currentStep) {
        item.classList.add('active');
      }
    });  if (this.currentStep < this.totalSteps) {
    this.footerContainer.style.display = 'block';
  } else {
    this.footerContainer.style.display = 'none';
  }
  
  this.updateHeight();
    
    const indicators = document.querySelectorAll('.step-indicator-inner');
    indicators.forEach((indicator, index) => {
      const stepNum = index + 1;
      indicator.className = 'step-indicator-inner';
      
      if (stepNum < this.currentStep) {
        indicator.classList.add('complete');
        indicator.innerHTML = `
          <svg class="check-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
          </svg>
        `;
      } else if (stepNum === this.currentStep) {
        indicator.classList.add('active');
        indicator.innerHTML = '<div class="active-dot"></div>';
      } else {
        indicator.classList.add('inactive');
        indicator.innerHTML = `<span class="step-number">${stepNum}</span>`;
      }
    });
    
    const connectors = document.querySelectorAll('.step-connector-inner');
    connectors.forEach((connector, index) => {
      connector.style.width = index + 1 < this.currentStep ? '100%' : '0';
    });
    
    if (this.currentStep === 1) {
      this.backButton.style.display = 'none';
      this.footerNav.classList.remove('spread');
      this.footerNav.classList.add('end');
    } else {
      this.backButton.style.display = 'flex';
      this.footerNav.classList.remove('end');
      this.footerNav.classList.add('spread');
    }
    
    if (this.currentStep === this.totalSteps) {
      this.nextButton.textContent = 'Hoàn thành';
      this.nextButton.innerHTML = 'Hoàn thành';
    } else if (this.currentStep > this.totalSteps) {
      this.footerContainer.style.display = 'none';
    } else {
      this.nextButton.innerHTML = `
        Tiếp tục
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      `;
    }
    
    this.updateHeight();
  }
  
  updateHeight() {
    const activeStep = document.querySelector('.step-item.active');
    if (activeStep) {
      const height = activeStep.scrollHeight;
      this.stepContentWrapper.style.height = `${height}px`;
    }
  }
  
  saveData() {
    localStorage.setItem('fragoFormData', JSON.stringify(this.formData));
  }
  
  loadSavedData() {
    const saved = localStorage.getItem('fragoFormData');
    if (saved) {
      this.formData = JSON.parse(saved);
    }
    
    const inputs = {
      fullName: localStorage.getItem('userFullName'),
      gender: localStorage.getItem('gender'),
      birthday: localStorage.getItem('userBirthDate'),
      email: localStorage.getItem('userEmail'),
      phone: localStorage.getItem('userPhone')
    };
    
    Object.entries(inputs).forEach(([id, value]) => {
      const input = document.getElementById(id);
      if (input && value) {
        input.value = value;
      }
    });
  }
}

function completeRegistration() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  setTimeout(() => {
    window.location.href = 'home.html';
  }, 400);
}

document.addEventListener('DOMContentLoaded', () => {
  new FragoStepper();
  
  window.addEventListener('resize', () => {
    const stepper = window.fragoStepperInstance;
    if (stepper) stepper.updateHeight();
  });
});