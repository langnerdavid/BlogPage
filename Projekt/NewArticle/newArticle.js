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
  
      const sectionContentLabel = document.createElement('label');
      sectionContentLabel.textContent = `Section ${sectionCount} Content:`;
  
      const sectionContentTextarea = document.createElement('textarea');
      sectionContentTextarea.name = `section-content-${sectionCount}`;
      sectionContentTextarea.rows = '4';
  
      const removeSectionButton = document.createElement('button');
      removeSectionButton.type = 'button';
      removeSectionButton.textContent = 'Remove Section';
      removeSectionButton.addEventListener('click', function() {
        sectionDiv.remove();
        renumberSections();
      });
  
      sectionDiv.appendChild(sectionHeadingLabel);
      sectionDiv.appendChild(sectionHeadingInput);
      sectionDiv.appendChild(sectionContentLabel);
      sectionDiv.appendChild(sectionContentTextarea);
      sectionDiv.appendChild(removeSectionButton);
  
      sectionsContainer.appendChild(sectionDiv);
  
      sectionCount++;
    });
});
  