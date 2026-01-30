/**
 * Progressive Disclosure Stepper
 * Handles 9 steps (0-8) with dynamic visibility and ellipses
 * Only uses progressive disclosure on smaller screens
 */

class ProgressiveStepper {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.totalSteps = options.totalSteps || 9;
        this.currentStep = options.currentStep || 0;
        this.stepLabels = options.stepLabels || this.generateDefaultLabels();
        this.onStepChange = options.onStepChange || (() => {});
        this.useProgressiveDisclosure = false;
        
        // Monitor window size
        this.checkScreenSize();
        window.addEventListener('resize', () => this.handleResize());
        
        this.render();
    }
    
    generateDefaultLabels() {
        const labels = [];
        for (let i = 0; i < this.totalSteps; i++) {
            labels.push(`Step ${i}`);
        }
        return labels;
    }
    
    /* Check if we should use progressive disclosure based on screen width */
    
    checkScreenSize() {
        // Use progressive disclosure on smaller screens (< 1350px)
        // On larger screens, show all steps
        
        
        const breakpoint = 1350; // Adjust this as needed
        this.useProgressiveDisclosure = window.innerWidth < breakpoint;
    }
    
    /* Handle window resize */
    
    handleResize() {
        const wasProgressive = this.useProgressiveDisclosure;
        this.checkScreenSize();
        
        // Re-render if mode changed
        if (wasProgressive !== this.useProgressiveDisclosure) {
            this.render();
        }
    }
    
    /* Determine which steps should be visible based on current step
     * Always shows: first, last, current, and nearby steps */
    
    getVisibleSteps() {
        // If not using progressive disclosure, show all steps
        if (!this.useProgressiveDisclosure) {
            return Array.from({ length: this.totalSteps }, (_, i) => i);
        }
        
        const visible = new Set();
        
        // Always show first step
        visible.add(0);
        
        // Always show last step
        visible.add(this.totalSteps - 1);
        
        // Show current step and immediate neighbors
        visible.add(this.currentStep);
        if (this.currentStep > 0) visible.add(this.currentStep - 1);
        if (this.currentStep < this.totalSteps - 1) visible.add(this.currentStep + 1);
        
        // Add one more on each side for context
        if (this.currentStep > 1) visible.add(this.currentStep - 2);
        if (this.currentStep < this.totalSteps - 2) visible.add(this.currentStep + 2);
        
        // Add one more on each side for context
        if (this.currentStep > 2) visible.add(this.currentStep - 3);
        if (this.currentStep < this.totalSteps - 3) visible.add(this.currentStep + 3);
        
        return Array.from(visible).sort((a, b) => a - b);
    }
    
    render() {
        if (!this.container) return;
        
        this.container.innerHTML = '';
        const visibleSteps = this.getVisibleSteps();
        
        for (let i = 0; i < visibleSteps.length; i++) {
            const stepIndex = visibleSteps[i];
            
            // Add ellipsis if there's a gap (only in progressive mode)
            if (this.useProgressiveDisclosure && i > 0 && visibleSteps[i] - visibleSteps[i - 1] > 1) {
                const ellipsis = document.createElement('li');
                ellipsis.className = 'stepper-ellipsis';
                ellipsis.textContent = '...';
                this.container.appendChild(ellipsis);
            }
            
            // Create step item
            const li = this.createStepItem(stepIndex);
            this.container.appendChild(li);
        }
    }
    
    createStepItem(stepIndex) {
        const li = document.createElement('li');
        li.className = 'stepper-item';
        li.setAttribute('data-step', stepIndex);
        
        // Set state classes
        if (stepIndex < this.currentStep) {
            li.classList.add('completed');
        } else if (stepIndex === this.currentStep) {
            li.classList.add('active');
        }
        
        // Step number
        const numberSpan = document.createElement('span');
        numberSpan.className = 'stepper-number';
        numberSpan.textContent = stepIndex < this.currentStep ? '✓' : stepIndex;
        li.appendChild(numberSpan);
        
        // Step label
        const textShort = document.createElement('span');
        textShort.className = 'stepper-text-short';
        textShort.textContent = this.stepLabels[stepIndex];
        li.appendChild(textShort);
        
        return li;
    }
    
    /* Navigate to a specific step */
    
    goToStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= this.totalSteps) return;
        if (stepIndex === this.currentStep) return;
        
        this.currentStep = stepIndex;
        this.render();
        this.onStepChange(this.currentStep);
    }
    
    /*  Go to next step */
    
    next() {
        if (this.currentStep < this.totalSteps - 1) {
            this.goToStep(this.currentStep + 1);
            return true;
        }
        return false;
    }
    
    /* Go to previous step */
    previous() {
        if (this.currentStep > 0) {
            this.goToStep(this.currentStep - 1);
            return true;
        }
        
        return false;
    }
    
    /* Check if we're at the first step */
    isFirstStep() {
        return this.currentStep === 0;
    }
    
    /* Check if we're at the last step */
    isLastStep() {
        return this.currentStep === this.totalSteps - 1;
    }
    
    /* Get current step index */
    getCurrentStep() {
        return this.currentStep;
    }
    
    /* Update step labels */
    setStepLabels(labels) {
        if (labels.length === this.totalSteps) {
            this.stepLabels = labels;
            this.render();
        }
    }
    
    /* Clean up event listeners */
    destroy() {
        window.removeEventListener('resize', this.handleResize);
    }
}

// Export for use in modules or make globally available
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProgressiveStepper;
}


