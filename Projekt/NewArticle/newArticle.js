document.addEventListener('DOMContentLoaded', function() {
    const addSectionButton = document.getElementById('add-section-button');
    const sectionsContainer = document.getElementById('sections-container');
  
    let sectionCount = 1;
  
    addSectionButton.addEventListener('click', function() {
      const sectionId = `section-${sectionCount}`;
  
      const sectionDiv = document.createElement('div');
      sectionDiv.id = sectionId;
  
      const sectionHeadingLabel = document.createElement('label');
      sectionHeadingLabel.textContent = `Section ${sectionCount} Heading:`;
  
      const sectionHeadingInput = document.createElement('input');
      sectionHeadingInput.type = 'text';
      sectionHeadingInput.name = `section-heading-${sectionCount}`;
  
      const sectionTextContentLabel = document.createElement('label');
      sectionTextContentLabel.textContent = `Section ${sectionCount} Text Content:`;
  
      const sectionTextContentTextarea = document.createElement('textarea');
      sectionTextContentTextarea.name = `section-text-content-${sectionCount}`;
      sectionTextContentTextarea.rows = '4';
  
      const sectionImageContentLabel = document.createElement('label');
      sectionImageContentLabel.textContent = `Section ${sectionCount} Image Content:`;
  
      const sectionImageContentTextarea = document.createElement('textarea');
      sectionImageContentTextarea.name = `section-image-content-${sectionCount}`;
      sectionImageContentTextarea.rows = '1';
  
      const removeSectionButton = document.createElement('button');
      removeSectionButton.type = 'button';
      removeSectionButton.textContent = `Remove Section ${sectionCount}`;
      removeSectionButton.addEventListener('click', function() {
        sectionDiv.remove();
        renumberSections();
      });
  
      sectionDiv.appendChild(sectionHeadingLabel);
      sectionDiv.appendChild(sectionHeadingInput);
      sectionDiv.appendChild(sectionTextContentLabel);
      sectionDiv.appendChild(sectionTextContentTextarea);
      sectionDiv.appendChild(sectionImageContentLabel);
      sectionDiv.appendChild(sectionImageContentTextarea);
      sectionDiv.appendChild(removeSectionButton);
  
      sectionsContainer.appendChild(sectionDiv);
  
      sectionCount++;
      renumberSections();
    });
  
    function renumberSections() {
      const sectionDivs = sectionsContainer.querySelectorAll('div[id^="section-"]');
      sectionCount = 1;
  
      sectionDivs.forEach(function(sectionDiv) {
        const sectionId = sectionDiv.id;
        const sectionHeadingLabel = sectionDiv.querySelector(`label[for="${sectionId}"]`);
        const sectionTextContentLabel = sectionDiv.querySelector(`label[for="${sectionId}"] + textarea`);
        const sectionImageContentLabel = sectionDiv.querySelector(`label[for="${sectionId}"] + textarea + label`);
  
        sectionHeadingLabel.textContent = `Section ${sectionCount} Heading:`;
        sectionTextContentLabel.textContent = `Section ${sectionCount} Text Content:`;
        sectionImageContentLabel.textContent = `Section ${sectionCount} Image Content:`;
  
        sectionCount++;
      });
    }
  });
  